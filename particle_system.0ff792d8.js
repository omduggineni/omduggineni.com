!function(){function t(t,e,i,s){Object.defineProperty(t,e,{get:i,set:s,enumerable:!0,configurable:!0})}var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire94c2;e.register("fD4Ua",(function(i,s){t(i.exports,"Particle",(function(){return r})),t(i.exports,"ParticleSystem",(function(){return u}));var n=e("71mVs"),h=e("agqG7"),a=function(){"use strict";function t(e,i){(0,n.default)(this,t),this.value=Math.random()*e,this.next_value=Math.random()*e,this.next_value_steps=Math.floor(Math.sqrt(Math.random())*(i-1)+1),this.max_value=e,this.max_steps=i,this.step_num=0}return(0,h.default)(t,[{key:"ease",value:function(t,e,i){return t+(e-t)*i}},{key:"getValue",value:function(){var t=this.ease(this.value,this.next_value,this.step_num/this.next_value_steps);return this.step_num++,this.step_num==this.next_value_steps&&(this.step_num=0,this.value=this.next_value,this.next_value=Math.random()*this.max_value,this.next_value_steps=Math.floor(Math.sqrt(Math.random())*(this.max_steps-1)+1)),t}}]),t}(),r=function(){"use strict";function t(e,i){(0,n.default)(this,t),this._speed=t.SPEED,this._parentSystem=i,this._x=Math.random()*this._parentSystem.width,this._y=Math.random()*this._parentSystem.height,this._z_generator=new a(10,100),this._z=this._z_generator.getValue()+10,this._theta_generator=new a(2*Math.PI,500),this._theta=this._theta_generator.getValue(),this.element=document.createElementNS("http://www.w3.org/2000/svg","circle"),this.element.setAttribute("cx",this._x),this.element.setAttribute("cy",this._y),this.element.setAttribute("r",this._z/2),this.element.setAttribute("opacity",Math.min(2/this._z,1)),this.element.setAttribute("fill","#ffff00"),e.appendChild(this.element)}return(0,h.default)(t,[{key:"update",value:function(){var e,i,s,n,h,a;this._x=(this._x+Math.cos(this._theta)*this._speed+this._parentSystem.width)%this._parentSystem.width,this._y=(this._y+Math.sin(this._theta)*this._speed+this._parentSystem.height)%this._parentSystem.height,this._theta=this._theta_generator.getValue(),this._speed+=.1*(Math.random()-Math.random()),this._speed=t.SPEED+(this._speed-t.SPEED)*(this.SPEED>t.SPEED?.998:.95),this._z=this._z_generator.getValue()+10,Math.random()>.999&&(e="Hello!",i=this._parentSystem.text_element,s=this._x,n=this._y,h=1e3,(a=document.createElement("span")).innerText=e,a.classList.add("particle-system-text"),i.appendChild(a),a.style.top=n+"px",a.style.left=s+"px",a.style.animationDuration=h/1e3+"s",setTimeout(a.remove.bind(a),h)),this.element.setAttribute("cx",this._x),this.element.setAttribute("cy",this._y),this.element.setAttribute("r",this._z/2),this.element.setAttribute("opacity",Math.min(2/this._z,1))}},{key:"sayUtterances",value:function(t,e){t.add_particle(this),t.speakIn(e)}},{key:"raycast",value:function(t,e,i,s){}}]),t}();r.SPEED=1,r.WIDTH=15;var u=function(){"use strict";function t(e,i,s){var h=this;(0,n.default)(this,t),this._ticknum=0,this.width=window.innerWidth-r.WIDTH,this.height=document.body.scrollHeight-r.WIDTH,e.style.height=this.height+"px",i.style.height=this.height+"px",this.element=e,this.text_element=i,this.particles=[];for(var a=function(){h.particles.push(new r(h.element,h))},u=0;u<s;u++)setTimeout(a,u);this.update_this=this.update.bind(this),requestAnimationFrame(this.update_this),window.addEventListener("resize",this.on_resize.bind(this))}return(0,h.default)(t,[{key:"on_resize",value:function(){this.width=window.innerWidth,this.height=document.body.scrollHeight,this.element.style.height=this.height+"px",this.text_element.style.height=this.height+"px"}},{key:"update",value:function(){for(var t=0;t<this.particles.length;t++)this.particles[t].update();this._ticknum++,requestAnimationFrame(this.update_this)}},{key:"raycast",value:function(t,e,i,s){for(var n=-1,h=0;h<this.particles.length;h++){var a=this.particles[h].raycast(t,e,i,s);a>0&&(n<0||a<n)&&(n=a,this.particles[h])}return n}}]),t}()})),e.register("71mVs",(function(e,i){function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}t(e.exports,"default",(function(){return s}))})),e.register("agqG7",(function(e,i){function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function n(t,e,i){return e&&s(t.prototype,e),i&&s(t,i),t}t(e.exports,"default",(function(){return n}))}))}();
//# sourceMappingURL=particle_system.0ff792d8.js.map
