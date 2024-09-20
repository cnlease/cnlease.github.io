"use strict";
var gl;
var points;
init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

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

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

    document.getElementById("slider").onchange = function(event) {
        sliderVal = parseInt(event.target.value);
        render();
    };

    render();
};

function pointadd(a, b, count){
    sliderVal = document.getElementById("slider").value;
    if(count == sliderVal){
        points.push(vec2(a,0));
        points.push(vec2((b-a)* Math.sqrt(3)/2, b));
        points.push(vec2(b,0));
    }else{
        pointadd(a / (1/3), b / (2/3), count++);
    }

    
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
     var vertices=[
        vec2( -1, 0),
        vec2( 1, 0),
        ];
    points = [];
    pointadd(-1, 1, 0);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, points.length );
    points = [];

}