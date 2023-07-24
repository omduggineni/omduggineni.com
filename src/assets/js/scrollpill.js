class ScrollPillNavbar {
    constructor(element) {
        this.element = element;
        element.style.display = 'block';
        this.is_open = true;
    }
    show() {
        if(this.is_open) return;
        this.element.style.display = 'block';
        this.is_open = true;
    }
    hide() {
        if(!this.is_open) return;
        this.element.style.display = 'none';
        this.is_open = false;
    }
    toggle() {
        if(this.is_open) this.hide();
        else this.show();
    }
    disable() {
        this.oldShow = this.show;
        this.oldHide = this.hide;
        this.show = () => { };
        this.hide = () => { };
    }
    enable() {
        this.show = this.oldShow;
        this.hide = this.oldHide;
    }
}

class ScrollPillElement {
    state_machine = {
        AT_TOP_FIRST: 'scrollpill-at-top-first',
        AT_TOP: 'scrollpill-at-top',
        AT_MIDDLE: 'scrollpill-at-middle',
        AT_BOTTOM: 'scrollpill-at-bottom',
    };
    drag_states = {
        DRAGGING: 'scrollpill-dragging',
    };
    constructor(element) {
        this.element = element;
        this.element_height = element.getBoundingClientRect().height;
        this.navbar = new ScrollPillNavbar(element.querySelector('.scrollpill-navbar'));
        element.appendChild(this.navbar.element);
        element.classList.add('scrollpill');
        element.classList.add('scrollpill-at-top-first');
        this.state = this.state_machine.AT_TOP_FIRST;
        this.scrollPercentage = 0;

        this.registerEventHandlers();
    }
    registerEventHandlers() {
        window.addEventListener('scroll', this.onScrollUpdate.bind(this));
        window.addEventListener('resize', this.onScrollUpdate.bind(this));
        this.element.addEventListener('click', this.onClick.bind(this));
    }
    updateState(state) {
        this.element.classList.remove(this.state);
        this.element.classList.add(state);
        this.state = state;
    }
    percentage2screenpx(percentage) {
        //console.log(percentage);
        let remaining_screen_space = window.innerHeight - this.element_height * 1.775;
        
        return ((percentage/100) * remaining_screen_space) + 'px';
    }
    percentage2windowpx(percentage) {
        return (percentage / 100) * (document.body.scrollHeight - window.innerHeight);
    }
    onScrollUpdate(event) {
        const scrollY = window.scrollY;
        const scrollHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;

        const scrollPercentage = (scrollY / (scrollHeight - windowHeight)) * 100;
        
        if (this.element.classList.contains('scrollpill-open')) {
            this.element.classList.remove('scrollpill-open');
        }

        this.scrollPercentage = scrollPercentage;
        this.element.style.top = this.percentage2screenpx(scrollPercentage);
        if(scrollPercentage == 0){
            this.updateState(this.state_machine.AT_TOP);
            this.navbar.show();
        } else if (scrollPercentage >= 99.75) {
            this.updateState(this.state_machine.AT_BOTTOM);
            this.navbar.hide();
        } else {
            this.updateState(this.state_machine.AT_MIDDLE);
            this.navbar.hide();
        }
    }
    onPercentageUpdate(percentage, {scrollBehavior = 'instant'} = {}) {
        // scroll the window to the correct position
        window.scrollTo({
            right: 0, top: this.percentage2windowpx(percentage), behavior: scrollBehavior
        });
        this.onScrollUpdate();
    }
    onClick() {
        if (this.state == this.state_machine.AT_BOTTOM) {
            this.navbar.disable();
            this.onPercentageUpdate(0, { scrollBehavior: 'smooth' });
            let scrollHandler = () => {
                if (this.scrollPercentage == 0) {
                    window.removeEventListener('scroll', scrollHandler);
                    this.navbar.enable();
                    this.navbar.show();
                }
            };
            window.addEventListener('scroll', scrollHandler);
            setTimeout(() => {
                window.removeEventListener('scroll', scrollHandler);
                this.navbar.enable();
                this.navbar.show();
            }, 2000);
        } else if (this.state == this.state_machine.AT_TOP || this.state == this.state_machine.AT_TOP_FIRST) {
            return;
        }

        if (this.navbar.is_open) {
            this.element.classList.remove("scrollpill-open");
            this.navbar.hide();
        } else {
            this.element.classList.add("scrollpill-open");
            this.navbar.show();
        }
    }
}

class ScrollPill{
    constructor(element_id, options) {
        let element = document.getElementById(element_id);
        this.element = new ScrollPillElement(element);
        this.options = options ?? {};
    }
}

export {ScrollPill};