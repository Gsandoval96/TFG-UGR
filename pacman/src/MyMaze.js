class MyMaze extends THREE.Object3D {
	constructor(cubeSize) {
		super();

		this.mazeData = this.mazeGenerator();
		// Default Map 31x28
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
		var empty = new THREE.Vector2(0,0);
		var cellUp = new THREE.Vector2(1,0);
		var cellRight = new THREE.Vector2(0,1);

		for(let i = 0; i < 5; i++){
			row.push(cell);
		}

		for(let j = 0; j < 10; j++){
			tetris.push([...row]);
		}

		tetris[0][0] = cellUp;
		tetris[0][1] = cell;
		tetris[0][2] = cell;
		tetris[0][3] = cellUp;
		tetris[0][4] = cell;

		tetris[1][0] = cellRight;
		tetris[1][1] = cell;
		tetris[1][2] = empty;
		tetris[1][3] = cellUp;
		tetris[1][4] = cell;

		tetris[2][0] = cellUp;
		tetris[2][1] = cellRight;
		tetris[2][2] = cellRight;
		tetris[2][3] = cellUp;
		tetris[2][4] = cell;

		tetris[3][0] = cellUp;
		tetris[3][1] = cell;
		tetris[3][2] = cell;
		tetris[3][3] = cellRight;
		tetris[3][4] = cellUp;

		tetris[4][0] = empty;
		tetris[4][1] = cellRight;
		tetris[4][2] = empty;
		tetris[4][3] = cell;
		tetris[4][4] = empty;

		tetris[5][0] = cell;
		tetris[5][1] = cellUp;
		tetris[5][2] = cell;
		tetris[5][3] = cellUp;
		tetris[5][4] = cell;

		tetris[6][0] = empty;
		tetris[6][1] = cell;
		tetris[6][2] = cellRight;
		tetris[6][3] = cellRight;
		tetris[6][4] = cell;

		tetris[7][0] = cellUp;
		tetris[7][1] = cell;
		tetris[7][2] = cell;
		tetris[7][3] = cellUp;
		tetris[7][4] = cellRight;

		tetris[8][0] = cellRight;
		tetris[8][1] = cellUp;
		tetris[8][2] = cellRight;
		tetris[8][3] = cell;
		tetris[8][4] = cellRight;

		tetris[9][0] = cellUp;
		tetris[9][1] = cellUp;
		tetris[9][2] = cellUp;
		tetris[9][3] = empty;
		tetris[9][4] = cellUp;

		return tetris;
	}

	tetris3x3Generator(){
		var tetris = tetrisGenerator();

		var tetris3 = [];
		var row3 = [];

		for(let i = 0; i < 15; i++){
			row3.push(0);
		}

		for(let j = 0; j < 30; j++){
			tetris3.push([...row3]);
		}

		//Traducir de 1x1 a 3x3
		for(let i = 0; i < 10; i++){
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

				if(up == 0 && right == 0){
					var upCell = tetris.at(i-1);
					var rightCell = tetris[i].at(j+1);
					if(upCell != undefined && rightCell != undefined ){
						upCell = upCell[j];
						tetris3[i*3][j*3 + 2] = upCell.y | rightCell.x;
					}
				}
			}
		}


		//Limpiar el centro spawn de los fantasmas de bloques

		for(let i = 11; i < 14; i++){
			for(let j = 1; j < 4; j++){
				tetris3[i][j] = 1;
			}
		}

		tetris3[10][1] = 1;


		//Ajustes de tamaño para que sea 28x15

		//Eliminamos la primera columna
		for(let i = 0; i < 30; i++){
			tetris3[i].shift();
		}

		//Y añadimos una al final de muro
		for(let i = 0; i < 30; i++){
			tetris3[i].push(0);
		}

		//Eliminasmos las dos últimas filas
		tetris3.pop();
		tetris3.pop();

		console.log(tetris3);

		return tetris3; //Devolvemos una matriz 28x15
	}

	mazeGenerator(){
		var maze = [];
		var row = [];
		var wall = [];

		var tetris3 = this.tetris3x3Generator();

		for(let i = 0; i < 30; i++){
			row.push(1); //Fila llena de huecos en blanco
			wall.push(0); //Fila llena de muro
		}

		for(let j = 0; j < 30; j++){
			if(j == 0 || j == 29)
				maze.push([...wall]);
			else
				maze.push([...row]);
		}

		for(let i = 0; i < tetris.length ; i++){
			maze[i+1] = ([...tetris3[i]].reverse()).concat(tetris3[i]);
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
