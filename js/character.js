function Character(y) {
	this.x=200;
	this.y=y;
	this.radius=10;
	this.vy=0;
	this.gravity=150;
	this.terminalVelocity=300;
	this.jump=-250;
	this.grounded=false;
	this.generateAvatar();
	this.avatar.transform(this.getTransform());
}

var mainCharacter;


function checkCollision(x,y) {
	for (i in level.objects) {
		if (level.objects[i].obj.isPointInside(x,y)) {
			return i;
		}
	}
	return -1;
}

Character.prototype.getTransform = function() {
	return "t"+this.x+","+this.y;
}

Character.prototype.updatePosition = function(delta) {
	var paper=this.avatar.paper;

	var collisionLeft=checkCollision(this.x-this.radius,this.y);
	var collisionRight=checkCollision(this.x+this.radius,this.y);

	// Update x
	if (collisionRight>=0) {
		this.x=level.objects[collisionRight].obj.getBBox().x-this.radius;
	}
	else if (collisionLeft>=0) {
		this.x=level.objects[collisionLeft].obj.getBBox().x2+this.radius+1;
	}

	// Update y
	var nextVy=Math.min(this.terminalVelocity,this.vy+delta*this.gravity);
	var vySign=nextVy>=0?1:-1;
	var collision=checkCollision(this.x,this.y+vySign*this.radius+delta*nextVy);
	if (collision==-1) {
			this.vy=nextVy;
			this.y+=delta*this.vy;
			this.grounded=false;
	}
	else {
		this.grounded=(vySign==1); // Grounded if falling
		if (this.grounded) {
			this.y=level.objects[collision].obj.getBBox().y-this.radius;
		}
		else {
			this.y=level.objects[collision].obj.getBBox().y2+this.radius+1;
			this.vy=0;
		}
	}
}

Character.prototype.generateAvatar = function() {
	if (!this.avatar) {
		var set=paper.set();
		set.push(
			paper.circle(0,0,this.radius)
			.attr({"fill":"r#DDFFFF-#6EE6E6","stroke":"none"})
		);
		set.push(set[0].glow({color:"#6EE6E6"}));
		this.avatar=set;
	}
}
