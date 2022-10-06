export class Paint {
    constructor(canvas){
        this.drawing = false
        this.prevX = 0
        this.prevY = 0
        
        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")
        this.ctx.strokeStyle = "black"
        this.ctx.lineWidth = 2 
        this.ctx.lineJoin='round';
        
        let rect = this.canvas.getBoundingClientRect();



        

        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.canvas.addEventListener("mousedown", (e) => {
            if (e.buttons != 1){
                return
            } 
            this.drawing = true
            this.prevX = e.offsetX * this.canvas.witdh /this.canvas.clientWidth
            this.prevY = e.offsetY * this.canvas.height /this.canvas.clientHeight



            
        })
        
        this.canvas.addEventListener("mousemove", (e) =>{
            if (this.drawing) {
                this.curX = (e.pageX - rect.left) * this.canvas.width /this.canvas.clientWidth
                this.curY = (e.pageY- rect.top) * this.canvas.height /this.canvas.clientHeight
                this.draw (this.prevX, this.prevY, this.curX, this.curY)
                
                // console.log("prevX : ", this.prevX);
                // console.log("prevY : ", this.prevY);
                
                // console.log("W",this.canvas.width);
                // console.log("H",this.canvas.heigh);

                this.prevX = this.curX
                this.prevY = this.curY



            }
        })

        

        document.addEventListener("mouseup", ()=>{
            this.drawing = false
        })
        this.canvas.addEventListener("mouseout", ()=>{
            // this.drawing = false
        })

        this.canvas.addEventListener("mouseover", (e)=>{
      
             
      
       
                this.prevX = (e.pageX  - rect.left) * this.canvas.witdh /this.canvas.clientWidth
                this.prevY = (e.pageY- rect.top) * this.canvas.height /this.canvas.clientHeight
        })




    

    }



    draw(depX, depY, destX, destY){
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(destX, destY);
        this.ctx.closePath();
        this.ctx.stroke();
        
    }

    setColor(color){
        this.ctx.strokeStyle=color;

    }

    setLineWidth(action){

        if (action == "++") {
            this.ctx.lineWidth ++
        }
        if (action == "--") {
            this.ctx.lineWidth --
        }
            
    }

    eraseCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }

}