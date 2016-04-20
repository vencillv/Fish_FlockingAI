//Cameron Schuette, Jordan Johnson, Vinny Vencill, Clinton Sexton
//Flock Class

"use strict"

function Flock( numBoids, min, max )
{
	//We want to make a flock of boids here based 
	//on the number the user passes in
	this.theFlyingV = [];
	this.daSharks = [];
	var numSharks = 1;
	//var SeekPercent;
	//var FleePercent;
	//append to list boids in random positions
	for (var i = 0; i < numBoids; i++)
	{
		var posX = Math.floor((Math.random() * (max - min)) + min);
		var posY = Math.floor((Math.random() * (max - min)) + min);
		var facing = (Math.random() * 4) * 90;
		var mass = Math.floor(Math.random() * 4) + 1;
		var vel = new Vector2(Math.floor(Math.random() * (50 + 50) -50), Math.floor(Math.random() * (50 + 50) -50));
		
		this.theFlyingV.push(new Boid(posX, posY, facing, mass, vel));
	}

	for (var i = 0; i < numSharks; i++)
	{
		var posX = Math.floor((Math.random() * (max - min)) + min);
		var posY = Math.floor((Math.random() * (max - min)) + min);
		var facing = (Math.random() * 4) * 90;
		var vel = new Vector2(Math.floor(Math.random() * (50 + 50) -50), Math.floor(Math.random() * (50 + 50) -50));
		
		this.daSharks.push(new Shark(posX, posY, facing, vel));
	}
}

Flock.prototype.update = function( dT, ctx )
{
	//update all of the boids in the flock then
	//render them to the canvas

	/*for(var i=0; i<this.theFlyingV.length; i++)
		this.theFlyingV[i].accel = new Vector2(0,0);*/

	collision_detection(this.theFlyingV);
	
	for(var i=0; i<this.theFlyingV.length; i++){
		this.theFlyingV[i].addForce(this.daSharks[0].pos.x + 75, this.daSharks[0].pos.y + 30, -1)
		this.theFlyingV[i].update(dT);
	}
	for(var i = 0; i < this.daSharks.length; i++){
		this.daSharks[i].update(dT);
	}
		

}

Flock.prototype.render = function(ctx, width, height)
{
	for(var i=0; i<this.theFlyingV.length; i++)
		this.theFlyingV[i].render(ctx, width, height);
	for(var i=0; i<this.daSharks.length; i++)
		this.daSharks[i].render(ctx, width, height);
}

Flock.prototype.seek = function( x, y )
{
	for(var i=0; i<this.theFlyingV.length; i++)
		this.theFlyingV[i].addForce(x, y, 1);
}

Flock.prototype.flee = function( x, y )
{
	for(var i=0; i<this.theFlyingV.length; i++)
		this.theFlyingV[i].addForce(x, y, -1);
}

Flock.prototype.wander = function(){


}

Flock.prototype.sharkChangeTarget = function()
{
	for(var i = 0; i < this.daSharks.length; i++)
	{
		var r = Math.floor(Math.random() * this.theFlyingV.length);
		var fishy = this.theFlyingV[r];
		this.daSharks[i].bTarget = fishy;
		this.daSharks[i].addForce(fishy.pos.x, fishy.pos.y);
	}
}

Flock.prototype.sharkClearTarget = function()
{
	for(var i = 0; i < this.daSharks.length; i++)
	{
		this.daSharks[i].bTarget = null;
	}
}

Flock.prototype.sharkSeek = function()
{

	for(var i=0; i<this.daSharks.length; i++)
	{
		if (this.daSharks[i].bTarget)
		{
			var tx = this.daSharks[i].bTarget.pos.x;
			var ty = this.daSharks[i].bTarget.pos.y;
			this.daSharks[i].addForce(tx, ty);
		}
	}
}

function collision_detection(theFlyingV){
	for (var i=0; i<theFlyingV.length; i++){
		var count = 0;
		var mean = new Vector2(0,0);
		for(var j=0; j<theFlyingV.length; j++){
			if (theFlyingV[i] != theFlyingV[j]){
				var iX = theFlyingV[i].pos.x;
				var iY = theFlyingV[i].pos.y;
				var jX = theFlyingV[j].pos.x;
				var jY = theFlyingV[j].pos.y;
				var d = Math.sqrt(Math.pow((jX - iX), 2) + Math.pow((jY - iY), 2));
				if (d > 0 && d < 50){
					var v = new Vector2(iX - jX, iY - jY);
					//vI = mul(vI, 200);
					//var vJ = new Vector2(jX - iX, jY - iY);
					//vJ = mul(vJ, 200);

					//theFlyingV[i].vel = add(theFlyingV[i].vel, vI);
					//theFlyingV[j].vel = add(theFlyingV[j].vel, vJ);
					v = normalize(v);
					v =  mul(v, 5);
					mean = add(mean, v);
					count++;
				}
			}
		}
		if (count != 0)
			mean = div(mean, count);
		theFlyingV[i].vel = add(theFlyingV[i].vel, mean);
	}
}
