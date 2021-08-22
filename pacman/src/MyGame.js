class MyGame extends THREE.Object3D {
	constructor(){
		super();

		this.start = false;

		// Title
		var titlePos = new THREE.Vector3(-16, 24, 0);
		this.title = new MyTitle(titlePos, 5, false);
		//this.add(this.title);

		// Score
		this.score = 0;

		// Ghost and Pacman
		var pacmanDir = new THREE.Vector2(1,0);
		var redGhostDir = new THREE.Vector2(1,0);
		var pinkGhostDir = new THREE.Vector2(1,0);
		var blueGhostDir = new THREE.Vector2(1,0);
		var orangeGhostDir = new THREE.Vector2(0,-1);

		var pacmanPos = new THREE.Vector3(1, 0, 1);
		var redGhostPos = new THREE.Vector3(1, 0, 20);
		var pinkGhostPos = new THREE.Vector3(1, 0, 29);
		var blueGhostPos = new THREE.Vector3(6, 0, 26);
		var orangeGhostPos = new THREE.Vector3(21, 0, 1);

		var pacman = new MyPacman(pacmanPos, MyConstant.CHARACTER_SIZE, pacmanDir);
		var redGhost = new MyGhost(redGhostPos, MyConstant.CHARACTER_SIZE, redGhostDir, MyMaterial.RED_GHOST);
		var pinkGhost = new MyGhost(pinkGhostPos, MyConstant.CHARACTER_SIZE, pinkGhostDir, MyMaterial.PINK_GHOST);
		var blueGhost = new MyGhost(blueGhostPos, MyConstant.CHARACTER_SIZE, blueGhostDir, MyMaterial.BLUE_GHOST);
		blueGhost.rotate("u");
		var orangeGhost = new MyGhost(orangeGhostPos, MyConstant.CHARACTER_SIZE, orangeGhostDir, MyMaterial.ORANGE_GHOST);
		orangeGhost.rotate("d");

		this.characters = [];
		this.characters.push(pacman);
		this.characters.push(redGhost);
		// this.characters.push(pinkGhost);
		// this.characters.push(blueGhost);
		// this.characters.push(orangeGhost);

		for (var character of this.characters) {
			this.add(character);
		}

		// Maze

		this.maze = new MyMaze(MyConstant.BOX_SIZE);
		this.add(this.maze);

		// Score
		this.score = 0;
		console.log("SCORE: ", this.score);

	}

	startGame(){
		this.start = true;
	}

	controlTile(){
		let pos = new THREE.Vector2(this.characters[0].getPosition().x / MyConstant.BOX_SIZE, this.characters[0].getPosition().z / MyConstant.BOX_SIZE);
		let dir = new THREE.Vector2(this.characters[0].dirX, this.characters[0].dirZ);

		pos = this.adjustPosition(pos, dir);

		let tyleTipe = this.maze.getTileType(pos);

		if(tyleTipe == 2){ //Standing on dot
			this.maze.removeDot(pos);
			this.score += 1;
			console.log("SCORE: ", this.score);
		}
		else if(tyleTipe == 3){ //Standing on a pill
			this.maze.removeDot(pos);

			for(let character of this.characters){
				if(character != this.characters[0])
					character.scare();
			}
		}
	}

	collisionManager(){

		for(let character of this.characters){
			let lastPos = new THREE.Vector2(character.getPosition().x, character.getPosition().z);
			character.update();
			let pos = new THREE.Vector2(character.getPosition().x / MyConstant.BOX_SIZE, character.getPosition().z / MyConstant.BOX_SIZE);
			let dir = new THREE.Vector2(character.dirX, character.dirZ);

			pos = this.adjustPosition(pos, dir);

			if(this.maze.checkCollision(character.getCollisionBox(), pos, dir)){
				let collisionType = this.maze.collisionType(pos, dir);

				if(collisionType == 4){ //Teleport
					let teleportPos = this.maze.getOtherTeleport(pos, dir);
					lastPos = new THREE.Vector2(teleportPos.y * MyConstant.BOX_SIZE + dir.x * MyConstant.BOX_SIZE/2, teleportPos.x * MyConstant.BOX_SIZE);
					character.setPosition2D(teleportPos);
				}

				character.setPosition2D(lastPos);

				if(character != this.characters[0]){ //No debería ocurrir nunca, pero para prevenir errores
    				character.path = null;
				}
			}
		}
	}

	moveAI(){
		for(var i = 1; i < this.characters.length; i++){
			var character = this.characters[i];
			if(character.path == null){
				this.maze.clearColor(character.material);

				let pos = new THREE.Vector2(character.getPosition().x / MyConstant.BOX_SIZE, character.getPosition().z / MyConstant.BOX_SIZE);
				let dir = new THREE.Vector2(character.dirX, character.dirZ);

				pos = character.adjustPositionForPath(pos, dir);

				var graph = new Graph(this.maze.mazeData);
				var start = graph.grid[pos.y][pos.x];

				var random = this.maze.getRandomValidPosition(); //random end

				//pacman end
				var pPos = new THREE.Vector2(this.characters[0].getPosition().x / MyConstant.BOX_SIZE, this.characters[0].getPosition().z / MyConstant.BOX_SIZE);
				var pDir = new THREE.Vector2(this.characters[0].dirX, this.characters[0].dirZ);

				pPos = this.adjustPosition(pPos, pDir);

				//choose end
				var end;

				if(i<=4){ //usar el A*, ahora mismo la usan todos los fantasmas
					end = graph.grid[pPos.y][pPos.x];
				}
				else {
					end = graph.grid[random.x][random.y];
				}
				var result = astar.search(graph, start, end);

				if(result.length == 0) result = null;
				else{
					for(let path of result){
						var posA = path.x;
						var posB = path.y;
						var pos_check = posA * (MyConstant.MAZE_WIDTH) + posB;
						//this.maze.children[pos_check].cube.box.material = character.material; //Draw ghost path
					}
				}

				character.path = result;
			}
		}

	}

	adjustPosition(pos, dir){

		var adjustedPosition = new THREE.Vector2(pos.x, pos.y);

		if(dir.x == 1){
			adjustedPosition.x = Math.floor(pos.x);
		}
		else if(dir.x == -1){
			adjustedPosition.x = Math.ceil(pos.x);
		}
		else{
			adjustedPosition.x = Math.round(pos.x);
		}
		if(dir.y == 1){
			adjustedPosition.y = Math.floor(pos.y);
		}
		else if(dir.y == -1){
			adjustedPosition.y = Math.ceil(pos.y);
		}
		else{
			adjustedPosition.y = Math.round(pos.y);
		}

		return adjustedPosition;

	}

	update(){
		if(this.start){
			this.moveAI();
			this.collisionManager();
			this.controlTile();
		}
	}
}
