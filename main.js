//Cameron Schuette, Jordan Johnson, Vinny Vencill, Clinton Sexton
//Main

"use strict"

var cvs,
	ctx;

var now, 
	dt = 0, 
	last = 0, 
	step = 1/60;

var mightyDucks;

var background = new Image();
background.src = "Media/flockingBack.png";

function main(){
	cvs = document.getElementById("cvs");
	ctx = cvs.getContext("2d");

	cvs.addEventListener("mousedown", onMouseDown, false);
	window.addEventListener("keydown", onKeyDown, false);
	//cvs.addEventListener("mousemove", onMouseMove, false);
	document.oncontextmenu=new Function("return false")

	//put together a team;
	mightyDucks = new Flock(20, 0, cvs.height);

	//good, clean animation
	requestAnimationFrame(update);
	
	render();
}

function update(){
	now = timeStamp();
	dt = dt + Math.min(1, (now - last) / 1000);
	while(dt > step){
		dt = dt - step;
		mightyDucks.update(dt);
	}
	//mightyDucks.seek(cvs.width/2, cvs.height/2);
	render();
	last = now;
	requestAnimationFrame(update);
}

function render(){
	ctx.clearRect(0,0,1024,512);
	ctx.drawImage(background, 0, 0);
	mightyDucks.render(ctx, cvs.width, cvs.height);
}

function onMouseDown(e){
	var x = e.clientX;
	var y = e.clientY;
	//e.preventDefault();
	
	if (e.button == 0)
		mightyDucks.seek(x, y);
	/*else if (e.button == 2)
		mightyDucks.flee(x, y);*/
	
}

function onKeyDown(e){
	if (e.keyCode == 67)
		mightyDucks.sharkClearTarget();
	if (e.keyCode == 86)
		mightyDucks.sharkChangeTarget();
}


//....other functions
function timeStamp(){
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}