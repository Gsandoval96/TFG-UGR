class MyCube extends THREE.Object3D {
  constructor(pos, material, size, has_hitbox){
    super();

	 this.has_hitbox = has_hitbox;

	 if(this.has_hitbox){

		this.hitbox = new THREE.Box3();
		var hitbox_pos = new THREE.Vector3(pos.x, pos.y, pos.z);
		var hitbox_size = new THREE.Vector3( MyConstant.BOX_SIZE, MyConstant.BOX_SIZE, MyConstant.BOX_SIZE );
		this.hitbox.setFromCenterAndSize( hitbox_pos, hitbox_size );

		this.helper = new THREE.Box3Helper( this.hitbox, 0xff0000 );
		this.add( this.helper );
	}

    //var SIZE = 1;
    var edgeSize = size/10;

    // Creamos la geometría y la colocamos en el 0,0,0
    var boxGeom = new THREE.BoxGeometry (size-edgeSize,size-edgeSize,size-edgeSize);

    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, material);

	 this.box.position.set(pos.x, pos.y, pos.z);

    // Y añadirlo como hijo del Object3D
    this.add (this.box);


  }

  getCollisionBox(){
	  return this.hitbox;
  }
}
