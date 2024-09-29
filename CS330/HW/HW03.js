"use strict";
var gl;
var first;
var second;
var out;

var t = 0.0;
var thetaLoc;

var delay = 100;
var morphing = false;
init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    first=[ //add more points later
        vec2( -0.95 , -0.95 ),
        vec2(  0.00 , -0.55 ),
        vec2(  0.85 , -0.85 )
    ];

    second=[
        vec2( -0.75 ,  0.45 ),
        vec2(  0.00 ,  0.75 ),
        vec2( -0.35 ,  0.45 )
    ];
    
    
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(first), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "uPosition" );
    gl.vertexAttribPointer(positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc);

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(second), gl.STATIC_DRAW );
    
    var positionLoc = gl.getAttribLocation( program, "iPosition" );
    gl.vertexAttribPointer(positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc);

    thetaLoc = gl.getUniformLocation(program, "t");

    document.getElementById("Morphing").onclick = function () {
        morphing = !morphing;
    };



    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    t += (morphing ? 0.1:0.0); 
    gl.uniform1f(thetaLoc, t);

    //gl.bufferData( gl.ARRAY_BUFFER, flatten(out), gl.STATIC_DRAW );
    gl.drawArrays(gl.LINE_LOOP, 0, 3);

    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
}