class ScrollPillNav {
    constructor(element) {
        this.element = element;
        this.is_hovered = false;
        this.element.addEventListener('mouseenter', this.handle_hoverstart.bind(this));
        this.element.addEventListener('mouseleave', this.handle_hoverend.bind(this));
    }
    handle_hoverstart(){
        this.is_hovered = true;
        this.element.classList.add("scroll-pill-nav-hovered");
    }
    handle_hoverend(){
        this.is_hovered = false;
        this.element.classList.remove("scroll-pill-nav-hovered");
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
        this.burger_element = document.getElementById("scrollpill-burger_element");
        this.scroll_percent = 0;
        this.is_hovered = false;
        this.options = options;
        this.navbar = new ScrollPillNav(this.element.querySelector('.scrollpill-navbar'));
        this.navbar.show();
        this.navbar.is_open = false;
        this.element.appendChild(this.navbar.element);

        //initialization of handlers
        this.burger_element.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
        this.handler_scroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handler_scroll);
        this.handler_mouseover = this.onmouseover.bind(this);
        this.element.addEventListener('mouseenter', this.handler_mouseover);
        this.handler_mouseoff = this.onmouseoff.bind(this);
        this.element.addEventListener('mouseleave', this.handler_mouseoff);
        this.handler_onclick = this.onclick.bind(this);
        this.element.addEventListener('mousedown', this.handler_onclick);
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
                    if(!this.navbar.is_hovered){
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
        this.handleScroll(null);
    }
}

export {ScrollPill};