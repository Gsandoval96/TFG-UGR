class MyTile extends THREE.Object3D {
  constructor(position, type, size, has_hitbox){
    super();

	 this.has_hitbox = has_hitbox;
    var edgeSize = size/10;

	if(this.has_hitbox){

		this.hitbox = new THREE.Box3();
		var hitbox_pos = new THREE.Vector3(position.x, position.y, position.z);
		var hitbox_size = new THREE.Vector3( size-edgeSize,size-edgeSize,size-edgeSize );
		this.hitbox.setFromCenterAndSize( hitbox_pos, hitbox_size );

		if(MyConstant.SHOW_HITBOX){
			var helper = new THREE.Box3Helper( this.hitbox, 0xff0000 );
			this.add(helper);
		}

	}

	this.cube;
	switch (type) {
		case "empty":
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


  }

  getCollisionBox(){
	  return this.hitbox;
  }
}
