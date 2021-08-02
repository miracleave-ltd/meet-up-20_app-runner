/*
* -------------- gravity ここから --------------
*/

/*
元ネタ：https://openprocessing.org/sketch/1145107
*/

// distances will be a half-populated 2d array holding the distance for 
// every particle pair, to cut down on calculation time
var distances = [];

// particles will be the array of particles. Straight forward, huh?
var particleGs = [];

// press 'p' to toggle pausing the animation
var pausedGravity = true;


// Some constant coefficients
// These numbers just kind of work nicely.
// you technically need one number, but
// the numbers otherwise get kind of unwieldy 


// Gravitational constant
var G = 0.000005;

// DISTANCE CONSTANT
var D = 500.0;

// small number
var EPSILON = 0.0001;

var LIMIT = 1500;


class ParticleG {
    constructor(x, y, vx, vy, massG, color){
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.vx = (vx !== undefined) ? vx : 0;
        this.vy = (vy !== undefined) ? vy : 0;
        this.massG = (massG !== undefined) ? massG : 0;
        this.color = (color !== undefined) ? color : color(0,0,0);
        this.toDestroy = false;


        stroke(this.color);
        strokeWeight(this.massG / 4 + 1);
        point(x, y);
    }

    update(id, particleGs){
        var fx = 0;
        var fy = 0;
        for(var i=0; i < particleGs.length; ++i){
            var inverseDistance = findInverseDistance(particleGs, id, i)

            fx += particleGs[i].massG * inverseDistance * (particleGs[i].x - this.x);
            fy += particleGs[i].massG * inverseDistance * (particleGs[i].y - this.y);
        }

        this.vx += fx * G;
        this.vy += fy * G;
        this.px =  this.x;
        this.py =  this.y;
        this.x  += this.vx;
        this.y  += this.vy;


        if(this.x < 0 || this.x >= width || this.y < 0 || this.y >= height){
            this.toDestroy = true;
        }
    }

    drawAndDestroy(){
        stroke(this.color);
        strokeWeight(this.massG / 4 + 1);
        line(this.px, this.py, this.x, this.y);
        return this.toDestroy;
    }

}

function findInverseDistance(particleGs, index1, index2){
    if(index1 == index2){
        return 0;
    } else if(index1 < index2){
        if(distances[index1][index2] == null){
            distances[index1][index2] = inverseDistance(
                particleGs[index1].x,
                particleGs[index1].y, 
                particleGs[index2].x, 
                particleGs[index2].y
            );
        }
        return distances[index1][index2];
    } else {
        if(distances[index2][index1] == null){
            distances[index2][index1] = inverseDistance(
                particleGs[index1].x,
                particleGs[index1].y, 
                particleGs[index2].x, 
                particleGs[index2].y
            );
        }
        return distances[index2][index1]
    }
}

function inverseDistance(x1, y1, x2, y2){
    var dist =  sq( sq(x1 - x2) * EPSILON + sq(y1 - y2) * EPSILON );
    // Make sure the particleGs never get too close
    return (dist < LIMIT) ? D / LIMIT : D / dist;
}

// Adds a particle with a random massG and color at the position specified
function addParticle(x, y){
    particleGs.push( new ParticleG(x, y, 0, 0, random(10), randomColor()) );
}

// generates a random reddish color
function randomColor(){
    return color(255, random(255), random(255));
}

function gravitySetUp() {
    background(0,0,0);
}
function gravityDraw() {
    // fade the canvas to black
    background(0, 10);

    let pcount = particleGs.length;
    var newParticleGs = [];

    // clear the distance array before each round
    distances = new Array(pcount);

    for(var i=0; i < pcount ; ++i){
        // declare the ith column of the pcount x pcount 2d distance array
        distances[i] = new Array(pcount);

        // update the position and velocity of the ith particle
        particleGs[i].update(i, particleGs);

        // draw the ith particle, and if it is still on screen, add it to
        // the array of particleGs for the next round
        if(!particleGs[i].drawAndDestroy()){
            newParticleGs.push(particleGs[i]);
        }
    }
    particleGs = newParticleGs;
}

/*
* -------------- gravity ここまで --------------
*/


/*
* -------------- mermaid wave ここから --------------
*/

/*
元ネタ：https://openprocessing.org/sketch/1214016
*/

var pausedMermaid = true;

let noiseMax = 1;
let zoff = 0;

let ca, cb;

let ox, oy;

let MAX;


function mermaidSetup() {
    angleMode(DEGREES);
    
    ca = color("#30cfd0");
    cb = color("#330867");
    
    
    ox = width / 2;
    oy = height;
    
    MAX = width > height ? width : height;
    
    noFill();
    background("#E7ECF2");
}

function mermaidDraw() {
    // background(230);
    
    stroke(lerpColor(ca, cb, abs(sin(zoff * 100))));
    push();
    translate(ox, oy);
    beginShape();
    for (let t = 0; t < 360; t++) {
        let xoff = map(cos(t), -1, 1, 0, noiseMax);
        let yoff = map(sin(t), -1, 1, 0, noiseMax);
    
        let n = noise(xoff, yoff, zoff);
    
        let r = map(n, 0, 1, 0, height * 1.5);
        let x = r * cos(t);
        let y = r * sin(t);
    
        // let c = lerpColor(ca, cb, n);
    
        vertex(x, y);
    }
    endShape(CLOSE);
    
    zoff += 0.005;
}

/*
* -------------- mermaid wave ここまで --------------
*/


/*
* -------------- wobbly swarm ここから --------------
*/

/*
元ネタ：https://openprocessing.org/sketch/1231390
*/

var pausedWobbly = true;
var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];

function wobblySetup() {
	noStroke();
	fill(64, 255, 255, 192);
    // noCursor();
}

function wobblyDraw() {
	background('white');
	
	for (var particleA = 0; particleA < mass.length; particleA++) {
		var accelerationX = 0, accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				var force = (distance - 320) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
	}
	
	for (var particleAll = 0; particleAll < mass.length; particleAll++) {
		positionX[particleAll] += velocityX[particleAll];
		positionY[particleAll] += velocityY[particleAll];
		
		ellipse(positionX[particleAll], positionY[particleAll], mass[particleAll] * 1000, mass[particleAll] * 1000);
	}
}

function addNewParticle() {
	mass.push(random(0.003, 0.03));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(0);
	velocityY.push(0);
}

/*
* -------------- wobbly swarm ここまで --------------
*/


/*
* -------------- 実行用タグ ここから --------------
*/
let button1; // gravity 発火ボタン
let button2; // mermaid wave 発火ボタン
let button3; // wobbly swarm 発火ボタン
let txt1;
let txt2;
let txt3;

function preload() {
    button1 = createButton("gravity");
    button2 = createButton("mermaid wave");
    button3 = createButton("wobbly swarm");
    txt1 = createP('下のボタンいずれかをクリックしてください！').class('txt1');
    txt2 = createP('画面をクリック！').class('txt2');
    txt3 = createP('面倒臭いことはもうしない！AWS App RunnerでWebアプリを爆速でデプロイ！').class('txt3');
    txt2.hide();
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    button1.mousePressed(() => {
        button2.removeClass('active');
        button3.removeClass('active');
        button1.class('active');
        txt1.remove();
        txt2.show();

        // mermaid wave 停止
        pausedMermaid = true;

        // wobbly swarm 停止
        pausedWobbly = true;
        mass = [];
        positionX = [];
        positionY = [];
        velocityX = [];

        // gravity 実行
        pausedGravity = false;
        distances = [];
        particleGs = [];
        gravitySetUp();
    });
    button2.mousePressed(() => {
        button1.removeClass('active');
        button3.removeClass('active');
        button2.class('active');
        txt1.remove();
        txt2.hide();

        // wobbly swarm 停止
        pausedWobbly = true;
        mass = [];
        positionX = [];
        positionY = [];
        velocityX = [];
        
        // gravity 停止
        pausedGravity = true;
        distances = [];
        particleGs = [];

        // mermaid wave 実行
        pausedMermaid = false;
        mermaidSetup();
    });
    button3.mousePressed(() => {
        button1.removeClass('active');
        button2.removeClass('active');
        button3.class('active');
        txt1.remove();
        txt2.show();

        // mermaid wave 停止
        pausedMermaid = true;
        
        // gravity 停止
        pausedGravity = true;
        distances = [];
        particleGs = [];
        
        // wobbly swarm 実行
        pausedWobbly = false;
        mass = [];
        positionX = [];
        positionY = [];
        velocityX = [];
        velocityY = [];
        wobblySetup();
    });
    
}

function draw() {

    if( !pausedGravity ){
        if(mouseIsPressed){
            addParticle(mouseX, mouseY);
        }
        gravityDraw();
    }

    if( !pausedMermaid ){
        mermaidDraw();
    }

    if( !pausedWobbly ){
        wobblyDraw();
    }
}


function mouseClicked() {
    if( !pausedWobbly ) {
        addNewParticle();
    }
}

function mouseDragged() {
    if( !pausedWobbly ) {
        addNewParticle();
    }
}

/*
* -------------- 実行用タグ ここまで --------------
*/