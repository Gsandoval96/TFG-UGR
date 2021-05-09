class MyGame extends THREE.Object3D {
	constructor(){
		super();

		this.start = false;

		// Title

		var titlePos = new THREE.Vector3(-16, 24, 0);
		this.title = new MyTitle(titlePos, 5, false);
		this.add(this.title);

		var redGhostDir = new THREE.Vector2(1,0);
		var pinkGhostDir = new THREE.Vector2(1,0);
		var blueGhostDir = new THREE.Vector2(1,0);
		var orangeGhostDir = new THREE.Vector2(0,-1);

		var pacmanPos = new THREE.Vector3(1, 0, 1);
		var redGhostPos = new THREE.Vector3(1, 0, 20);
		var pinkGhostPos = new THREE.Vector3(1, 0, 29);
		var blueGhostPos = new THREE.Vector3(6, 0, 26);
		var orangeGhostPos = new THREE.Vector3(21, 0, 1);

		var pacman = new MyPacman(pacmanPos, MyConstant.CHARACTER_SIZE);
		var redGhost = new MyGhost(redGhostPos, MyConstant.CHARACTER_SIZE, redGhostDir, MyMaterial.RED_GHOST);
		var pinkGhost = new MyGhost(pinkGhostPos, MyConstant.CHARACTER_SIZE, pinkGhostDir, MyMaterial.PINK_GHOST);
		var blueGhost = new MyGhost(blueGhostPos, MyConstant.CHARACTER_SIZE, blueGhostDir, MyMaterial.BLUE_GHOST);
		blueGhost.rotate("u");
		var orangeGhost = new MyGhost(orangeGhostPos, MyConstant.CHARACTER_SIZE, orangeGhostDir, MyMaterial.ORANGE_GHOST);
		orangeGhost.rotate("d");

		// this.add(this.pacman);
		// this.add(this.redGhost);
		// this.add(this.pinkGhost);
		// this.add(this.blueGhost);
		// this.add(this.orangeGhost);

		this.charaters = [];
		this.charaters.push(pacman);
		this.charaters.push(redGhost);
		this.charaters.push(pinkGhost);
		this.charaters.push(blueGhost);
		this.charaters.push(orangeGhost);

		for (var character of this.charaters) {
			this.add(character);
		}

		this.maze = new MyMaze(MyConstant.BOX_SIZE);
		this.add(this.maze);
	}

	startGame(){
		this.start = true;
	}

	collisionManager(){

		for(let character of this.charaters){
			let lastPos = new THREE.Vector2(character.getPosition().x, character.getPosition().z);
			character.update();
			let pos = new THREE.Vector2(character.getPosition().x / MyConstant.BOX_SIZE, character.getPosition().z / MyConstant.BOX_SIZE);
			let dir = new THREE.Vector2(character.dirX, character.dirZ);

			pos = this.adjustPosition(pos, dir);

			if(this.maze.checkCollision(character.getCollisionBox(), pos, dir))
			 	character.setPosition2D(lastPos);
		}
	}

	adjustPosition(pos, dir){

		var adjustedPosition = new THREE.Vector2(pos.x, pos.y);

		if(dir.x == 1){
			adjustedPosition.x = Math.ceil(pos.x);
		}
		else if(dir.x == -1){
			adjustedPosition.x = Math.floor(pos.x);
		}
		else{
			adjustedPosition.x = Math.round(pos.x);
		}
		if(dir.y == 1){
			adjustedPosition.y = Math.ceil(pos.y);
		}
		else if(dir.y == -1){
			adjustedPosition.y = Math.floor(pos.y);
		}
		else{
			adjustedPosition.y = Math.round(pos.y);
		}

		return adjustedPosition;

	}

	update(){
		if(this.start){
			this.collisionManager();
		}
	}
}
