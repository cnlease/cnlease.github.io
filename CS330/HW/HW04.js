"use strict";

var canvas;
var gl;

var numPositions  = 36;

var positions = [];
var positions2 = [];
var colors = [];
var add = 0.1;
var t = 0.1;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var delay = 100;

var modelViewMatrixLoc, projectionMatrixLoc;
var modelViewMatrix, projectionMatrix;

var axis = 0;
var theta = [0, 0, 0];

var thetaLoc;
var tLoc;

var rotate = false;
var morph = false;

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    colorCube();
    colorCube2();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "iPosition" );
    gl.vertexAttribPointer(positionLoc , 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc);

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(positions2), gl.STATIC_DRAW );
    
    var positionLoc = gl.getAttribLocation( program, "uPosition" );
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc);
    
    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");

    tLoc = gl.getUniformLocation(program, "t");

    thetaLoc = gl.getUniformLocation(program, "uTheta");

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    document.getElementById("rotateToggle").onclick = function(){
        rotate = !rotate;
    };
    document.getElementById("morphBtn").onclick = function(){
        morph = !morph;
    };

    render();
}


function colorCube()
{
    quad(1, 0, 3, 2, 1);
    quad(2, 3, 7, 6, 1);
    quad(3, 0, 4, 7, 1);
    quad(6, 5, 1, 2, 1);
    quad(4, 5, 6, 7, 1);
    quad(5, 4, 0, 1, 1);
}
function colorCube2()
{
    quad(1, 0, 3, 2, 2);
    quad(2, 3, 7, 6, 2);
    quad(3, 0, 4, 7, 2);
    quad(6, 5, 1, 2, 2);
    quad(4, 5, 6, 7, 2);
    quad(5, 4, 0, 1, 2);
}

function quad(a, b, c, d, e)
{
    var vertices1 = [
        vec4(-0.5, -0.5,  1.5, 1.0),
        vec4(-0.5,  0.5,  1.5, 1.0),
        vec4(0.5,  0.5,  1.5, 1.0),
        vec4(0.5, -0.5,  1.5, 1.0),
        vec4(-0.5, -0.5, 0.5, 1.0),
        vec4(-0.5,  0.5, 0.5, 1.0),
        vec4(0.5,  0.5, 0.5, 1.0),
        vec4(0.5, -0.5, 0.5, 1.0)
    ];
    var vertices2=[ 
        vec4(-0.8, -0.8,  1.8, 1.0),
        vec4(-0.8,  0.8,  1.8, 1.0),
        vec4(0.8,  0.8,  1.8, 1.0),
        vec4(0.8, -0.8,  1.8, 1.0),
        vec4(-0.8, -0.8, 0.8, 1.0),
        vec4(-0.8,  0.8, 0.8, 1.0),
        vec4(0.8,  0.8, 0.8, 1.0),
        vec4(0.8, -0.8, 0.8, 1.0)
    ];
    var vertexColors = [
        vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(1.0, 1.0, 1.0, 1.0),  // cyan
        vec4(0.0, 1.0, 1.0, 1.0)   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [a, b, c, a, c, d];

    for (var i = 0; i < indices.length; ++i ) {
        if(e == 1){
            positions.push( vertices1[indices[i]]);
        }else{
            positions2.push( vertices2[indices[i]]);
        }

        // for solid colored faces use
        colors.push(vertexColors[a]);
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(rotate){
        theta[axis] += 2.0;
    }
    gl.uniform3fv(thetaLoc, theta);
    
    if(t > 1.0){
        add *= -1.0;
    }else if(t < 0.0){
        add *= -1.0;
    }
    t += (morph ? add:0.0);
    console.log(t);
    gl.uniform1f(tLoc, t);
    

    gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    
    
    
    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
    
    
}
