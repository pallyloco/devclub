

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 * Found: https://gist.github.com/gre/1650294
 */
function linear(t) { return t }

// accelerating from zero velocity
function easeInQuad(t) { return t*t }

// decelerating to zero velocity
function easeOutQuad(t) { return t*(2-t) }

// acceleration until halfway, then deceleration
function easeInOutQuad(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };


/* 
  construct2d() - construct a 2d parametric function from 2 x 1d ones 
*/
function construct2d(fx, fy, start, end) {
    var delta = {x: end.x - start.x, y: end.y - start.y}; 
    return function (t) {
        return {x: start.x + delta.x * fx(t), y: start.y + delta.y * fy(t)};
    }
}

/*
 bezier(p0, p1, p2, p3)
 */
function bezier(p0, p1, p2, p3) {
    return function(t) {
        // precompute a repeating factor
        var factor = 1 - t;

        // compute the coefficients
        var c0 = factor * factor * factor;
        var c1 = 3 * factor * factor * t;
        var c2 = 3 * factor * t * t;
        var c3 = t * t * t;

        // compute the x and y coordinates are return the point.
        var px = c0 * p0.x + c1 * p1.x + c2 * p2.x + c3 * p3.x;
        var py = c0 * p0.y + c1 * p1.y + c2 * p2.y + c3 * p3.y;
        return {x: px, y: py};
    }
}

// rotation functions

function tangent(p1, p2) {
    var deltaX = p1.x - p2.x;
    var deltaY = p1.y - p2.y;
 
    var theta = Math.atan(deltaY / deltaX);
    if(deltaX < 0)
        theta += Math.PI;
    return theta;
}

function zeroG(speed) {
    var theta = 0;
    return function() {
        theta += speed;
        return theta;
    }
}


/*
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}*/
