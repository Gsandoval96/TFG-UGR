class MyGame extends THREE.Object3D {
	constructor(camera){
		super();

		this.camera = camera;

		this.start = false;

		// Title
		var titlePos = new THREE.Vector3(-16, 24, 0);
		this.title = new MyTitle(titlePos, 5, false);
		//this.add(this.title);

		// Ghost and Pacman

		this.charactersSpawnPosition = [];

		var pacmanPos = new THREE.Vector3(14, 0, 22);
		this.charactersSpawnPosition.push(pacmanPos);

		for (var i = 0; i < 4; i++) {
			var position = new THREE.Vector3(13+i, 0, 13);
			this.charactersSpawnPosition.push(position);
		}

		this.characters = [];
		this.createCharacters();

		// Maze

		this.maze = new MyMaze(MyConstant.BOX_SIZE);
		this.add(this.maze);

		// Score & Level
		this.score = 0;
		this.level = 0;

    this.fontURL = '../fonts/helvetiker_regular.typeface.json';

		var scoreTextPosition = new THREE.Vector3(40,30,-100);
    this.scoreText = new MyText(scoreTextPosition,'SCORE',2,MyMaterial.WHITE,this.fontURL);
		this.camera.add(this.scoreText);

    this.scoreValueTextPosition = new THREE.Vector3(40,27,-100);
    this.scoreValueText = new MyText(this.scoreValueTextPosition,this.score.toString(),2,MyMaterial.WHITE,this.fontURL);
		this.camera.add(this.scoreValueText);

		var levelTextPosition = new THREE.Vector3(40,37,-100);
    this.levelText = new MyText(levelTextPosition,'LEVEL',2,MyMaterial.WHITE,this.fontURL);
		this.camera.add(this.levelText);

    this.levelValueTextPosition = new THREE.Vector3(40,34,-100);
    this.levelValueText = new MyText(this.levelValueTextPosition,this.level.toString(),2,MyMaterial.WHITE,this.fontURL);
		this.camera.add(this.levelValueText);

		//Controls

	 var textPos = new THREE.Vector3(-59,37,-100); -10,20
	 var controlsText = new MyText(textPos,'CONTROLS',2,MyMaterial.WHITE,this.fontURL);
	 this.camera.add(controlsText);

	 textPos = new THREE.Vector3(-60,29.5,-99);
	 var adjust = new THREE.Vector3(4.5,2,1);
	 this.keyLEFT = new MyKeyObj(textPos,28,12,'LEFT', adjust);
	 this.camera.add(this.keyLEFT);

	 textPos = new THREE.Vector3(-47,29.5,-99);
	 adjust = new THREE.Vector3(1.5,2,1);
	 this.keyRIGHT = new MyKeyObj(textPos,28,12,'RIGHT', adjust);
	 this.camera.add(this.keyRIGHT);

	 textPos = new THREE.Vector3(-53.5,29.5,-99);
	 adjust = new THREE.Vector3(1,2,1);
	 this.keyDOWN = new MyKeyObj(textPos,28,12,'DOWN', adjust);
	 this.camera.add(this.keyDOWN);

	 textPos = new THREE.Vector3(-53.5,33,-99);
	 adjust = new THREE.Vector3(9,2,1);
	 this.keyUP = new MyKeyObj(textPos,28,12,'UP', adjust);
	 this.camera.add(this.keyUP);


	}

	createCharacters(){
		var pacmanDir = new THREE.Vector2(1,0);
		var pacman = new MyPacman(this.charactersSpawnPosition[0], MyConstant.CHARACTER_SIZE, pacmanDir);
		this.characters.push(pacman);

		var ghostMaterial = [MyMaterial.RED_GHOST, MyMaterial.PINK_GHOST, MyMaterial.BLUE_GHOST, MyMaterial.ORANGE_GHOST];

		var direction = new THREE.Vector2(0,1);
		for (var i = 0; i < 4; i++) {
			var ghost = new MyGhost(this.charactersSpawnPosition[i+1], MyConstant.CHARACTER_SIZE, direction, ghostMaterial[i]);
			this.characters.push(ghost);
			if(i!=0) this.characters[i+1].behaviour = "home";
		}

		for (var character of this.characters) {
			this.add(character);
		}
	}

	startGame(){
		this.start = true;

		this.startLeaveBoxAnimation();

		for (var i = 0; i < 4; i++) {
			this.characters[i+1].startUpdatingPaths();
		}
	}

	controlTile(){
		let pos = new THREE.Vector2(this.characters[0].getPosition().x / MyConstant.BOX_SIZE, this.characters[0].getPosition().z / MyConstant.BOX_SIZE);
		let dir = new THREE.Vector2(this.characters[0].dirX, this.characters[0].dirZ);


		pos = this.characters[0].adjustedPosition(pos, dir);
		this.characters[0].setNeightbors(this.maze.getNeighbors(pos)); // Actualizamos los vecinos de pacman

		let tyleTipe = this.maze.getTileType(pos);

		if(tyleTipe == 2){ //Standing on dot
			this.maze.removeDot(pos);
			this.score += 10;
			this.updateScoreValueText();
		}
		else if(tyleTipe == 3){ //Standing on a pill
			this.maze.removeDot(pos);
			this.score += 50;
			this.updateScoreValueText();

			for (var i = 1; i < 5; i++) {
				if(this.characters[i].behaviour != "home" && this.characters[i].behaviour != "return"){
					this.characters[i].scare();
				}
			}
		}
	}

	collisionManager(){

		for(let character of this.characters){
			let lastPos = new THREE.Vector2(character.getPosition().x, character.getPosition().z);
			character.update();
			let pos = new THREE.Vector2(character.getPosition().x / MyConstant.BOX_SIZE, character.getPosition().z / MyConstant.BOX_SIZE);
			let dir = new THREE.Vector2(character.dirX, character.dirZ);

			pos = character.adjustedPosition(pos, dir);

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
						character.adjustPosition();
						console.log("BLOQUEADO");
				}
			}
		}

		//Colisión de los fantasmas con Pacman
		for(var i = 1; i<5; i++){
			if(this.characters[i].behaviour != "return"){
				if(this.characters[i].hitbox.intersectsBox(this.characters[0].hitbox)){
					//console.log(i, " -- ", this.characters[i].behaviour);
					if(this.characters[i].behaviour == "chase"){
						for(var j = 1; j<5; j++){
							this.characters[j].behaviour = "freeze";
						}
						this.characters[0].die();
					}
					else if(this.characters[i].behaviour == "scape"){
						this.characters[i].returnHome();
						this.score += 100;
						this.updateScoreValueText();
					}
				}
			}
		}

	}

	moveAI(){
		for(var i = 1; i < this.characters.length; i++){
			var character = this.characters[i];
			if(character.path == null && (character.behaviour != "freeze" && character.behaviour != "home")){
				if(MyConstant.SHOW_PATH){
					this.maze.clearColor(character.material);
				}

				let pos = new THREE.Vector2(character.getPosition().x / MyConstant.BOX_SIZE, character.getPosition().z / MyConstant.BOX_SIZE);
				let dir = new THREE.Vector2(character.dirX, character.dirZ);

				pos = character.adjustedPosition(pos, dir);

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

				pPos = this.characters[0].adjustedPosition(pPos, pDir);

				//choose end
				var end;

				if(character.behaviour == "chase"){ //usar el A* para perseguir a Pacman
					end = graph.grid[pPos.y][pPos.x];
				}
				else if (character.behaviour == "scape") {
					end = graph.grid[random.x][random.y];
				}
				else if (character.behaviour == "return") {
					end = graph.grid[this.charactersSpawnPosition[i].z][this.charactersSpawnPosition[i].x];
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

	updateScoreValueText(){
		if(this.scoreValueText != undefined){
			this.camera.remove(this.scoreValueText);
			this.scoreValueText.dispose();
			this.scoreValueText = new MyText(this.scoreValueTextPosition,this.score.toString(),2,MyMaterial.WHITE,this.fontURL);
			this.camera.add(this.scoreValueText);
		}
	}

	updateLevelValueText(){
		if(this.levelValueText != undefined){
			this.camera.remove(this.levelValueText);
			this.levelValueText.dispose();
			this.levelValueText = new MyText(this.levelValueTextPosition,this.level.toString(),2,MyMaterial.WHITE,this.fontURL);
			this.camera.add(this.levelValueText);
		}
	}

	respawn(){

		this.leaveBoxAnimation.stop(); //Paramos la salida escalonada de los fantasmas

		for(var i = 0; i < 5; i++){
			this.remove(this.characters[0]);
			this.characters[0].dispose();
			this.characters.shift();
		}

		this.createCharacters();
		this.startLeaveBoxAnimation();
	}

	startLeaveBoxAnimation(){
		var val = 2;
		var duration = 5000 - this.level * 100;
		if(duration < 3000) duration = 3000;
		var that = this;

		this.leaveBoxAnimation = new TWEEN.Tween(origin)
			.duration(duration)
			.onRepeat (function(){
				that.characters[val].changeBehaviour("chase");
				val = val + 1;
			})
			.repeat(3)
			.start();
	}

	nextLevel(){
		this.level += 1;
		this.updateLevelValueText();

		this.remove(this.maze);
		this.maze.dispose();
		this.maze = new MyMaze(MyConstant.BOX_SIZE);
		this.add(this.maze);

		this.respawn();
		var time = this.characters[1].updatePathTime - this.level * 200;
		if(time < 2500) time = 2000;
		for(var i = 1; i < 5; i++){
			this.characters[i].setUpdatePathTime(time);
		}

		var duration = this.characters[1].scareTime - this.level * 500;
		if(duration < 100) duration = 100;
		for(var i = 1; i < 5; i++){
			this.characters[i].setScareTime(duration);
		}
	}

	update(){
		if(this.start && this.characters[0].status == "alive"){
			this.moveAI();
			this.collisionManager();
			this.controlTile();

			if(this.maze.getDotNumber() == 0){
				this.nextLevel();
			}
		}
		else if(this.characters[0].status == "dead"){
			this.respawn();
		}
		TWEEN.update();
	}
}
