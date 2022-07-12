import './debug_events.js';
import executeTitleAnimation from './animate_title.js';
scrollpill = import('./scrollpill.js');
particle_system = import('./particle_system.js');

executeTitleAnimation().then(()=>{
    scrollpill.then((ScrollPill)=>{
        new ScrollPill.ScrollPill("scrollpill");
    });
    particle_system.then((ParticleSystem)=>{
        let particle_system = new ParticleSystem.ParticleSystem(document.getElementById("particle_system"), 100);
        for(let i = 0; i < 50; i++){
            setTimeout(()=>{
                particle_system.particles.forEach(p => {
                    p.sayUtterances(ParticleSystem.rick_utterances);
                });
            }, 1000)
        }
    })
})
