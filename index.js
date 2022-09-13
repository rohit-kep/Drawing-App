'use strict'



export const canvas = document.getElementById("canvas"),
colorPicker = document.getElementById("colorPicker"),
toolbar = document.getElementById("toolbar"),
shapeMenu = document.querySelector(".shape ul"),
strokeSize = document.getElementById("strokeSize"),
quickAccess = document.getElementById("quickTools");

//settings
const SETTINGS = {
    toolbarHidden: false
}


//global events



window.addEventListener("keydown",(e)=>{
    e.preventDefault();
    if(e.key === "o" && e.ctrlKey ){
        if(SETTINGS.toolbarHidden === false){
            toolbar.style.top = "-59px";
            SETTINGS.toolbarHidden = true;
        }
        else{
            toolbar.style.top = "0";
            SETTINGS.toolbarHidden = false;
        }
    }
})






//other events
quickAccess.addEventListener("mousedown",Move)
quickAccess.onmouseup=()=>{
    window.removeEventListener ("mousemove",MoveHelper);
 
}
// event listener #quickAccess
function Move(e){

        window.addEventListener("mousemove",MoveHelper);
 
}

function MoveHelper(e){

    quickAccess.style.left =`${0+e.clientX-50}px`;
    quickAccess.style.top =`${0+e.clientY-50}px`;
}

