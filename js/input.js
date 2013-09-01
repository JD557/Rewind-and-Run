document.addEventListener("keydown", function(event) {
		switch (event.keyCode) {
			case 32:if (preview) {time=11;}break; // SPACE - Skip preview
			case 37:mode=-1;modeImage.attr("src","img/rev.svg");break; // LEFT
			case 38:if (mainCharacter.grounded) {mainCharacter.vy=mainCharacter.jump;};break; // UP
			case 39:mode=1;modeImage.attr("src","img/play.svg");break; // RIGHT
			case 40:mode=0;modeImage.attr("src","img/pause.svg");break; // DOWN
		}
	}
);

document.addEventListener("keyup", function(event) {
		switch (event.keyCode) {
			//case 37:mainChar.vx=0;break; // LEFT
			//case 38:mainChar.vy=0;break; // UP
			//case 39:mainChar.vx=0;break; // RIGHT
			//case 40:mainChar.vy=0;break; // DOWN
		}
	}
);
