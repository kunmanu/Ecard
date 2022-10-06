import { Paint } from "./Paint.js";

export class App {
    constructor(){
      
        this.sizeTools = document.querySelectorAll(".toolbox .SizeTools");
        this.colors = document.querySelectorAll(".colors");
        this.paint = new Paint("#canvas")
        this.ctx = this.paint.ctx
        this.canvasFrame = this.paint.canvas
        this.sizeTools =  document.querySelectorAll('.SizeTools')
        this.downloadBtn = document.querySelector(".download")

        this.init()
    }


    initPalette(){
        //Affiche les couleurs dans la palette
        for (let i = 0; i < this.colors.length; i++) {
            this.colors[i].style.backgroundColor = this.colors[i].dataset.color;
        
            this.colors[i].addEventListener("click", () => {
                
                this.paint.setColor(this.colors[i].dataset.color);
            });
        }

        //Affiche une transformation sur la couleur selectionnée
        for (let i = 0; i < this.colors.length; i++) {
            const color = this.colors[i];
            color.addEventListener("click", () => {
            if (document.querySelector(".selected") != null) {
                document.querySelector(".selected").classList.toggle("selected");
            }
            color.classList.toggle("selected");
            });
        }

        //Colorpicker
        document.querySelector(".colorwheel").addEventListener("click", (e) => {
            if (document.querySelector(".selected") != null) {
                document.querySelector(".selected").classList.remove("selected");
            }
            this.paint.setColor(e.target.value);
            document.querySelector(".colorwheel").classList.add("selected");
        });




    }
    
    initTools(){
    
        //Bouton + et -
        for (let i = 0; i < this.sizeTools.length; i++) {
            this.sizeTools[i].addEventListener("click", () => {
                this.paint.setLineWidth(this.sizeTools[i].dataset.action);
            });
        }

        //Gomme
        document.querySelector(".eraser").addEventListener("click", () => {
            this.paint.setColor("white");
        });

        //Brush
        document.querySelector(".paintbrush").addEventListener("click", () => {
            this.paint.setColor("black");
        });

        //Efface le canvas
        document.querySelector(".clearer").addEventListener("click", () => {
            this.paint.eraseCanvas();
        });

        //Telecharge le canvas
        this.downloadBtn.addEventListener("click",  ()=> {
        
            console.log(this.canvasFrame.toDataURL());
            let link = document.createElement("a");
            link.download = "MyCanvas.png";
            link.href = this.canvasFrame.toDataURL();
            link.click();
            link.delete;
        });

        //mail le canvas
        document.querySelector(".mail").addEventListener("click", () => {
            document.querySelector(".canvasPreview").src = localStorage["savedCanvas"];
            document.querySelector(".mailContainer-back").classList.toggle("hide");
        });

        
        //Open Mail Form
        document.querySelector(".colorwheel").addEventListener("change", (e) => {
            if (document.querySelector(".selected") != null) {
                document.querySelector(".selected").classList.remove("selected");
            }
            this.paint.setColor(e.target.value);
            document.querySelector(".colorwheel").classList.add("selected");
        });

        //Close Maillform
        document.querySelector(".closeMail").addEventListener("click", () => {
            document.querySelector(".mailContainer-back").classList.toggle("hide");
        });

        //File reader on button
        document.querySelector(".userFileForm").addEventListener("change", this.fileReader.bind(this));

    }


    fileReader() {

        const reader = new FileReader();
        const userImg = document.querySelector(".userImg").files[0];
        reader.addEventListener("loadend", () => {
            let data = reader.result;
            let img = new Image();
    
            img.onload =  () => {
                this.ctx.drawImage(img, 0, 0);
            };
            img.src = data;
            console.log(data);
        });
        reader.readAsDataURL(userImg);
        document.querySelector(".userFileForm").reset();
        localStorage.setItem("savedCanvas", this.canvasFrame.toDataURL());
        document.querySelector(".canvasPreview").src = localStorage["savedCanvas"];
    }
    
   
    

    initCanvas(){
        //
        if (localStorage.hasOwnProperty("savedCanvas")) {
            document.querySelector(".saved").innerHTML = "Canvas restauré depuis la dernière session";
            let savedImg = new Image();
            savedImg.onload =  () => {
                this.ctx.drawImage(savedImg, 0, 0);
            };
            savedImg.src = localStorage["savedCanvas"];
        }
    }


    init(){
        this.initPalette()
        this.initTools()
        this.initCanvas()
    }


}


