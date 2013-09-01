var levelNumber = -1; // -1 = Menu

// Animations
function stopped(t) {
	return "t0,0";
}

function translateX(v) {
	return function(t) {
		return "t"+t*v+",0";
	}
}

function translateY(v) {
	return function(t) {
		return "t0,"+t*v;
	}
}

function swingX(amp,freq) {
	return function(t) {
		return "t"+amp*Math.cos(freq*t/5.0*Math.PI)+",0";
	}
}

function swingY(amp,freq) {
	return function(t) {
		return "t0,"+amp*Math.cos(freq*t/5.0*Math.PI);
	}
}

function wobbleX(v,amp,freq) {
	return function(t) {
		return "t"+t*v+","+amp*Math.cos(freq*t/5.0*Math.PI);
	}
}

// Level Objects
function Level(speed,start,end) { // Note: Start y, end x
	this.speed=speed;
	this.start=start;
	this.ending=end;
	this.objects=new Array();
}

function LevelObject(obj, anim) {
	this.obj=obj;
	this.anim=anim;
}

var level;

function loadLevel(num) {
	var req = new XMLHttpRequest;
	req.overrideMimeType("application/json");  
	req.open("GET", "lvl/level"+num+".json", true);  
	var target = this;  
	req.onload  = function() {
		levelNumber = num;
		var tempLevel = JSON.parse(req.responseText);
		level = new Level(tempLevel.speed,tempLevel.start,tempLevel.ending);
		for (x in tempLevel.objects) {
			var obj=tempLevel.objects[x];
			if (obj.type=="rect") {
				level.objects.push(
					new LevelObject(
						paper.rect(obj.x,obj.y,obj.w,obj.h).attr("fill","#000"),
						eval(obj.anim)));
			}
			if (obj.type=="image") {
				level.objects.push(
					new LevelObject(
						paper.image(obj.src,obj.x,obj.y,obj.w,obj.h),
						eval(obj.anim)));
			}
		}
		mainCharacter=new Character(tempLevel.start);
		background.attr({
			"src":tempLevel.background,
			"width":tempLevel.size
		});
		document.getElementById(tempLevel.music).play();
	};  
	req.send(null);
}
