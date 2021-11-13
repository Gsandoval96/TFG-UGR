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

		this.charactersPosition = [];

		var pacmanPos = new THREE.Vector3(14, 0, 22);
		this.charactersPosition.push(pacmanPos);

		for (var i = 0; i < 4; i++) {
			var position = new THREE.Vector3(13+i, 0, 13);
			this.charactersPosition.push(position);
		}

		this.characters = [];
		this.createCharacters();




		// Maze

		this.maze = new MyMaze(MyConstant.BOX_SIZE);
		this.add(this.maze);

		// Score
		this.score = 0;
		//console.log("SCORE: ", this.score);

	}

	createCharacters(){
		var pacmanDir = new THREE.Vector2(1,0);
		var pacman = new MyPacman(this.charactersPosition[0], MyConstant.CHARACTER_SIZE, pacmanDir);
		this.characters.push(pacman);

		var ghostMaterial = [MyMaterial.RED_GHOST, MyMaterial.PINK_GHOST, MyMaterial.BLUE_GHOST, MyMaterial.ORANGE_GHOST];

		var direction = new THREE.Vector2(0,1);
		for (var i = 0; i < 4; i++) {
			var ghost = new MyGhost(this.charactersPosition[i+1], MyConstant.CHARACTER_SIZE, direction, ghostMaterial[i]);
			this.characters.push(ghost);
			if(i!=0) this.characters[i+1].behaviour = "freeze";
		}

		for (var character of this.characters) {
			this.add(character);
		}

		var origin = { p : 1 } ;
		var destiny = { p : 2 } ;
		var val = 2;
		var that = this;

		this.leaveBox = new TWEEN.Tween(origin)
			.to(destiny, 5000) //5 segundos
			.onRepeat (function(){
				that.characters[val].changeBehaviour("chase");
				console.log(val);
				val = val + 1;
			})
			.repeat(3)
			.start();
	}

	startGame(){
		this.start = true;
	}

	controlTile(){
		let pos = new THREE.Vector2(this.characters[0].getPosition().x / MyConstant.BOX_SIZE, this.characters[0].getPosition().z / MyConstant.BOX_SIZE);
		let dir = new THREE.Vector2(this.characters[0].dirX, this.characters[0].dirZ);


		pos = this.characters[0].adjustPosition(pos, dir);
		this.characters[0].setNeightbors(this.maze.getNeighbors(pos)); // Actualizamos los vecinos de pacman

		let tyleTipe = this.maze.getTileType(pos);

		if(tyleTipe == 2){ //Standing on dot
			this.maze.removeDot(pos);
			this.score += 1;
			//console.log("SCORE: ", this.score);
		}
		else if(tyleTipe == 3){ //Standing on a pill
			this.maze.removeDot(pos);

			for(let character of this.characters){
				if(character != this.characters[0] && character.behaviour != "freeze")
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

			pos = character.adjustPosition(pos, dir);

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

		//Colisión de los fantasmas con Pacman
		var collided = false;
		for(var i = 1; i<5 && !collided; i++){
			if(this.characters[i].hitbox.intersectsBox(this.characters[0].hitbox)){
				collided = true;
				if(this.characters[i].behaviour == "chase"){
					for(var j = 1; j<5; j++){
						this.characters[j].behaviour = "freeze";
					}
					this.characters[0].die();
				}
				else if(this.characters[i].behaviour == "scape"){
					console.log(i);
					this.characters[i].returnHome();
				}
			}
		}

	}

	moveAI(){
		for(var i = 1; i < this.characters.length; i++){
			var character = this.characters[i];
			if(character.path == null && character.behaviour != "freeze"){
				if(MyConstant.SHOW_PATH){
					this.maze.clearColor(character.material);
				}

				let pos = new THREE.Vector2(character.getPosition().x / MyConstant.BOX_SIZE, character.getPosition().z / MyConstant.BOX_SIZE);
				let dir = new THREE.Vector2(character.dirX, character.dirZ);

				pos = character.adjustPosition(pos, dir);

				// Copia en profundida de la info del laberinto
				var ghostMaze = [...this.maze.mazeData];
			  ghostMaze.forEach((row, rowIndex) => ghostMaze[rowIndex] = [...row]);

				//Eliminamos la posición anterior de las rutas posibles
				if(character.behaviour == "chase"){
					ghostMaze[pos.y - dir.y][pos.x - dir.x] = 0;
				}

				var graph = new Graph(ghostMaze);
				var start = graph.grid[pos.y][pos.x];

				var random = this.maze.getRandomValidPosition(); //random end

				//pacman end
				var pPos = new THREE.Vector2(this.characters[0].getPosition().x / MyConstant.BOX_SIZE, this.characters[0].getPosition().z / MyConstant.BOX_SIZE);
				var pDir = new THREE.Vector2(this.characters[0].dirX, this.characters[0].dirZ);

				pPos = this.characters[0].adjustPosition(pPos, pDir);

				//choose end
				var end;

				if(character.behaviour == "chase"){ //usar el A* para perseguir a Pacman
					end = graph.grid[pPos.y][pPos.x];
				}
				else if (character.behaviour == "scape") {
					end = graph.grid[random.x][random.y];
				}
				else if (character.behaviour == "return") {
					let home = this.charactersPosition[i];
					end = graph.grid[home.x][home.z];
				}

				var result = astar.search(graph, start, end);

				if(result.length == 0) result = null;
				else{
					for(let path of result){
						var posA = path.x;
						var posB = path.y;
						var pos_check = posA * (MyConstant.MAZE_WIDTH) + posB;
						if(MyConstant.SHOW_PATH){
							this.maze.children[pos_check].square.material = character.material; //Draw ghost path
						}
					}
				}

				character.path = result;
			}
		}

	}

	respawn(){

		this.leaveBox.stop(); //Paramos la salida escalonada de los fantasmas

		for(var i = 0; i < 5; i++){
			this.remove(this.characters[0]);
			this.characters.shift();
		}

		this.createCharacters();
	}

	update(){
		if(this.start && this.characters[0].status == "alive"){
			this.moveAI();
			this.collisionManager();
			this.controlTile();
		}
		else if(this.characters[0].status == "dead"){
			this.respawn();
		}
		TWEEN.update();
	}
}
