class MyPacman extends THREE.Object3D {
  constructor(pos, size) {
   super();

	this.dirX = 1;
	this.dirZ = 0;

	this.hitbox = new THREE.Box3();
	var hitbox_size = MyConstant.BOX_SIZE * 0.75;
	this.hitbox.setFromCenterAndSize(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(hitbox_size, hitbox_size, hitbox_size));

	this.helper = new THREE.Box3Helper( this.hitbox, 0xffff00 );
	this.add( this.helper );

	this.animated = true;

	var sphereGeom = new THREE.SphereGeometry(size, 20.0, 20.0, 0.0, Math.PI);
	var circleGeom = new THREE.CircleGeometry(size, 20.0, 0.0, Math.PI);
   var material = MyMaterial.YELLOW;
	//material.side = THREE.DoubleSide;

   // Ya podemos construir el Mesh de la parte superior
   this.upSphere = new THREE.Mesh (sphereGeom, material);
	this.upSphere.rotation.y = Math.PI ;
	this.upSphere.rotation.x = Math.PI /2 ;
	this.upSphere.rotation.z = Math.PI;

	this.upCircle = new THREE.Mesh (circleGeom, material);
	this.upCircle.rotation.x = Math.PI / 2;
	this.upCircle.rotation.z = -Math.PI / 2;

	this.upHalf = new THREE.Object3D();
	this.upHalf.add(this.upSphere);
	this.upHalf.add(this.upCircle);

	// Ya podemos construir el Mesh
	this.downSphere = new THREE.Mesh (sphereGeom, material);
	this.downSphere.rotation.x = Math.PI /2 ;

	this.downCircle = new THREE.Mesh (circleGeom, material);
	this.downCircle.rotation.x = 3 * Math.PI / 2;
	this.downCircle.rotation.z = -Math.PI / 2;

	this.downHalf = new THREE.Object3D();
	this.downHalf.add(this.downSphere);
	this.downHalf.add(this.downCircle);

	this.pacman = new THREE.Object3D();
	this.pacman.add(this.upHalf);
	this.pacman.add(this.downHalf);


	this.add(this.pacman);
	this.position.set(pos.x * MyConstant.BOX_SIZE, pos.y* MyConstant.BOX_SIZE, pos.z* MyConstant.BOX_SIZE);

    //Animaciones con TWEEN
    if(this.animated){
      var origin = { p : 0 } ;
      var destiny = { p : Math.PI / 4 } ;
      var that = this;

      var animation = new TWEEN.Tween(origin)
        .to(destiny, 200) //0.2 segundo
        .onUpdate (function(){
			  that.crearNuevo(size,origin.p);
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();
    }
  }

  getPosition(){
	  return this.position;
  }

  serPosition(pos){
	  this.position = pos;
  }

  crearNuevo(size,rot){
    var sphereGeom = new THREE.SphereGeometry(size, 20.0, 20.0, 0, Math.PI - rot);
	 this.upSphere.geometry = sphereGeom;
	 this.upCircle.rotation.y = rot;
	 this.downSphere.geometry = sphereGeom;
	 this.downCircle.rotation.y = rot;
  }

  rotatePacman(dir){
	  switch (dir) {
	  	case "l":
			this.pacman.rotation.y = Math.PI;
			this.setDir(-1,0);
	  	break;
		case "r":
			this.pacman.rotation.y = 0;
			this.setDir(1,0);
	  	break;
		case "u":
			this.pacman.rotation.y = Math.PI / 2;
			this.setDir(0,-1);
	  	break;
		case "d":
			this.pacman.rotation.y = 3 * Math.PI / 2;
			this.setDir(0,1);
	  	break;
	  }
  }

  setDir(dirX, dirZ){
	  this.dirX = dirX;
	  this.dirZ = dirZ;
  }

  setPosition(posX, posZ){
	  this.position.x = posX;
	  this.position.z = posZ;
  }


  movePacman(){
	  switch (this.pacman.rotation.y) {
	  	case 0:
	  		this.position.x += 0.1;
	  	break;
		case Math.PI / 2:
	  		this.position.z -= 0.1;
	  	break;
		case Math.PI:
	  		this.position.x -= 0.1;
	  	break;
		case 3 * Math.PI / 2:
	  		this.position.z += 0.1;
	  	break;

	  }
  }

  getCollisionBox(){
	  return this.hitbox;
  }

  update(){
	  TWEEN.update();
	  this.movePacman();
  }
}
