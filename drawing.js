import {canvas,colorPicker,shapeMenu,strokeSize} from './index.js';

//setting the width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = "3px solid red";



//***************************************/
class Drawer {
    constructor(){
        this.ctx = canvas.getContext("2d");
        this.stroke = 'black';
        this.fillColor = "#FFA500";
        this.X = undefined;
        this.Y = undefined;
        this.brushOn = false;
        this.ShapesOnTheCanvas = [];
        this.shape = "rect";
        this.lineWidth = 2;
    }
        updateBaseProperties(...args){
            this.X = args[0] || undefined;
            this.Y = args[1] || undefined;
            this.brushOn = args[2] || false;
        }

    
        rect(width,height){
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.fillStyle = this.fillColor;
            this.ctx.fillRect(this.X,this.Y,width,height);
            this.ctx.strokeRect(this.X,this.Y,width,height);
        }

        line(x2,y2){
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.stroke;
            this.ctx.lineWidth  = this.lineWidth;
            this.ctx.moveTo(this.X,this.Y);
            this.ctx.lineTo(x2,y2);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        
        circle(r){
            this.ctx.fillStyle = this.fillColor;
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.strokeStyle = this.stroke;
            this.ctx.beginPath();
            this.ctx.arc(this.X,this.Y,r,0,2*Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        }
    }
    
 
    
//************************************************* */    
 export  const obj = new Drawer();
    


//************************************************** */
    canvas.onmousedown = (e)=>{
        obj.updateBaseProperties(e.clientX,e.clientY,true);
    }

    canvas.onmousemove = (e)=>{
        if(obj.brushOn){
            decideShape(e);
        }
    }

    canvas.onmouseup = (e)=>{
        if(obj.brushOn){
            
            decideShape(e,false);
        }
    }

/***************************************************/

function decideShape(e,flag=true){
   
    switch(obj.shape){
        case "rect":
            drawRect(e,flag);
        break;
        case "line":
            pencil(e,flag);
        break;
        case "circle":
            drawCircle(e,flag);
        break;
        default:     
        break;
    } 
}









function drawRect(e, flag = true){
    
        let width = e.clientX-obj.X,
        height = e.clientY-obj.Y;
        obj.rect(width,height);

        if(!flag){
            obj.updateBaseProperties(0,0,flag);
            
            obj.ShapesOnTheCanvas.push({
                x1: obj.X,
                y1:obj.Y,
                x2:e.clientX,
                y2:e.clientY
            });

        }
       
    }

function drawCircle(e,flag = true){
        
    
    const radius = Math.max(Math.abs(e.clientX-obj.X),Math.abs(e.clientY-obj.Y))
    obj.circle(radius);
    
    if(!flag){
        obj.updateBaseProperties(0,0,flag);
        obj.ShapesOnTheCanvas.push({
            x:obj.X,
            y:obj.Y,
            r: e.clientX - obj.X
        })

    }
}

function pencil(e,flag = true){

        obj.line(e.clientX,e.clientY);
        obj.updateBaseProperties(e.clientX,e.clientY,true);

        if(!flag){
            obj.updateBaseProperties(e.clientX,e.clientY,false);
        }

    }


/****************************************************/
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
}




colorPicker.onchange = (e)=>{
    let color = String(e.target.value);
    obj.fillColor = color;
}

shapeMenu.addEventListener("click",e=>{
    obj.shape = e.target.id;
    const elements = document.querySelectorAll(".shape ul li i");


    for(let i=0;i<elements.length;i++){
        if(elements[i].id === e.target.id){
            elements[i].style.color = "#16A2F9";
        }else{
            elements[i].style.color = "white";
        }
       
    }

})

strokeSize.onchange = (e)=>{
    console.log(e.target.value);
    obj.lineWidth = e.target.value;
    
}


/** tasks to do
 * 1. rectangle resizable isn't complete
 * 
 */