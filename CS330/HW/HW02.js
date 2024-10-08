"use strict";
var canvas;
var gl;
var points;
var bufferId;
var sliderVal = 0;
init();

function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );



    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

        document.getElementById("slider").onchange = function(event) {
        sliderVal = parseInt(event.target.value);
        render();
    };

    render();
};

function pointadd(a, b, count){
    points.push(vec2(a,0));
    points.push(vec2(b,0));
    points.push(vec2(a+ ((b-a)/2),(b-a)* (Math.sqrt(3)/2)));


if(count != 1){
    pointadd((-1 +a)/3, (-1 +a)* (2/3), count-1);
    pointadd((1-b)/3, (1-b)* (2/3), count-1);
}    
}

function render() {
    points = [
        vec2(-1,0),
        vec2(1,0)
    ];
    if(sliderVal > 0){
        pointadd((-1/3), (1/3), sliderVal);
    }
    points.sort(numbersort);
    console.log(points);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.LINE_STRIP, 0, points.length);
    points = [];

}

function numbersort(a,b){
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
};