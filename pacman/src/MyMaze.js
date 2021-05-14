class MyMaze extends THREE.Object3D {
	constructor(cubeSize) {
		super();

		this.mazeData = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
			[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
			[0,1,0,1,1,0,1,0,1,1,1,0,1,0,0,1,0,1,1,1,0,1,0,1,1,0,1,0],
			[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
			[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
			[0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
			[0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,1,1,1,1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,1,1,1,1,0],
			[0,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,0],
			[0,1,1,1,1,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,1,1,0],
			[0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0],
			[0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0],
			[0,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,0],
			[0,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,0],
			[0,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,0],
			[0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
			[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
			[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
			[0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0],
			[0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
			[0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
			[0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
			[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
			[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
			[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		this.validPositions = [];

		// Board

		for(var i = 0; i < MyConstant.MAZE_HEIGHT; i++){
			for(var j = 0; j < MyConstant.MAZE_WIDTH; j++){
				var position = new THREE.Vector3(j*cubeSize, 0, i*cubeSize);
				var cube;

				switch (this.mazeData[i][j]) {
					case 0:
						cube = new MyCube(position, MyMaterial.BLUE, cubeSize, true);
					break;
					case 1:
						cube = new MyCube(position, MyMaterial.INVISIBLE, cubeSize, false);
						var validPosition = new THREE.Vector2(i, j);
						this.validPositions.push(validPosition);
					break;
				}

				this.add(cube);
			}
		}
	}

	getRandomValidPosition(){
		var random = Math.round(Math.random() * (this.validPositions.length - 1));
		return this.validPositions[random];
	}

	clearColor(material){
		for(var i = 0; i < MyConstant.MAZE_HEIGHT; i++){
			for(var j = 0; j < MyConstant.MAZE_WIDTH; j++){
				var pos_check = i * (MyConstant.MAZE_WIDTH) + j;
				if(this.children[pos_check].box.material == material){
					this.children[pos_check].box.material = MyMaterial.INVISIBLE;
				}
			}
		}
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
				//this.children[pos_check].box.material = MyMaterial.GREEN;
			}
		}

		return collision;
	}

	update(){
	}

}
