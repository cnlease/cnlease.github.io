"use strict";
var gl;
var first;
var second;
var out;

var t = 0.0;
var thetaLoc;
var add = -0.1;

var delay = 100;
var morphing = false;
init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    first=[ //j
        vec2( 0.3, 0.5 ),
        vec2( 0.6, 0.5 ),
        vec2( 0.6, -0.5),
        vec2(-0.3, -0.5),
        vec2(-0.3, -0.1),
        vec2(0.0, -0.1),
        vec2(0.0, -0.3),
        vec2(0.3, -0.3)
    ];

    second=[ //c
        vec2( -0.6, 0.5),
        vec2( 0.6, 0.5),
        vec2( 0.6, 0.2),
        vec2(-0.4, 0.2),
        vec2(-0.4, -0.2),
        vec2(0.6, -0.2),
        vec2(0.6, -0.5),
        vec2(-0.6, -0.5)
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
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(t >= 1.0){
        add *= -1.0;
    }else if(t <= 0.0){
        add *= -1.0;
    }
    console.log(t);
    t += (morphing ? add:0.0);

    gl.uniform1f(thetaLoc, t);

    
    gl.drawArrays(gl.LINE_LOOP, 0, 8);

    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
}