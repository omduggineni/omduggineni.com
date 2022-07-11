const sleep = ms => new Promise(r => setTimeout(r, ms));

var TitleElement = null;
var TitleAnimationTexts = ["science nerd ", "hardworking academic ", "Om Duggineni "];

var titleAnimationHideEverything = function(){
    let elements_on_page = document.body.querySelectorAll(":not(.necessary-for-title-animation)");
    //console.log(elements_on_page);
    elements_on_page.forEach(function(element){
        element.classList.add("not-visible");
    });
};

var titleAnimationBringIntoView = function(){
    let elements_on_page = document.body.querySelectorAll(":not(.necessary-for-title-animation)");
    //console.log(elements_on_page);
    elements_on_page.forEach(function(element){
        element.classList.add('bring-into-view');
        element.classList.remove("not-visible");
    });
    setTimeout(()=>{
        elements_on_page.forEach(function(element){
            element.classList.remove('bring-into-view');
        });
    }, 1000);
};

const titleAnimationTypewriteTitle = async(text, delay, untypewrite) =>{
    //TitleElement
    let title_text = "";
    let delays = [];
    for(let i = 0; i < text.length; i++){
        title_text += text[i];
        TitleElement.innerHTML = title_text + "&#9608";
        let current_delay = Math.random()*delay+delay;
        delays.push(current_delay);
        await sleep(current_delay);
    }
    if(untypewrite){
        //untypewrite
        for(let i = text.length-1; i >= 0; i--){
            title_text = title_text.substring(0, title_text.length-1);
            TitleElement.innerHTML = title_text + "&#9608";
            let current_delay = delays[i]*0.9;
            await sleep(current_delay);
        }
    }
}
const titleAnimationToggleTypingIndicator = function(){
    //console.log(TitleElement.innerHTML[TitleElement.innerHTML.length-1])
    //console.log(decodeURI("&#9608"))
    //console.log(TitleElement.innerHTML[TitleElement.innerHTML.length-1] == "\u2588")
    if(TitleElement.innerHTML[TitleElement.innerHTML.length-1] == "\u2588"){
        TitleElement.innerHTML = TitleElement.innerHTML.replace("\u2588", "");
        //console.log(TitleElement.innerHTML);
    }else{
        TitleElement.innerHTML = TitleElement.innerHTML + "&#9608";
        //console.log(TitleElement.innerHTML);
    }
}
window.addEventListener('DOMContentLoaded', async()=>{
    TitleElement = document.getElementById("page-title");
    setInterval(titleAnimationToggleTypingIndicator, 1000);
    titleAnimationHideEverything();
    for(let i = 0; i < TitleAnimationTexts.length-1; i++){
        await titleAnimationTypewriteTitle(TitleAnimationTexts[i], 70, true);
        await sleep(400);
    }
    await titleAnimationTypewriteTitle(TitleAnimationTexts[TitleAnimationTexts.length-1], 70, false);
    titleAnimationBringIntoView();
});


