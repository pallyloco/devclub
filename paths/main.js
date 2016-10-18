

const CANVAS_NAME = "exampleCanvas"; 
const ANIM_SPEED = 20;

// canvas variables
var canvasContext;
var canvasMinX, canvasMinY, canvasMaxX, canvasMaxY;
var canvas;

// images
var batImage;

// the current path
var path;

/*
 Initialize 
 */
function init() {

    // initialize canvas
    canvas = document.getElementById(CANVAS_NAME);
    canvasMinX = canvas.offsetLeft;
    canvasMaxX = canvasMinX + canvas.width;
    canvasMinY = canvas.offsetTop;
    canvasMaxY = canvasMinY + canvas.height;
    canvasContext = canvas.getContext('2d');
    
    batImage = new Image();
    batImage.src = "res/bat.png";
    
    window.addEventListener("click", onMouseClick);
    
    setInterval(draw, ANIM_SPEED);
}

/*
 onMouseClick - create a "bat" with a path
 */
function onMouseClick(event) {
    
    if(event.pageX > canvasMinX && event.pageX < canvasMaxX && event.pageY > canvasMinY && event.pageY < canvasMaxY) {

        // erase everything
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        
        // get the canvas position
        var posX = event.pageX - canvasMinX;
        var posY = event.pageY - canvasMinY;

        // some random Y position
        var endY = Math.random() * canvas.height;

        var start = {x: posX, y:posY};
        var end = {x: canvasMaxX, y: endY};

        // Create an "Easing function"
        var f1 = construct2d(easeInOutQuad, linear, start, end);
        
        // ... or create a bezier 
        
        // some random control points for bezier curve
        var p1 = {x: 50, y: 700};
        var p2 = {x: 1000, y: 400};
        var f2 = bezier(start, p1, p2, end);

        // .. or a "spiral
        
        var max = 3 * Math.PI; 
        var fx = function(t) { return t * Math.cos(t * max) };
        var fy = function(t) { return t * Math.sin(t * max) };
        var f3 = construct2d(fx, fy,  start, end);
         
        path = new Path(batImage, 100, 5000, f3, tangent); 
    }
}
    
/* 
 Draw - draw the path
 */
function draw() {

    // only draw when a path is defined
    if(path) {
        // clear the path image
        path.clear(canvasContext);
        // draw the path image progressing by ANIM_SPEED
        path.draw(ANIM_SPEED, canvasContext);

        // when the path is done, show it using points and reset the path for the next click event
        if(path.isOver()) {
            path.drawFinalPath(canvasContext);
            path = null;
        }
    }
}

window.addEventListener("load", init);

