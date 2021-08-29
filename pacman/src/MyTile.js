class MyTile extends THREE.Object3D {
  constructor(position, type, size, has_hitbox){
    super();

	 this.has_hitbox = has_hitbox;
	 this.size = size;



    var edgeSize = size/10;

	 if(has_hitbox){

		this.hitbox = new THREE.Box3();
		var hitbox_pos = new THREE.Vector3(position.x, position.y, position.z);
		var hitbox_size = new THREE.Vector3( size,size,size );
		this.hitbox.setFromCenterAndSize( hitbox_pos, hitbox_size );

		if(MyConstant.SHOW_MAZE_HITBOX){
			var helper = new THREE.Box3Helper( this.hitbox, 0x666666 );
			this.add(helper);
		}

	}

	var geometry = new THREE.PlaneGeometry( size-edgeSize, size - edgeSize )
	this.square = new THREE.Mesh(geometry, MyMaterial.INVISIBLE);
	this.square.rotation.x = -Math.PI/2;
	this.square.position.set(position.x, position.y-size/2, position.z);
	this.add (this.square);

	this.cube;
	switch (type) {
		case "empty":
		case "dot":
		case "pill":
			this.cube = new MyCube(position, MyMaterial.INVISIBLE, size);
		break;
		case "wall":
			this.cube = new MyCube(position, MyMaterial.BLUE, size);
		break;
		case "teleport":
			this.cube = new MyCube(position, MyMaterial.GREEN, size);
		break;
	}
	this.add(this.cube);

	this.dot;
	switch (type) {
		case "dot":
			var sphereGeom = new THREE.SphereGeometry( size/6, 20.0, 20.0);
			this.dot = new THREE.Mesh (sphereGeom, MyMaterial.WHITE);
			this.dot.position.set(position.x, position.y, position.z);
			this.add(this.dot);
		break;
		case "pill":
			var sphereGeom = new THREE.SphereGeometry( size/3, 20.0, 20.0);
			this.dot = new THREE.Mesh (sphereGeom, MyMaterial.WHITE);
			this.dot.position.set(position.x, position.y, position.z);
			this.add(this.dot);
		break;
	}


  }

  getCollisionBox(){
	  return this.hitbox;
  }
}
