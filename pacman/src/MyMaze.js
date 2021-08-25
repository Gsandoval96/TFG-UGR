class MyMaze extends THREE.Object3D {
	constructor(cubeSize) {
		super();

		this.mazeData = this.mazeGenerator();
		// [
		// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		// 	[0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
		// 	[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		// 	[0,3,0,1,1,0,2,0,1,1,1,0,2,0,0,2,0,1,1,1,0,2,0,1,1,0,3,0],
		// 	[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		// 	[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
		// 	[0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
		// 	[0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
		// 	[0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
		// 	[0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
		// 	[0,1,1,1,1,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,1,1,1,1,0],
		// 	[0,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,0],
		// 	[0,1,1,1,1,0,2,0,0,1,0,0,0,1,1,0,0,0,1,0,0,2,0,1,1,1,1,0],
		// 	[0,0,0,0,0,0,2,0,0,1,0,1,1,1,1,1,1,0,1,0,0,2,0,0,0,0,0,0],
		// 	[4,2,2,2,2,2,2,1,1,1,0,1,1,1,1,1,1,0,1,1,1,2,2,2,2,2,2,4],
		// 	[0,0,0,0,0,0,2,0,0,1,0,1,1,1,1,1,1,0,1,0,0,2,0,0,0,0,0,0],
		// 	[0,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,0],
		// 	[0,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,0],
		// 	[0,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,0],
		// 	[0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
		// 	[0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
		// 	[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		// 	[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		// 	[0,3,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,3,0],
		// 	[0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
		// 	[0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
		// 	[0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
		// 	[0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
		// 	[0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
		// 	[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
		// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		// ];

		this.teleportPositions = [];

		this.validPositions = [];

		// Board

		for(var i = 0; i < MyConstant.MAZE_HEIGHT; i++){
			for(var j = 0; j < MyConstant.MAZE_WIDTH; j++){
				var position = new THREE.Vector3(j*cubeSize, 0, i*cubeSize);
				var cube;
				var validPosition;

				switch (this.mazeData[i][j]) {
					case 0:
						cube = new MyTile(position, "wall", cubeSize, true);
					break;
					case 1:
						cube = new MyTile(position, "empty", cubeSize, false);
						validPosition = new THREE.Vector2(i, j);
						this.validPositions.push(validPosition);
					break;
					case 2:
						cube = new MyTile(position, "dot", cubeSize, false);
						validPosition = new THREE.Vector2(i, j);
						this.validPositions.push(validPosition);
					break;
					case 3:
						cube = new MyTile(position, "pill", cubeSize, false);
						validPosition = new THREE.Vector2(i, j);
						this.validPositions.push(validPosition);
					break;
					case 4:
						cube = new MyTile(position, "teleport", cubeSize, true);
						let teleportPosition = new THREE.Vector2(i, j);
						this.teleportPositions.push(teleportPosition);
					break;
				}

				this.add(cube);
			}
		}
	}

	tetrisGenerator(){
		var tetris = [];
		var row = [];
		var cell = new THREE.Vector2(1,1);

		for(let i = 0; i < 5; i++){
			row.push(cell);
		}

		for(let j = 0; j < 9; j++){
			tetris.push([...row]);
		}

		var tetris3 = [];
		var row3 = [];

		for(let i = 0; i < 15; i++){
			row3.push(0);
		}

		for(let j = 0; j < 27; j++){
			tetris3.push([...row3]);
		}

		for(let i = 0; i < 9; i++){
			for(let j = 0; j < 5; j++){

				var up = tetris[i][j].x;
				var right = tetris[i][j].y;

				for(let k = 0; k <3; k++){
					tetris3[i*3][j*3 + k] = up;
					tetris3[i*3 + 1 ][j*3 + k] = 0;
					tetris3[i*3 + 2 ][j*3 + k] = 0;
				}
				
				tetris3[i*3][j*3 + 2] = up | right;
				tetris3[i*3 + 1 ][j*3 + 2] = right;
				tetris3[i*3 + 2 ][j*3 + 2] = right;

			}
		}

		console.log(tetris3);

		return tetris3;
	}

	mazeGenerator(){
		var maze = [];
		var row = [];
		var wall = [];

		var tetris = this.tetrisGenerator();

		for(let i = 0; i < 28; i++){
			row.push(1); //Fila llena de huecos en blanco
			wall.push(0); //Fila llena de muro
		}

		for(let j = 0; j < 31; j++){
			if(j == 0 || j == 30)
				maze.push([...wall]);
			else
				maze.push([...row]);
		}

		return maze;
	}

	getRandomValidPosition(){
		var random = Math.round(Math.random() * (this.validPositions.length - 1));
		return this.validPositions[random];
	}

	clearColor(material){
		for(var i = 0; i < MyConstant.MAZE_HEIGHT; i++){
			for(var j = 0; j < MyConstant.MAZE_WIDTH; j++){
				var pos_check = i * (MyConstant.MAZE_WIDTH) + j;
				if(this.children[pos_check].square.material == material){
					this.children[pos_check].square.material = MyMaterial.INVISIBLE;
				}
			}
		}
	}

	getOtherTeleport(pos,dir){
		var newPos;

		//Comparamos al revés por la distribución de la matriz
		if(pos.x + dir.x == this.teleportPositions[0].y && pos.y + dir.y == this.teleportPositions[0].x){
			newPos = new THREE.Vector2(this.teleportPositions[1].x, this.teleportPositions[1].y);
		}
		else{
			newPos = new THREE.Vector2(this.teleportPositions[0].x, this.teleportPositions[0].y);
		}
		return newPos;
	}

	collisionType(pos, dir){
		var pos_check = new THREE.Vector2(pos.x + dir.x, pos.y + dir.y);
		return this.mazeData[pos_check.y][pos_check.x];
	}

	getTileType(pos){
		var pos_check = new THREE.Vector2(pos.x, pos.y);
		return this.mazeData[pos_check.y][pos_check.x];
	}

	removeDot(pos){
		var pos_check = pos.y * (MyConstant.MAZE_WIDTH) + pos.x;

		var position = this.children[pos_check].position;
		var cubeSize = this.children[pos_check].size;
		this.children[pos_check].remove(this.children[pos_check].dot); //Elimina el punto
		this.mazeData[pos.y][pos.x] = 1;
	}

	checkCollision(hitbox, pos, dir){
		var collision = false;
		var pos_check; //posY * (MyConstant.MAZE_WIDTH) + posX;
		var pos_aux;

		if(dir.x != 0){
			pos_aux = pos.y;
		}
		else{
			pos_aux = pos.x;
		}

		for(var i = pos_aux - 1; i <= pos_aux + 1 && !collision; i++){
			if(dir.x != 0){
				pos_check = i * (MyConstant.MAZE_WIDTH) + (pos.x + dir.x);
			}
			else{
				pos_check = (pos.y + dir.y) * (MyConstant.MAZE_WIDTH) + i;
			}

			if(this.children[pos_check].has_hitbox){
				var box = this.children[pos_check].getCollisionBox();
				collision = box.intersectsBox(hitbox);
				//this.children[pos_check].cube.box.material = MyMaterial.GREEN;
			}
		}

		return collision;
	}

	update(){
	}

}
