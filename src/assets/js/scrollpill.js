class ScrollPillNavbar {
    constructor(element, scrollpill) {
        this.scrollpill = scrollpill;
        scrollpill.element.classList.add('scrollpill-open');
        this.element = element;
        this.is_open = true;
        this.sections = [...this.element.querySelectorAll('a')].map((element) => {
            return [element, document.getElementById(element.getAttribute('href').substring(1))];
        });
        //console.log(this.sections);
        this.activeSection = null;
        this.registerEvents();
        this.disabled = false;
    }
    registerEvents() {
        this.sections.forEach(([section_element, section]) => {
            section_element.addEventListener('click', (event) => {
                //console.log('click');
                this.disable();
                //this.scrollpill.closeOnScroll = false;
                window.addEventListener('scrollend', () => {
                    this.enable();
                    //this.scrollpill.closeOnScroll = true;
                }, {once: true});
            });
        });
    }
    updateActiveSection() {
        let newActiveSection;
        if (this.scrollpill.state == this.scrollpill.state_machine.AT_BOTTOM) {
            newActiveSection = this.sections[this.sections.length - 1];
        } else {
            newActiveSection = this.sections.findLast(([section_element, section]) => {
                //console.log(section.getBoundingClientRect().top, window.innerHeight / 2, section.getBoundingClientRect().top < window.innerHeight / 2);
                return section.getBoundingClientRect().top < window.innerHeight / 2;
            });
        }
        if (newActiveSection != null) {
            if (this.activeSection != null) {
                this.activeSection[0].classList.remove("scrollpill-navbar-active-section");
            }
            newActiveSection[0].classList.add("scrollpill-navbar-active-section");
        } else {
            if (this.activeSection != null) {
                this.activeSection[0].classList.remove("scrollpill-navbar-active-section");
            }
        }
        this.activeSection = newActiveSection;
    }
    show() {
        if(this.is_open) return;
        //this.element.style.display = 'block';
        this.scrollpill.element.classList.add('scrollpill-open');
        this.is_open = true;
    }
    hide() {
        if(!this.is_open) return;
        //this.element.style.display = 'none';
        this.scrollpill.element.classList.remove('scrollpill-open');
        this.is_open = false;
    }
    forceHide() {
        if (!this.is_open) return;
        //this.element.style.display = 'none';
        this.scrollpill.element.classList.remove('scrollpill-open');
        this.is_open = false;
    }
    toggle() {
        if(this.is_open) this.hide();
        else this.show();
    }
    disable() {
        if(this.disabled) return;
        this.oldShow = this.show;
        this.oldHide = this.hide;
        this.show = () => { };
        this.hide = () => { };
        this.disabled = true;
    }
    enable() {
        this.disabled = false;
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
        this.navbar = new ScrollPillNavbar(element.querySelector('.scrollpill-navbar'), this);
        // this.navbar.show();
        // this.navbar.disable();
        element.appendChild(this.navbar.element);
        element.classList.add('scrollpill');
        element.classList.add('scrollpill-at-top-first');
        this.state = this.state_machine.AT_TOP_FIRST;
        this.scrollPercentage = 0;
        //this.closeOnScroll = true;
 
        this.registerEventHandlers();
        this.navbar.show();
    }
    registerEventHandlers() {
        window.addEventListener('scroll', this.onScrollUpdate.bind(this));
        window.addEventListener('resize', this.onScrollUpdate.bind(this));
        window.addEventListener('orientationchange', this.onScrollUpdate.bind(this));
        this.element.addEventListener('click', this.onClick.bind(this));
        window.addEventListener('scroll', this.navbar.updateActiveSection.bind(this.navbar));
    }
    updateState(state) {
        this.element.classList.remove(this.state);
        this.element.classList.add(state);
        this.state = state;
    }
    percentage2screenpx(percentage) {
        //console.log(percentage);
        let remaining_screen_space = window.innerHeight - this.element_height * 1.775;
        console.log(remaining_screen_space, window.innerHeight, this.element_height);
        
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
        //console.log(scrollY, scrollHeight, windowHeight, scrollPercentage);


        this.scrollPercentage = scrollPercentage;
        this.element.style.top = this.percentage2screenpx(scrollPercentage);
        if(scrollPercentage == 0){
            this.updateState(this.state_machine.AT_TOP);
            this.navbar.show();
        } else if (scrollPercentage >= 99.75) {
            this.updateState(this.state_machine.AT_BOTTOM);
            this.navbar.forceHide();
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
    onClick(event) {
        if (this.state == this.state_machine.AT_BOTTOM) {
            if(event.target.classList.contains('.scrollpill-navbar')) return;
            this.navbar.disable();
            this.onPercentageUpdate(0, { scrollBehavior: 'smooth' });
            window.addEventListener('scrollend', () => {
                this.navbar.enable();
                this.navbar.show();
            });
        }

        if (this.navbar.is_open) {
            this.navbar.hide();
        } else {
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