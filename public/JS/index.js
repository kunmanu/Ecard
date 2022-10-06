import { App } from "./modules/App.js"



let app =  new App

let canvasFrame = document.querySelector("canvas");

document.addEventListener("click", function () {
    localStorage.setItem("savedCanvas", canvasFrame.toDataURL());
});






