//Cameron Schuette, Jordan Johnson, Vinny Vencill, Clinton Sexton
//Shark Class

"use strict"

function Shark ( posX, posY, facing, vel)
{
	this.pos = new Vector2(posX, posY);

	this.rotVel = 30; // rotVel + rotAcc * dT
	
	this.maxVel = new Vector2(100,100);
	this.minVel = new Vector2(-50,-50);
	this.vel = vel;
	
	this.facing = angle(this.vel);
	
	this.accel = new Vector2(0,0);
	
	this.target = new Vector2(512,256);

	this.bTarget = null //Shark target, boid
}

Shark.prototype.addForce = function(x, y)
{
	this.target = new Vector2(x, y);
}

Shark.prototype.render = function( ctx, width, height )
{ 
	ctx.save();
	var w = width - (width - this.pos.x) + Shark.img.width/2;
	var h = height - (height - this.pos.y) + Shark.img.height/2;
	ctx.translate(w, h);
	ctx.rotate(this.facing*Math.PI/180);
	ctx.translate(-w,-h);          
	ctx.drawImage(Shark.img, this.pos.x, this.pos.y);
	ctx.restore();
}

Shark.prototype.update = function( dT )
{
	if(this.bTarget)
		this.target = new Vector2(this.bTarget.pos.x, this.bTarget.pos.y);

	this.accel = new Vector2(this.target.x - this.pos.x, this.target.y - this.pos.y);
	this.accel = normalize(this.accel);
	this.accel = add(this.accel, mul(this.accel,200 * dT));
	
	this.vel = add(this.vel, this.accel);
	//this.accel = mul(this.accel, 0);
	
	if (length(this.vel) > length(this.maxVel))
		this.vel = mul(normalize(this.vel), this.maxVel);

	this.pos.x += this.vel.x * dT;
   	this.pos.y += this.vel.y * dT;
	
	this.facing = angle(this.vel);
}

Shark.img = new Image();
Shark.img.src = "Media/shark.png";