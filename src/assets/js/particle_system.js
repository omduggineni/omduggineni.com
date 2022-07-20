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

const particleSay = (text, parentElement, x, y, lifetime) => {
    let element = document.createElement('span');
    element.innerHTML = text;
    element.classList.add('particle-system-text');
    parentElement.appendChild(element);
    element.style.top = y + 'px';
    element.style.left = x + 'px';
    element.style.animationDuration = lifetime/1000 + 's';
    setTimeout(element.remove.bind(element), lifetime);
}

const rick_utterances = [["We're", 0.3800000000000001], ['no', 0.2699999999999998], ['strangers', 0.24], ['to', 0.29000000000000004], ['love', 2.83], ['You', 0.33000000000000007], ['know', 0.22999999999999954], ['the', 0.25], ['rules', 0.6900000000000004], ['and', 0.3600000000000003], ['so', 0.40999999999999925], ['do', 0.3600000000000003], ['I', 1.63], ['A', 0.2900000000000009], ['full', 0.21999999999999886], ["commitment's", 0.7699999999999996], ['what', 0.25], ["I'm", 0.5400000000000009], ['thinking', 0.3200000000000003], ['of', 1.8100000000000005], ['you', 0.3299999999999983], ["wouldn't", 0.4800000000000004], ['get', 0.2599999999999998], ['this', 0.25], ['from', 0.46000000000000085], ['any', 0.40000000000000036], ['other', 0.21999999999999886], ['guy', 0.26000000000000156], ['I', 0.25], ['how', 0.9599999999999973], ["I'm", 1.3000000000000007], ['feeling', 0.3500000000000014], ['gotta', 0.259999999999998], ['make', 0.25], ['you', 0.2900000000000027], ['understand', 0.7899999999999991], ['never', 0.41999999999999815], ['gonna', 1.620000000000001], ['give', 0.39000000000000057], ['you', 0.23999999999999844], ['up', 0.2700000000000031], ['never', 0.4299999999999997], ['gonna', 0.34999999999999787], ['let', 0.2699999999999996], ['you', 0.6900000000000013], ['down', 0.23999999999999844], ['never', 0.18000000000000327], ['gonna', 0.2699999999999996], ['run', 0.2699999999999996], ['around', 0.4299999999999997], ['and', 0.7399999999999984], ['desert', 0.23000000000000043], ['you', 0.16000000000000014], ['never', 0.3200000000000003], ['hi', 0.25], ['hi', 0.35999999999999943], ['hi', 0.6900000000000013], ['hi', 0.259999999999998], ['hi', 0.15000000000000213], ['hi', 0.16000000000000014], ['hi', 0.17999999999999972], ['hi', 0.35999999999999943], ['hi', 0.3500000000000014], ['hi', 0.48999999999999844], ['hi', 0.5000000000000036], ['hi', 0.3399999999999963], ['hi', 0.39000000000000057], ['hi', 1.1400000000000006], ['hi', 0.240000000000002], ['hi', 0.17999999999999972], ['hi', 0.28999999999999915], ['hi', 0.28999999999999915], ['hi', 0.36999999999999744], ['hi', 0.7899999999999991], ['hi', 0.2600000000000051], ['hi', 0.14999999999999858], ['hi', 0.269999999999996], ['hi', 0.37000000000000455], ['hi', 0.3200000000000003], ['hi', 0.7299999999999969], ['hi', 0.21000000000000085], ['hi', 0.14000000000000057], ['hi', 0.0799999999999983], ['hi', 0.20000000000000284], ['hi', 0.4200000000000017], ['hi', 0.29999999999999716], ['hi', 0.6099999999999994], ['hi', 0.4200000000000017], ['hi', 0.3399999999999963], ['hi', 0.4299999999999997], ['hi', 1.0]];

class ParticleUtterancesObject{
    constructor(particle, utterances){
        this.particle = particle;
        this.utterances = utterances;
        this.utterance_index = 0;
    }
    make_utterance(){
        let utterance = this.utterances[this.utterance_index];
        particleSay(utterance[0], this.particle._parentSystem.element, this.particle._x, this.particle._y, utterance[1]*1000);
        this.utterance_index++;
        //console.log(this.utterance_index);
        return this.utterance_index < this.utterances.length;
    }
    speak(){
        if(this.make_utterance()) setTimeout(this.speak.bind(this), this.utterances[this.utterance_index-1][1]*1000);
    }
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
    sayUtterances(utterances){
        let utterances_obj = new ParticleUtterancesObject(this, utterances);
        utterances_obj.speak();
    }
}
Particle.SPEED=1;
Particle.WIDTH=15;
class ParticleSystem{
    constructor(parentElement, numParticles){
        this._ticknum = 0;

        this.width = window.innerWidth-Particle.WIDTH;
        this.height = document.body.scrollHeight-Particle.WIDTH;

        parentElement.style.height = this.height + 'px';

        this.element = parentElement;

        this.particles = [];
        let addParticle = ()=>{
            this.particles.push(new Particle(this.element, this));
        }
        for(let i = 0; i < numParticles; i++){
            setTimeout(addParticle, i);
        }
        this.update_this = this.update.bind(this);
        requestAnimationFrame(this.update_this);
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
        this._ticknum++;
        requestAnimationFrame(this.update_this);
    }
}

export {ParticleSystem, Particle, rick_utterances};