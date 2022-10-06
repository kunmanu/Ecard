import { App } from "./modules/App.js"



let app =  new App



window.addEventListener("click", function () {
    localStorage.setItem("savedCanvas", document.querySelector("canvas").toDataURL());
    console.log('saved');
});






