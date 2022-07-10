title_object = {}
title_object.elements_on_page = document.body.getElementsByTagName("*");
title_object.texts = ["", "I'm Om Duggineni"]
window.addEventListener('domcontentloaded', ()=>{
    title_object.element = document.getElementById('title');
    title_object.update = function(index){
        this.element.innerHTML = this.texts[index];
    }
    title_object.update(0);
    title_object.interval = setInterval(()=>{
        title_object.update(1);
        setTimeout(()=>{
            title_object.update(0);
        }, 1000);
    }, 2000);
});