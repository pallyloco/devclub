/*
 Class Path - represents a path animation with custom path and rotation functions
 */
function Path(image, width, duration, path, rotation) {

    // Process image
    this.image = image;
    this.width = width;
    this.height =  (width / image.width) * image.height; // set height proportional to width
    this.heightHalf = this.height / 2; // optimization: recalculated each time drawn
    this.widthHalf = this.width / 2;

    // amount of time for the path animation to complete
    this.duration = duration;
    
   // parametric function [0,1] -> {x:R, y:R} used to calculate the current (x,y) along the path
    this.path = path;

    // record the progress along the path as a percent [0,1]
    this.progress = 0;
    
    // initilize the position to the start of the path
    this.position = this.path(0);
    this.previousPosition = { x:-1, y: -1};

    // the current angle of the image
    this.theta = 0;

    // the rotation function ({x:R,y:R},{x:R,y:R}) -> R
    // used to update theta on each draw
    this.rotation = rotation;
 
    /*
      clear() - clear the canvas where 
     */
    this.clear = function(canvasContext) {

        // clear the previous image from the canvas, factoring in the rotation
        canvasContext.save();
        canvasContext.translate(this.position.x + this.widthHalf, this.position.y + this.heightHalf);
        canvasContext.rotate(this.theta);
        canvasContext.clearRect(-this.widthHalf, -this.heightHalf, this.width, this.height);
        canvasContext.restore();
    }

    /*
      draw() - advance the path and draw it
     */
    this.draw = function (time, canvasContext) {

        // update the position
        this.previousPosition = this.position;
        this.position = this.step(time);

        // update the angle
        this.theta = this.rotation(this.position, this.previousPosition);

        // draw the image, factoring in the rotation
        canvasContext.save();
        canvasContext.translate(this.position.x + this.widthHalf, this.position.y + this.heightHalf);
        canvasContext.rotate(this.theta);
        canvasContext.drawImage(this.image,  -this.widthHalf, -this.heightHalf, this.width, this.height);
        canvasContext.restore();
    }

    /*
     isOver() - determine if the animation in complete
     */
    this.isOver = function () {
        return this.progress > 1;
    }

    /*
      step(time) - get the position that results from stepping the path by the given time (ms)
     */
    this.step = function (time) {
        // update the progress as a fraction of the duration
        this.progress +=  time / this.duration;
        return this.path(this.progress);
    };

    /*
      draw circles along the animation path
     */
    this.drawFinalPath = function(canvasContext) {
        for(var i=0; i<1; i+=0.01) {
            var pos = this.path(i);
            canvasContext.beginPath();
            canvasContext.arc(pos.x + this.widthHalf, pos.y + this.heightHalf, 2, 0, 2*Math.PI, true);
            canvasContext.closePath();
            canvasContext.fill();
        }
    }
 
}
