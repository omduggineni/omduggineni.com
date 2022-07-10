const pix2browserstr = (pix) => {
    return pix + 'px';
}

class ValueNoiseGenerator{
    constructor(max_value, max_steps){
        this.value = Math.random() * max_value;
        this.next_value = Math.random() * max_value;
        this.next_value_steps = Math.floor((Math.sqrt(Math.random()) * (max_steps-1)) + 1);
        this.max_value = max_value;
        this.max_steps = max_steps;
        this.step_num = 0;
    }
    ease(a, b, t){
        return a + (b - a) * t; //linear interp for now
    }
    getValue(){
        let value = this.ease(this.value, this.next_value, this.step_num / this.next_value_steps);
        //console.log(this.value, this.next_value, this.step_num, this.next_value_steps, value);
        this.step_num++;
        if(this.step_num == this.next_value_steps){
            this.step_num = 0;
            this.value = this.next_value;
            this.next_value = Math.random() * this.max_value;
            this.next_value_steps = Math.floor((Math.sqrt(Math.random()) * (this.max_steps-1)) + 1);
        }
        return value;
    }
}

var particleTextRemoveList = [];
var particleTextRemoveTimeout = null;
const particleTextRemove = ()=>{
    for(let i = 0; i < particleTextRemoveList.length; i++){
        particleTextRemoveList[i].remove();
    }
    particleTextRemoveList = [];
}
const particleSay = (text, parentElement, x, y, lifetime) => {
    let element = document.createElement('span');
    element.innerHTML = text;
    element.classList.add('particle-system-text');
    parentElement.appendChild(element);
    element.style.top = y + 'px';
    element.style.left = x + 'px';
    setTimeout(()=>{
        element.style.animation = '';
        element.style.display = 'none';
        particleTextRemoveList.push(element);
        clearTimeout(particleTextRemoveTimeout);
        particleTextRemoveTimeout = setTimeout(particleTextRemove, 100);
    }, lifetime);
}
class Particle{
    constructor(parentElement, parentSystem){
        this._speed = Particle.SPEED;
        this._parentSystem = parentSystem;
        this._x = Math.random() * this._parentSystem.width;
        this._y = Math.random() * this._parentSystem.height;
        this._z_generator = new ValueNoiseGenerator(10, 100);
        this._z = this._z_generator.getValue()+10;
        //this.brightness = new ValueNoiseGenerator(1, 100);

        this._theta_generator = new ValueNoiseGenerator(Math.PI * 2, 500);
        //console.log(this._theta_generator.getValue());
        this._theta = this._theta_generator.getValue();//Math.random() * Math.PI * 2;
        this.element = document.createElement('div');
        this.element.classList.add('particle-system-particle');
        this.element.style.left = this._x + 'px'; //TODO: potentially make string generation more efficient
        this.element.style.top = this._y + 'px';
        parentElement.appendChild(this.element);
    }
    update(){
        //particle calculation logic
        this._x = (this._x + (Math.cos(this._theta) * this._speed) + this._parentSystem.width) % this._parentSystem.width;
        this._y = (this._y + (Math.sin(this._theta) * this._speed) + this._parentSystem.height) % this._parentSystem.height;
        this._theta = this._theta_generator.getValue();//Math.random() * 0.2 - 0.1;
        //console.log(this._theta);
        this._speed += (Math.random() - Math.random()) * 0.1;
        this._speed = Particle.SPEED + (this._speed-Particle.SPEED) * (this.SPEED > Particle.SPEED ? 0.998 : 0.95);
        this._z = this._z_generator.getValue()+10;

        if(Math.random() > 0.999) particleSay("Hello!", this._parentSystem.element, this._x, this._y, 1000);

        //actual UI update
        this.element.style.left = this._x + 'px';
        this.element.style.top = this._y + 'px';
        this.element.style.width = this._z + 'px';
        this.element.style.height = this._z + 'px';
        this.element.style.opacity = Math.min(2/(this._z), 1);
    }
}
Particle.SPEED = 1;
Particle.WIDTH=15;
class ParticleSystem{
    constructor(parentElement, numParticles){
        this._ticknum = 0;

        this.width = window.innerWidth-Particle.WIDTH;
        this.height = document.body.scrollHeight-Particle.WIDTH;

        parentElement.style.height = this.height + 'px';

        this.element = parentElement;

        this.particles = [];
        for(let i = 0; i < numParticles; i++){
            setTimeout(()=>{
                this.particles.push(new Particle(this.element, this));
            }, i);
        }
        setInterval(this.update.bind(this), 1000 / 60);
        window.addEventListener('resize', this.on_resize.bind(this));
    }
    on_resize(){
        this.width = window.innerWidth;
        this.height = document.body.scrollHeight;
        this.element.style.height = this.height + 'px';
    }
    update(){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].update();
        }
    }
}
const particle_system = new ParticleSystem(document.getElementById('particle_system'), 200);