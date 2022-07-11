class ScrollPillNav {
    constructor(element) {
        this.element = element;
    }
    show(){
        this.element.style.display = 'block';
    }
    hide(){
        this.element.style.display = 'none';
    }
}

class ScrollPill{
    constructor(element_id, options){
        this.element = document.getElementById(element_id);
        this.element.classList.add('scrollpill');
        this.element.classList.add('scrollpill-at-top-first');
        this.burger_element = this.element.appendChild(document.createElement('span'));
        this.scroll_percent = 0;
        this.is_hovered = false;
        this.options = options;
        let possible_navbar = this.element.querySelectorAll('.scrollpill-navbar');
        if(possible_navbar.length > 0){
            this.navbar = new ScrollPillNav(possible_navbar[0]);
            for(let i = 1; i < possible_navbar.length; i++){
                possible_navbar[i].style.display = 'none';
            }
        }else{
            this.navbar = new ScrollPillNav(document.createElement('div'));
        }
        this.navbar.show();
        this.navbar.is_open = false;
        this.element.appendChild(this.navbar.element);

        //initialization of handlers
        this.handlers = {};
        this.burger_element.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
        this.handlers.scroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handlers.scroll);
        this.handlers.mouseover = this.onmouseover.bind(this);
        this.element.addEventListener('mouseenter', this.handlers.mouseover);
        this.handlers.mouseoff = this.onmouseoff.bind(this);
        this.element.addEventListener('mouseleave', this.handlers.mouseoff);
        this.handlers.onclick = this.onclick.bind(this);
        this.element.addEventListener('mousedown', this.handlers.onclick);
    }
    handleScroll(event){
        const scrollY = window.pageYOffset;
        const scrollHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrolled = (scrollY / (scrollHeight - windowHeight)) * 100;
        this.scroll_percent = scrolled;
        this.element.classList.remove('scrollpill-open');
        if(scrolled === 0){
            this.element.classList.add('scrollpill-at-top');
            this.element.classList.remove('scrollpill-at-bottom');
            this.element.classList.remove('scrollpill-at-middle');
            this.element.classList.remove('scrollpill-at-top-first');
            setTimeout(()=>{
                this.burger_element.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
                this.navbar.show();
            }, 200);
        }else if(scrolled >= 100){
            this.element.classList.add('scrollpill-at-bottom');
            this.element.classList.remove('scrollpill-at-top');
            this.element.classList.remove('scrollpill-at-middle');
            this.element.classList.remove('scrollpill-at-top-first');
            if(!this.is_hovered){
                this.navbar.hide();
            }
            setTimeout(()=>{
                this.burger_element.innerHTML = "<i class=\"fa-solid fa-arrow-up\"></i>";
            }, 200);
        }else{
            this.element.classList.remove('scrollpill-at-top');
            this.element.classList.remove('scrollpill-at-bottom');
            this.element.classList.add('scrollpill-at-middle');
            this.element.classList.remove('scrollpill-at-top-first');
            if(!this.is_hovered){
                this.burger_element.innerHTML = "";
                this.navbar.is_open = false;
                this.navbar.hide();
            }
        }
        this.element.style.top = (scrolled*(windowHeight - 90)/(windowHeight)) + '%';
    }
    onmouseover(event){
        this.is_hovered = true;
        if(this.scroll_percent != 0 && this.scroll_percent != 100){
            setTimeout(()=>{this.burger_element.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";}, 200);
        }
    }
    onmouseoff(event){
        this.is_hovered = false;
        if(this.scroll_percent != 0 && this.scroll_percent != 100 && !this.navbar.is_open){
            this.burger_element.innerHTML = "";
            setTimeout(()=>{this.burger_element.innerHTML = "";}, 200);
        }
    }
    onclick(event){
        if(this.scroll_percent >= 100){
            window.location.replace("#top");
            this.update(0);
            //this.element.classList.add('scrollpill-at-top-first');
            this.burger_element.innerHTML = "";
        }else{
            if(this.navbar.is_open){
                if(this.scroll_percent == 0){
                    this.navbar.is_open = false;
                }else{
                    this.element.classList.remove('scrollpill-open')
                    if(document.querySelectorAll('.scrollpill-navbar:hover').length == 0){
                        this.navbar.hide()
                    }
                }
            }else{
                this.navbar.show();
                if(this.scroll_percent > 0){
                    this.element.classList.add('scrollpill-open')
                }
                setTimeout(()=>{this.burger_element.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";}, 200);
            }
            this.navbar.is_open = !this.navbar.is_open;
        }
    }
    update(percent){
        window.scrollTo(0, percent / 100 * (document.body.scrollHeight - window.innerHeight));
        this.handlers.scroll(null);
    }
}
scrollHandler = new ScrollPill("scrollpill");