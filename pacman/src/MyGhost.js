class MyGhost extends MyCharacter {
  constructor(pos, size, dir, material) {
   super(pos, size);

	this.dirX = dir.x;
	this.dirZ = dir.y;

	var sphereGeom = new THREE.SphereGeometry(size * 4/5, 20.0, 20.0, 0.0, Math.PI);
	var eyeGeom = new THREE.SphereGeometry(size * 6/25, 20.0, 20.0, 0.0);
	var pupilGeom = new THREE.SphereGeometry(size * 2/25, 20.0, 20.0, 0.0);
	var cylinderGeom = new THREE.CylinderGeometry(size * 4/5, size * 4/5, size*4/3, 20.0);
   var material = material;
	//material.side = THREE.DoubleSide;

   // Ya podemos construir el Mesh de la parte superior
   this.cylinder = new THREE.Mesh (cylinderGeom, material);

	this.sphere = new THREE.Mesh (sphereGeom, material);
	this.sphere.position.y = size*2/3 - 0.1 ;
	this.sphere.rotation.x = -Math.PI / 2 ;

	this.rightEye = new THREE.Object3D();
	var rightEyeball = new THREE.Mesh (eyeGeom, MyMaterial.WHITE);
	var rightPupil = new THREE.Mesh (pupilGeom, MyMaterial.BLACK);
	rightPupil.position.x = size * 6/25 - 0.05;
	this.rightEye.add(rightEyeball);
	this.rightEye.add(rightPupil);
	this.rightEye.position.z = - size * 2/5 ;

	this.leftEye = new THREE.Object3D();
	var leftEyeball = new THREE.Mesh (eyeGeom, MyMaterial.WHITE);
	var leftPupil = new THREE.Mesh (pupilGeom, MyMaterial.BLACK);
	leftPupil.position.x = size * 6/25 - 0.05;
	this.leftEye.add(leftEyeball);
	this.leftEye.add(leftPupil);
	this.leftEye.position.z = size * 2/5 ;

	this.eyes = new THREE.Object3D();
	this.eyes.add(this.rightEye);
	this.eyes.add(this.leftEye);
	this.eyes.position.y = size*2/3 ;
	this.eyes.position.x = size * 4/5 - 0.1;

	var shape = new THREE.Shape();
	shape.lineTo(-1, 3);
	shape.lineTo(1, 3);

	var options = {
      depth: size * 1/3, bevelEnabled: true, bevelSegments: 1, steps: 5, bevelSize: 0.5, bevelThickness: 0.5, bevelSegments: 5
    };

	var geometry = new THREE.ExtrudeGeometry( shape, options );
	geometry.scale(0.1,0.1,0.1);
	geometry.translate(0, 0, size * 4/5 - size/10);

	this.feet = new THREE.Object3D();
	for(var i=0; i<16; i++){
		var mesh = new THREE.Mesh (geometry, material);
		mesh.rotation.y = i * (Math.PI / 8);
		this.feet.add(mesh);
	}

	this.feet.position.y = -size;

	this.model.add(this.cylinder);
	this.model.add(this.sphere);
	this.model.add(this.eyes);
	this.model.add(this.feet);

	this.model.position.set(pos.x * MyConstant.BOX_SIZE, pos.y * MyConstant.BOX_SIZE, pos.z* MyConstant.BOX_SIZE);

	this.add(this.model);

    //Animaciones con TWEEN
    if(this.animated){
      var origin = { p : this.model.position.y } ;
      var destiny = { p : this.model.position.y + 0.35 } ;
      var that = this;

      var animation = new TWEEN.Tween(origin)
        .to(destiny, 1000) //1 segundo
        .onUpdate (function(){
			  //that.crearNuevo(size,origin.p);
			  that.model.position.y = origin.p;
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();
    }
  }

  crearNuevo(size,rot){
    // var sphereGeom = new THREE.SphereGeometry(size, 20.0, 20.0, 0, Math.PI - rot);
	 // this.upSphere.geometry = sphereGeom;
	 // this.upCircle.rotation.y = rot;
	 // this.downSphere.geometry = sphereGeom;
	 // this.downCircle.rotation.y = rot;
  }

  update(){
	  super.update();
	  TWEEN.update();
  }
}
