class MyCube extends THREE.Object3D {
  constructor(pos, material, size, hitbox){
    super();

	 this.hitbox = hitbox;

	 if(this.hitbox){

		this.Bbox = new THREE.Box3();
		this.Bbox.setFromCenterAndSize( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( MyConstant.BOX_SIZE, MyConstant.BOX_SIZE, MyConstant.BOX_SIZE ) );

		this.helper = new THREE.Box3Helper( this.Bbox, 0xff0000 );
		this.add( this.helper );
	}

    //var SIZE = 1;
    var edgeSize = size/10;

    // Creamos la geometría y la colocamos en el 0,0,0
    var boxGeom = new THREE.BoxGeometry (size-edgeSize,size-edgeSize,size-edgeSize);

    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, material);

    // Y añadirlo como hijo del Object3D
    this.add (this.box);

	 this.position.set(pos.x, pos.y, pos.z);
  }

  getCollisionBox(){
	  return this.Bbox;
  }
}
