var time = 0.0;
var firstFrame = 0.0
var lastFrame = 0.0;
var mode = 1; // -1,0,1
var preview = true;
var modeImage;
var background;
var timer;
var gameCompleted=false;
var levelTransform = ""

function gameLoop() {
	if (levelNumber>=0) {levelLoop();}
	else {menuLoop();}
	requestAnimationFrame(gameLoop);
}

function menuLoop() {
}

function levelLoop() {
	// Update Time
	var now=Date.now()/1000.0;
	var delta=now-lastFrame;
	lastFrame=now;
	time += mode*delta;
	if (preview && time>=10.0) {
		preview=false;
		paper.setViewBox(0,0,screenW,screenH);
		time=0;
		firstFrame=now;
	}
	time = Math.min(10.0,time);
	time = Math.max(0.0,time);
	timer.attr("width",time*3.2);

	// Update World
	if (!preview && !gameCompleted) {
		levelTransform = "t"+-1*level.speed*(now-firstFrame)+",0"
	}
	background.transform(levelTransform);
	for (x in level.objects) {
		level.objects[x].obj.transform(level.objects[x].anim(time)+levelTransform);
	}

	if (!preview) {
		// Update Character
		mainCharacter.updatePosition(delta);
		mainCharacter.avatar.transform(mainCharacter.getTransform());

		if (levelNumber>0 && (mainCharacter.x<50 || mainCharacter.y>screenH)) {startGame(levelNumber);} // Game Over
		else if (mainCharacter.x+level.speed*(now-firstFrame)>level.ending) {
			if (levelNumber==6) {gameCompleted=true;}
			else {
				startGame(levelNumber+1);
			}
		} // Next Level
	}
}

// Start/End Game
function startGame(lvl) {
	document.getElementById("menuMusic").pause();
	document.getElementById("tutorialMusic").pause();
	paper.clear();
	if (lvl>0) {
		preview=true;
	}
	else { // Tutorial
		preview=false;
	}
	paper.setViewBox(0,0,2*screenW,2*screenH);
	background = paper.image("img/introBg.svg",0,0,5000,1200); // Background
	loadLevel(lvl);
	// Foreground
	paper.rect(0,0,50,2*screenH).attr(
	{"fill":"0-rgba(0,0,0,0)-rgba(0,0,0,0)",
	 "fill-opacity":0,
	 "stroke":"none"});

	// Times
	time = 0.0;
	lastFrame = Date.now()/1000.0;
	firstFrame = lastFrame;
	mode = 1;
	modeImage = paper.image("img/play.svg",screenW-60,20,32,32);
	levelTransform="";

	paper.rect(screenW-60,64,32,10);
	timer = paper.rect(screenW-60,64,0,10).attr("fill","#000");
}

function endGame() {
	document.getElementById("menuMusic").play();
	levelNumber=-1;
	paper.clear();
	paper.setViewBox(0,0,screenW,screenH);
	paper.image("img/menu.png",0,0,screenW,screenH);
	paper.text(screenW/2,100,"Rewind & Run").attr(
		{"font-size":"64",
		"font-family":"Merriweather",
		"font-weight":"Bold",
		"font-style":"Italic"}
	);
	paper.text(screenW/2-32,150,"What if you could go back in time...").attr(
		{"font-size":"16",
		"font-family":"Merriweather",
		"font-style":"Italic"}
	);
	paper.text(screenW/2+32,175,"... but couldn't go back in space?").attr(
		{"font-size":"16",
		"font-family":"Merriweather",
		"font-style":"Italic"}
	);
	paper.text(screenW/2,350,"New Game").attr(
		{"font-size":"32",
		"font-family":"Merriweather",
		"font-style":"Italic"}
	).click(function() {startGame(0);});
	paper.text(screenW/2,450,"New Game (skip intro)").attr(
		{"font-size":"32",
		"font-family":"Merriweather",
		"font-style":"Italic"}
	).click(function() {startGame(1);});
}

