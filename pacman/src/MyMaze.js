class MyMaze extends THREE.Object3D {

	constructor(cubeSize) {
		super();

		this.dotNumber = 0;

		this.shaderMaterial = this.createShaderMaterial();

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
						cube = new MyTile(position, "wall", cubeSize, true, this.shaderMaterial);
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
						this.dotNumber += 1;
					break;
					case 3:
						cube = new MyTile(position, "pill", cubeSize, false);
						validPosition = new THREE.Vector2(i, j);
						this.validPositions.push(validPosition);
						this.dotNumber += 1;
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

	dispose(){
		var val = 0;
		for (var children of this.children) {
			children.dispose();
		}
	}

	pieceGenerator(row, col, map){

		var cell = [1,1];
		var empty = [0,0];
		var cellUp = [1,0];
		var cellRight = [0,1];

		var piece = [	[0,0,[...cell]]	]; //Pieza [] por defecto, se crea a mano por tema de problemas al copiarlo

		//Añadimos variedad a la primera fila
		if(row == 0 && col != 4) piece[0][2][0] = 0;

		var valid_pieces = [];

		var pieces;
		if(col == 0){
			pieces = [...MyPiece.startColPieces];
		}
		else if(col == 4){
			pieces = [...MyPiece.lastColPieces];
		}
		else{
			pieces = [...MyPiece.allPieces];
		}

		for(var p of pieces){
			var valid = true;
			for(var i = 1; i < p.length && valid; i++){
				if(row + p[i][0] >=0 && row + p[i][0] <=8 &&
					col + p[i][1] >=0 && col + p[i][1] <=4){
					valid = map[row + p[i][0]][col + p[i][1]];
				}
				else{
					valid = false
				}
			}
			if(valid) {
				valid_pieces.push([...p]);
			}
		}

		//Seleccionar una pieza de las válidas
		if(valid_pieces.length != 0){
			piece = valid_pieces[Math.floor(Math.random()*valid_pieces.length)];
		}

		return piece;

	}

	tetrisGenerator(){
		var tetris = [];
		var row = [];

		var cell = [1,1];
		var empty = [0,0];
		var cellUp = [1,0];
		var cellRight = [0,1];

		for(let i = 0; i < 5; i++){
			row.push("*");
		}

		for(let j = 0; j < 10; j++){
			tetris.push([...row]);
		}

		var map = [];
		var mapRow = [];

		for(let i = 0; i < 5; i++){
			mapRow.push(true);
		}

		for(let j = 0; j < 10; j++){
			map.push([...mapRow]);
		}

		//Obligamos a que el centro deje espacio para los fantasmas
		tetris[3][0] = [...cellUp];
		tetris[3][1] = [...cell];
		map[3][0] = false;
		map[3][1] = false;
		tetris[4][0] = [...empty];
		tetris[4][1] = [...cellRight];
		map[4][0] = false;
		map[4][1] = false;

		//Seleccionamos una casilla de la primera columna libre más a la izquierda

		var clear = false;
		var col = 0;

		var to_explore = [0, 1, 2, 5, 6, 7, 8];

		while(col < 5){

			//Cogemos un valor aleatorio de los por explorar
			var pos = Math.floor(Math.random()*to_explore.length);
			var random = to_explore[pos];
			to_explore.splice(pos, 1);

			//Asignar pieza

			var piece = this.pieceGenerator(random, col, map);

			// Ejemplo de rellenado solo usando piezas del estilo [][] 1 y []
			// piece = [
			// 	[0,0,[...cellUp]],[0,1,[...cell]]
			// ];
			//
			// if(col == 4){
			// 	piece = [
			// 		[0,0,[...cell]]
			// 	];
			// }

			//Recorre la pieza y asigna los valores en tetris y map
			for(var part of piece){
				tetris[random + part[0]][col + part[1]] = part[2];
				map[random + part[0]][col + part[1]] = false;
				//Si una pieza elimina varias casillas de la columna, tenemos que actualizar to_explore
				if(to_explore.includes(random + part[0]) && col + part[1] == col){
					let index = to_explore.indexOf(random + part[0]);
					to_explore.splice(index,1);
				}
			}

			//Pasamos a la siguiente columna cuando no nos queda nada más por explorar
			if(to_explore.length == 0){
				while(to_explore.length == 0 && col < 5){
					col++;
					for(let l = 0; l < 9; l++){
						if(map[l][col])
							to_explore.push(l);
					}
				}
			}
		}

		//Cerramos el centro y aseguramos el spawn de pacman

		tetris[5][0][0] = 1;
		tetris[5][1][0] = 1;

		tetris[7][0][0] = 1;

		// tetris[0][0] = [...cellUp];
		// tetris[0][1] = [...cell];
		// tetris[0][2] = [...cell];
		// tetris[0][3] = [...cellUp];
		// tetris[0][4] = [...cell];
		//
		// tetris[1][0] = [...cellRight];
		// tetris[1][1] = [...cell];
		// tetris[1][2] = [...empty];
		// tetris[1][3] = [...cellUp];
		// tetris[1][4] = [...cell];
		//
		// tetris[2][0] = [...cellUp];
		// tetris[2][1] = [...cellRight];
		// tetris[2][2] = [...cellRight];
		// tetris[2][3] = [...cellUp];
		// tetris[2][4] = [...cell];
		//
		// tetris[3][0] = [...cellUp];
		// tetris[3][1] = [...cell];
		// tetris[3][2] = [...cell];
		// tetris[3][3] = [...cellRight];
		// tetris[3][4] = [...cellUp];
		//
		// tetris[4][0] = [...empty];
		// tetris[4][1] = [...cellRight];
		// tetris[4][2] = [...empty];
		// tetris[4][3] = [...cell];
		// tetris[4][4] = [...empty];
		//
		// tetris[5][0] = [...cell];
		// tetris[5][1] = [...cellUp];
		// tetris[5][2] = [...cell];
		// tetris[5][3] = [...cellUp];
		// tetris[5][4] = [...cell];
		//
		// tetris[6][0] = [...empty];
		// tetris[6][1] = [...cell];
		// tetris[6][2] = [...cellRight];
		// tetris[6][3] = [...cellRight];
		// tetris[6][4] = [...cell];
		//
		// tetris[7][0] = [...cellUp];
		// tetris[7][1] = [...cell];
		// tetris[7][2] = [...cell];
		// tetris[7][3] = [...cellUp];
		// tetris[7][4] = [...cellRight];
		//
		// tetris[8][0] = [...cellRight];
		// tetris[8][1] = [...cellUp];
		// tetris[8][2] = [...cellRight];
		// tetris[8][3] = [...cell];
		// tetris[8][4] = [...cellRight];
		//
		// tetris[9][0] = [...cellUp];
		// tetris[9][1] = [...cellUp];
		// tetris[9][2] = [...cellUp];
		// tetris[9][3] = [...empty];
		// tetris[9][4] = [...cellUp];

		tetris[9][0] = [...cellUp];
		tetris[9][1] = [...cellUp];
		tetris[9][2] = [...cellUp];
		tetris[9][3] = [...cellUp];
		tetris[9][4] = [...cellUp];

		return tetris;
	}

	tetris3x3Generator(){
		var tetris = this.tetrisGenerator();

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

				var up = tetris[i][j][0];
				var right = tetris[i][j][1];

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
						tetris3[i*3][j*3 + 2] = upCell[1] | rightCell[0];
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

		return tetris3; //Devolvemos una matriz 28x15
	}

	mazeGenerator(){
		var maze = [];
		var wall = [];

		var tetris3 = this.tetris3x3Generator();

		for(let i = 0; i < 30; i++){
			wall.push(0); //Fila llena de muro
		}

		for(let j = 0; j < 30; j++){
				maze.push([...wall]);
		}

		for(let i = 0; i < tetris3.length ; i++){
			maze[i+1] = ([...tetris3[i]].reverse()).concat(tetris3[i]);
		}

		//Generar portales
		var n_portals = 0;
		for(let i = 1; i < MyConstant.MAZE_HEIGHT - 1; i++){
			if(maze[i][MyConstant.MAZE_WIDTH-2] == 1){
				if(maze[i-1][MyConstant.MAZE_WIDTH-2] == 0 &&
					maze[i+1][MyConstant.MAZE_WIDTH-2] == 0){
						maze[i][MyConstant.MAZE_WIDTH-1] = 4;
						maze[i][0] = 4;
						n_portals++;
				}
			}
		}
		//Si no hay posiciones de portal obligatorio, generamos uno
		if(n_portals == 0){
			var can_portal = [];
			for(let i = 1; i < MyConstant.MAZE_HEIGHT - 1; i++){
				if(maze[i][MyConstant.MAZE_WIDTH-2] == 1){
					if(maze[i-1][MyConstant.MAZE_WIDTH-2] == 1 &&
						maze[i+1][MyConstant.MAZE_WIDTH-2] == 1 &&
						maze[i][MyConstant.MAZE_WIDTH-3] == 1){
							can_portal.push(i);
					}
				}
			}
			var pos = can_portal[Math.floor(Math.random()*can_portal.length)];
			maze[pos][MyConstant.MAZE_WIDTH-1] = 4;
			maze[pos][0] = 4;
		}

		//Rellenamos el mapa de puntos dejando el centro en blanco

		for(let i = 0; i < MyConstant.MAZE_HEIGHT - 1; i++){
			for(let j = 0; j < MyConstant.MAZE_WIDTH - 1; j++){
				if(j == 8 && i >= 8 && i <= 18){
					j = 22;
				}

				if(maze[i][j] == 1){
					maze[i][j] = 2;
				}
			}
		}

		//Añadimos las pastillas

		var swapped = false;
		var row1 = 4;
		var row2 = 25;

		while(!swapped){
			if(maze[row1][1] == 2 && maze[row1][0] == 0){
				maze[row1][1] = 3;
				maze[row1][MyConstant.MAZE_WIDTH - 2] = 3;
				swapped = true;
			}
			else{
				row1++;
			}
		}

		swapped = false;
		while(!swapped){
			if(maze[row2][1] == 2 && maze[row1][0] == 0){
				maze[row2][1] = 3;
				maze[row2][MyConstant.MAZE_WIDTH - 2] = 3;
				swapped = true;
			}
			else{
				row2--;
			}
		}

		return maze;
	}

	getRandomValidPosition(){
		var random = Math.round(Math.random() * (this.validPositions.length - 1));
		return this.validPositions[random];
	}

	getDotNumber(){
		return this.dotNumber;
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

		var position = new THREE.Vector2(pos.y + dir.y, pos.x + dir.x);
		var index = -1;
		for(let i = 0; i < this.teleportPositions.length && index == -1; i++){
			if(this.teleportPositions[i].x == position.x &&
				this.teleportPositions[i].y == position.y){
					index = i;
				}
		}

		if(index %2 == 0){
			newPos = new THREE.Vector2(this.teleportPositions[index+1].x, this.teleportPositions[index+1].y);
		}
		else{
			newPos = new THREE.Vector2(this.teleportPositions[index-1].x, this.teleportPositions[index-1].y);
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

	getNeighbors(pos){
		var neighbors = [];

		for(let i = 0; i < 4; i++){
			neighbors.push(0);
		}

		var pos_aux = new THREE.Vector2(pos.x + 1, pos.y);
		var tileType = this.getTileType(pos_aux);
		if(tileType != 0){
			neighbors[0] = 1;
		}

		pos_aux = new THREE.Vector2(pos.x - 1, pos.y);
		tileType = this.getTileType(pos_aux);
		if(tileType != 0){
			neighbors[1] = -1;
	 	}

		pos_aux = new THREE.Vector2(pos.x, pos.y + 1);
		tileType = this.getTileType(pos_aux);
		if(tileType != 0){
			neighbors[2] = 1;
	 	}

		pos_aux = new THREE.Vector2(pos.x, pos.y - 1);
		tileType = this.getTileType(pos_aux);
		if(tileType != 0){
			neighbors[3] = -1;
	 	}

		return neighbors;
	}

	removeDot(pos){
		var pos_check = pos.y * (MyConstant.MAZE_WIDTH) + pos.x;

		var position = this.children[pos_check].position;
		var cubeSize = this.children[pos_check].size;
		this.children[pos_check].remove(this.children[pos_check].dot); //Elimina el punto
		this.mazeData[pos.y][pos.x] = 1;
		this.dotNumber -= 1;
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

	createShaderMaterial(){
    var color = new THREE.Color(0xBB6649);
    var hsl = new THREE.Object3D();
    color.getHSL(hsl);
		var hue = (Math.random());
    color.setHSL(hue, hsl.s, hsl.l);

		var amount = (Math.random() * (0.5 - 0.25) + 0.25);
		let a1 = (Math.random() * (150.0 - 75.0) + 150.0);
		let a2 = (Math.random() * (350.0 - 200.0) + 350.0);
		let b1 = (Math.random() * (150.0 - 75.0) + 150.0);
		let b2 = (Math.random() * (350.0 - 200.0) + 350.0);
		var vecA = new THREE.Vector2(a1, a2);
		var vecB = new THREE.Vector2(b1, b2);


    var uniforms = {
      amount: {
        type: "f",
        value: amount
      },
      color: {
        type: "c",
        value: color
      },
      borderWidth: {
        type: "f",
        value: 4.25
      },
      borderColor: {
        type: "c",
        value: new THREE.Color(0xc6c6c6)
      },
      blur: {
        type: "f",
        value: 0.0
      },
			vecA:{
				type: "f",
				value: vecA
			},
			vecB:{
				type: "f",
				value: vecB
			}
		};
    var vertexShader = document.getElementById('vertexShader').text;
    var fragmentShader = document.getElementById('fragmentShader').text;
    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms : uniforms,
      vertexShader : vertexShader,
      fragmentShader : fragmentShader
    });

    return shaderMaterial;
  }

	update(){
		for(var child of this.children){
			if(child.portal != undefined){
				child.portal.update();
			}
		}
	}

}
