const setTimeoutOld = window.setTimeout;
var eventsWaitingCount = 0;
window.setTimeout = function(func, delay){
    setTimeoutOld(()=>{
        eventsWaitingCount--;
        console.log("setTimeout handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        func();
    }, delay);
    eventsWaitingCount++;
    //console.log("setTimeout handler created from " + String(func) + " with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    //console.log("setTimeout handler created with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    console.log("setTimeout handler created. There are " + eventsWaitingCount + " event handlers in operation.");
}

//patch Promise.prototype.then
const promiseThenOld = Promise.prototype.then;
window.Promise.prototype.then = function(onFulfilled, onRejected){
    promiseThenOld.call(this, (...args)=>{
        eventsWaitingCount--;
        console.log("Promise handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        if(onFulfilled) onFulfilled(...args);
    }, (...args)=>{
        eventsWaitingCount--;
        console.log("Promise rejection handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        console.log(String(onFulfilled));
       if(onRejected) onRejected(...args);
    });
    eventsWaitingCount++;
    //console.log("Promise handler created from " + String(onFulfilled) + " and " + String(onRejected) + ". There are " + eventsWaitingCount + " event handlers in operation.");
    //console.log("Promise handler created from " + String(onFulfilled) + " with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    //console.log("Promise handler created with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    console.log("Promise handler created. There are " + eventsWaitingCount + " event handlers in operation.");
}

//patch Promise.prototype.catch
const promiseCatchOld = Promise.prototype.catch;
window.Promise.prototype.catch = function(onRejected){
    promiseCatchOld.call(this, (...args)=>{
        eventsWaitingCount--;
        console.log("Promise rejection handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        if(onRejected) onRejected(...args);
    });
    eventsWaitingCount++;
    //console.log("Promise rejection handler created from " + String(onRejected) + ". There are " + eventsWaitingCount + " event handlers in operation.");
    //console.log("Promise rejection handler created with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    console.log("Promise rejection handler created. There are " + eventsWaitingCount + " event handlers in operation.");
}

//patch Promise.prototype.finally
const promiseFinallyOld = Promise.prototype.finally;
window.Promise.prototype.finally = function(onFinally){
    promiseFinallyOld.call(this, (...args)=>{
        eventsWaitingCount--;
        console.log("Promise finally handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        if(onFinally) onFinally(...args);
    }, (...args)=>{
        eventsWaitingCount--;
        console.log("Promise finally rejection handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        if(onFinally) onFinally(...args);
    });
    eventsWaitingCount++;
    //console.log("Promise finally handler created from " + String(onFinally) + ". There are " + eventsWaitingCount + " event handlers in operation.");
    //console.log("Promise finally handler created with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    console.log("Promise finally handler created. There are " + eventsWaitingCount + " event handlers in operation.");
}

//patch setInterval and clearInterval
const setIntervalOld = window.setInterval;
const intervalsSet = new Set();
window.setInterval = function(func, delay){
    let interval_num = setIntervalOld(()=>{
        console.log("setInterval handler called. There are " + eventsWaitingCount + " event handlers in operation.");
        func();
    }, delay);
    eventsWaitingCount++;
    intervalsSet.add(interval_num);
    //console.log("setInterval handler created from " + String(func) + " with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    //console.log("setInterval handler created with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
    console.log("setInterval handler created. There are " + eventsWaitingCount + " event handlers in operation.");
}
const clearIntervalOld = window.clearInterval;
window.clearInterval = function(interval_num){
    clearIntervalOld(interval_num);
    if(intervalsSet.has(interval_num)) intervalsSet.delete(interval_num);
    eventsWaitingCount--;
    console.log("clearInterval handler called. There are " + eventsWaitingCount + " event handlers in operation.");
}

//patch requestAnimationFrame and cancelAnimationFrame
// const requestAnimationFrameOld = window.requestAnimationFrame;
// const animationFramesSet = new Set();
// window.requestAnimationFrame = function(func){
//     let animationFrame_num = requestAnimationFrameOld(()=>{
//         console.log("requestAnimationFrame handler called. There are " + eventsWaitingCount + " event handlers in operation.");
//         // console.log(animationFramesSet)
//         // console.log(animationFrame_num)
//         if(animationFramesSet.has(animationFrame_num)){
//             animationFramesSet.delete(animationFrame_num);
//             eventsWaitingCount--;
//         }
//         func();
//     });
//     eventsWaitingCount++;
//     animationFramesSet.add(animationFrame_num);
//     //console.log("requestAnimationFrame handler created from " + String(func) + ". There are " + eventsWaitingCount + " event handlers in operation.");
//     //console.log("requestAnimationFrame handler created with delay " + delay + ". There are " + eventsWaitingCount + " event handlers in operation.");
//     console.log("requestAnimationFrame handler created. There are " + eventsWaitingCount + " event handlers in operation.");
// }
// const cancelAnimationFrameOld = window.cancelAnimationFrame;
// window.cancelAnimationFrame = function(animationFrame_num){
//     cancelAnimationFrameOld(animationFrame_num);
//     if(animationFrame_num in animationFramesSet){
//         animationFramesSet.delete(animationFrame_num);
//         eventsWaitingCount--;
//     }
//     console.log("cancelAnimationFrame handler called. There are " + eventsWaitingCount + " event handlers in operation.");
// }


export {setTimeoutOld, promiseThenOld};