//Cameron Schuette, Jordan Johnson, Vinny Vencill, Clinton Sexton
//Vector2 Class
//Sources: http://higherorderfun.com/blog/2012/06/03/math-for-game-programmers-05-vector-cheat-sheet/

"use strict"

function Vector2( x, y ){
	this.x = x;
	this.y = y;
}

//Functions associated with the Vector2 class
function add( a, b )
{
	return new Vector2(a.x + b.x, a.y + b.y);
}

function sub( a, b )
{
	return new Vector2(a.x - b.x, a.y - b.y);
}

function mul( a, b )
{
	if (typeof(b) === "number")
		return new Vector2(a.x * b, a.y * b);
	else
		return new Vector2(a.x * b.x, a.y * b.y);
}

function div( a, b )
{
	if (typeof(b) === "number")
		return new Vector2(a.x / b, a.y / b);
	else
		return new Vector2(a.x / b.x, a.y / b.y);
}

function dot( a, b )
{
	return a.x * b.x + a.y * b.y;
}

function cross( a, b )
{
	return a.x * b.y - a.y * b.x;
}

function length( a )
{
	return Math.sqrt(a.x * a.x + a.y * a.y);
}

function normalize( a )
{
	return div(a, length(a));
}

//Functions we may need????
function rotate( a, angle )
{
	//rotates vector by specified angle
	
	return new Vector2(a.x * Math.cos(angle) - a.y * Math.sin(angle), 
				a.x * Math.sin(angle) + a.y * Math.cos(angle));
}

function angle( a )
{
	//returns the angle the vector points
	
	return Math.atan2(a.y, a.x) * 180/Math.PI;
}

/*Example of how to use:

var x = new Vector2(5, 4);
var y = new Vector2(2, 1);

var z = mul(x, y); //returns a Vector2 with x=10, y=4

*/