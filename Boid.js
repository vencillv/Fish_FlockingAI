//Cameron Schuette, Jordan Johnson, Vinny Vencill, Clinton Sexton
//Boid Class

"use strict"

function Boid ( posX, posY, facing, mass, vel)
{
	this.pos = new Vector2(posX, posY);
	this.mass = mass; // scalar

	this.rotVel = 50; // rotVel + rotAcc * dT
	
	this.maxVel = new Vector2(150,150);
	this.minVel = new Vector2(-50,-50);
	this.vel = vel;
	
	this.facing = angle(this.vel);
	
	this.accel = new Vector2(0,0);
	
	this.Starget = new Vector2(512,256);
	this.Ftarget = new Vector2(30,30);
	this.type = 1; //flee -1, seek 1
	this.sTarget = null; // Sharks target
}

Boid.prototype.addForce = function(x, y, type)
{
	if (type == 1)
		this.Starget = new Vector2( x, y);
	else if (type == -1){
		this.Ftarget = new Vector2(x, y );
	}
}

Boid.prototype.render = function( ctx, width, height )
{

	switch(this.mass)
	{
		case 1:
			ctx.save();
			var w = width - (width - this.pos.x) + Boid.img1.width/2;
			var h = height - (height - this.pos.y) + Boid.img1.height/2;
			ctx.translate(w, h);
			ctx.rotate(this.facing*Math.PI/180);
			ctx.translate(-w,-h);
			ctx.drawImage(Boid.img1, this.pos.x, this.pos.y);
			ctx.restore();
			break;        
		case 2:  
			ctx.save();
			var w = width - (width - this.pos.x) + Boid.img1.width/2;
			var h = height - (height - this.pos.y) + Boid.img1.height/2;
			ctx.translate(w, h);
			ctx.rotate(this.facing*Math.PI/180); 
			ctx.translate(-w,-h);        
			ctx.drawImage(Boid.img2, this.pos.x, this.pos.y);
			ctx.restore();
			break;        
		case 3: 
			ctx.save();
			var w = width - (width - this.pos.x) + Boid.img1.width/2;
			var h = height - (height - this.pos.y) + Boid.img1.height/2;
			ctx.translate(w, h);
			ctx.rotate(this.facing*Math.PI/180);
			ctx.translate(-w,-h);         
			ctx.drawImage(Boid.img3, this.pos.x, this.pos.y);
			ctx.restore();
			break;        
		case 4: 
			ctx.save();
			var w = width - (width - this.pos.x) + Boid.img1.width/2;
			var h = height - (height - this.pos.y) + Boid.img1.height/2;
			ctx.translate(w, h);
			ctx.rotate(this.facing*Math.PI/180);
			ctx.translate(-w,-h);          
			ctx.drawImage(Boid.img4, this.pos.x, this.pos.y);
			ctx.restore();
			break;
		case 5: 
			ctx.save();
			var w = width - (width - this.pos.x) + Boid.img5.width/2;
			var h = height - (height - this.pos.y) + Boid.img5.height/2;
			ctx.translate(w, h);
			ctx.rotate(this.facing*Math.PI/180);
			ctx.translate(-w,-h);          
			ctx.drawImage(Boid.img5, this.pos.x, this.pos.y);
			ctx.restore();
			break;
	}
	ctx.beginPath();
	ctx.arc(this.Starget.x, this.Starget.y, 10, 0, 2*Math.PI);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.stroke();
	
	/*ctx.beginPath();
	ctx.arc(this.Ftarget.x, this.Ftarget.y, 10,0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.stroke();*/
}

Boid.prototype.update = function( dT )
{
	// get distance from seek and flee targets
	var SeekVec = new Vector2(this.Starget.x - this.pos.x, this.Starget.y - this.pos.y);
	var FleeVec = mul(new Vector2(this.pos.x - this.Ftarget.x, this.pos.y - this.Ftarget.y), 1);

	var SeekDist = length(this.pos, this.Starget)
	var FleeDist = length(this.Ftarget, this.pos)
	var TotDist = SeekDist + FleeDist;

	var SeekWeight = ((TotDist - SeekDist)/TotDist);
	var FleeWeight = ((TotDist - FleeDist)/TotDist);

	this.accel = add(mul(SeekVec, SeekWeight),mul(FleeVec,FleeWeight * 3));

	//this.accel = new Vector2(this.Starget.x - this.pos.x, this.Starget.y - this.pos.y);
	this.accel = normalize(this.accel);
	var val = parseInt(document.getElementById("accel").value);
	this.accel = add(this.accel, mul(this.accel,val * dT * this.type));
	
	this.vel = add(this.vel, this.accel);
	
	val = parseInt(document.getElementById("maxVel").value);
	this.maxVel = new Vector2(val, val);
	if (length(this.vel) > length(this.maxVel))
		this.vel = mul(normalize(this.vel), this.maxVel);

	if (this.pos.x > 1024)  	this.pos.x = -49;
	else if (this.pos.x < -50)	this.pos.x = 1023;
	if (this.pos.y > 512)		this.pos.y = -26;
	else if (this.pos.y <-27)	this.pos.y = 511;
	this.pos.x += this.vel.x * dT;
   	this.pos.y += this.vel.y * dT;
	
	this.facing = angle(this.vel);
}

//make center of image pivot point
//make each image an individual canvas
//rotate with rotational vel

Boid.img1 = new Image();
Boid.img1.src = "Media/fish1.png";

Boid.img2 = new Image();
Boid.img2.src = "Media/fish2.png";

Boid.img3 = new Image();
Boid.img3.src = "Media/fish3.png";

Boid.img4 = new Image();
Boid.img4.src = "Media/fish4.png";

Boid.img5 = new Image();
Boid.img5.src = "Media/shark.png";