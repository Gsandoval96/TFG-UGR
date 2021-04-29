class MyPacman extends THREE.Object3D {
  constructor(pos, size) {
    super();

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

	//this.pacman.add(this.downHalf);

	this.add(this.pacman);
	this.position.set(pos.x, pos.y, pos.z);
	console.log("Posición PACMAN: ", this.position);

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
	  	break;
		case "r":
			this.pacman.rotation.y = 0;
	  	break;
		case "u":
			this.pacman.rotation.y = Math.PI / 2;
	  	break;
		case "d":
			this.pacman.rotation.y = 3 * Math.PI / 2;
	  	break;
	  }
  }

  movePacman(){
	  switch (this.pacman.rotation.y) {
	  	case 0:
	  		this.position.x += 0.15;
	  	break;
		case Math.PI / 2:
	  		this.position.z -= 0.15;
	  	break;
		case Math.PI:
	  		this.position.x -= 0.15;
	  	break;
		case 3 * Math.PI / 2:
	  		this.position.z += 0.15;
	  	break;

	  }
  }

  update(){
	  TWEEN.update();
	  this.movePacman();
  }
}
