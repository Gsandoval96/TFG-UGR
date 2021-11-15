class MyTile extends THREE.Object3D {
  constructor(position, type, size, has_hitbox, maze_material){
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
        this.helper = new THREE.Box3Helper( this.hitbox, 0x666666 );
        this.add(this.helper);
      }

    }

    this.pathGeom = new THREE.PlaneGeometry( size-edgeSize, size - edgeSize )
    this.square = new THREE.Mesh(this.pathGeom, MyMaterial.INVISIBLE);
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
        var material = MyMaterial.BLUE;
        if(MyConstant.ACTIVE_SHADER){
          this.cube = new MyCube(position, maze_material, size);
        }
      break;
      case "teleport":
        this.cube = new MyCube(position, MyMaterial.GREEN, size);
      break;
    }
    this.add(this.cube);

    this.dot;
    switch (type) {
      case "dot":
        this.sphereGeom = new THREE.SphereGeometry( size/6, 20.0, 20.0);
        this.dot = new THREE.Mesh (this.sphereGeom, MyMaterial.WHITE);
        this.dot.position.set(position.x, position.y, position.z);
        this.add(this.dot);
      break;
      case "pill":
        this.sphereGeom = new THREE.SphereGeometry( size/3, 20.0, 20.0);
        this.dot = new THREE.Mesh (this.sphereGeom, MyMaterial.WHITE);
        this.dot.position.set(position.x, position.y, position.z);
        this.add(this.dot);
      break;
    }
  }

  dispose(){
    //console.log(this.children);
    this.pathGeom.dispose();
    if(this.sphereGeom != undefined){
      this.sphereGeom.dispose();
    }
    if(this.helper != undefined){
      this.helper.geometry.dispose();
    }
    this.cube.dispose();
  }

  getCollisionBox(){
	  return this.hitbox;
  }
}
