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
	this.upHalf.position.set(pos.x, pos.y, pos.z);

	// Ya podemos construir el Mesh
	this.downSphere = new THREE.Mesh (sphereGeom, material);
	this.downSphere.rotation.x = Math.PI /2 ;

	this.downCircle = new THREE.Mesh (circleGeom, material);
	this.downCircle.rotation.x = 3 * Math.PI / 2;
	this.downCircle.rotation.z = -Math.PI / 2;

	this.downHalf = new THREE.Object3D();
	this.downHalf.add(this.downSphere);
	this.downHalf.add(this.downCircle);
	this.downHalf.position.set(pos.x, pos.y, pos.z);

	this.pacman = new THREE.Object3D();
	this.pacman.add(this.upHalf);
	this.pacman.add(this.downHalf);

	//this.pacman.add(this.downHalf);

	this.add(this.pacman);

    //Animaciones con TWEEN
    if(this.animated){
      var origin = { p : 0 } ;
      var destiny = { p : Math.PI / 4 } ;
      var that = this;

      var animation = new TWEEN.Tween(origin)
        .to(destiny, 250) //0.25 segundo
        .onUpdate (function(){
			  that.crearNuevo(5,origin.p);
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

  move(){
	  
  }

  update(){
  	TWEEN.update();
  }
}
