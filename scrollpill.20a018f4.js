("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire94c2.register("7OALv",(function(e,s){var t,l,i,n;t=e.exports,l="ScrollPill",i=function(){return r},Object.defineProperty(t,l,{get:i,set:n,enumerable:!0,configurable:!0});class o{show(){this.element.style.display="block"}hide(){this.element.style.display="none"}constructor(e){this.element=e}}class r{handleScroll(e){const s=window.pageYOffset,t=document.body.scrollHeight,l=window.innerHeight,i=s/(t-l)*100;this.scroll_percent=i,this.element.classList.remove("scrollpill-open"),0===i?(this.element.classList.add("scrollpill-at-top"),this.element.classList.remove("scrollpill-at-bottom"),this.element.classList.remove("scrollpill-at-middle"),this.element.classList.remove("scrollpill-at-top-first"),setTimeout((()=>{this.burger_element.innerHTML='<i class="fa-solid fa-bars"></i>',this.navbar.show()}),200)):i>=100?(this.element.classList.add("scrollpill-at-bottom"),this.element.classList.remove("scrollpill-at-top"),this.element.classList.remove("scrollpill-at-middle"),this.element.classList.remove("scrollpill-at-top-first"),this.is_hovered||this.navbar.hide(),setTimeout((()=>{this.burger_element.innerHTML='<i class="fa-solid fa-arrow-up"></i>'}),200)):(this.element.classList.remove("scrollpill-at-top"),this.element.classList.remove("scrollpill-at-bottom"),this.element.classList.add("scrollpill-at-middle"),this.element.classList.remove("scrollpill-at-top-first"),this.is_hovered||(this.burger_element.innerHTML="",this.navbar.is_open=!1,this.navbar.hide())),this.element.style.top=i*(l-90)/l+"%"}onmouseover(e){this.is_hovered=!0,0!=this.scroll_percent&&100!=this.scroll_percent&&setTimeout((()=>{this.burger_element.innerHTML='<i class="fa-solid fa-bars"></i>'}),200)}onmouseoff(e){this.is_hovered=!1,0==this.scroll_percent||100==this.scroll_percent||this.navbar.is_open||(this.burger_element.innerHTML="",setTimeout((()=>{this.burger_element.innerHTML=""}),200))}onclick(e){this.scroll_percent>=100?(window.location.replace("#top"),this.update(0),this.burger_element.innerHTML=""):(this.navbar.is_open?0==this.scroll_percent?this.navbar.is_open=!1:(this.element.classList.remove("scrollpill-open"),0==document.querySelectorAll(".scrollpill-navbar:hover").length&&this.navbar.hide()):(this.navbar.show(),this.scroll_percent>0&&this.element.classList.add("scrollpill-open"),setTimeout((()=>{this.burger_element.innerHTML='<i class="fa-solid fa-bars"></i>'}),200)),this.navbar.is_open=!this.navbar.is_open)}update(e){window.scrollTo(0,e/100*(document.body.scrollHeight-window.innerHeight)),this.handlers.scroll(null)}constructor(e,s){this.element=document.getElementById(e),this.element.classList.add("scrollpill"),this.element.classList.add("scrollpill-at-top-first"),this.burger_element=this.element.appendChild(document.createElement("span")),this.scroll_percent=0,this.is_hovered=!1,this.options=s;let t=this.element.querySelectorAll(".scrollpill-navbar");if(t.length>0){this.navbar=new o(t[0]);for(let e=1;e<t.length;e++)t[e].style.display="none"}else this.navbar=new o(document.createElement("div"));this.navbar.show(),this.navbar.is_open=!1,this.element.appendChild(this.navbar.element),this.burger_element.innerHTML='<i class="fa-solid fa-bars"></i>',this.handler_scroll=this.handleScroll.bind(this),window.addEventListener("scroll",this.handler_scroll),this.handler_mouseover=this.onmouseover.bind(this),this.element.addEventListener("mouseenter",this.handler_mouseover),this.handler_mouseoff=this.onmouseoff.bind(this),this.element.addEventListener("mouseleave",this.handler_mouseoff),this.handler_onclick=this.onclick.bind(this),this.element.addEventListener("mousedown",this.handler_onclick)}}}));
//# sourceMappingURL=scrollpill.20a018f4.js.map