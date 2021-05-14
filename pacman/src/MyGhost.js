class MyGhost extends MyCharacter {
  constructor(pos, size, dir, material) {
   super(pos, size);

	this.path = null;

	this.dirX = dir.x;
	this.dirZ = dir.y;

	var sphereGeom = new THREE.SphereGeometry(size * 4/5, 20.0, 20.0, 0.0, Math.PI);
	var eyeGeom = new THREE.SphereGeometry(size * 6/25, 20.0, 20.0, 0.0);
	var pupilGeom = new THREE.SphereGeometry(size * 2/25, 20.0, 20.0, 0.0);
	var cylinderGeom = new THREE.CylinderGeometry(size * 4/5, size * 4/5, size*4/3, 20.0);
   this.material = material;
	//material.side = THREE.DoubleSide;

   // Ya podemos construir el Mesh de la parte superior
   this.cylinder = new THREE.Mesh (cylinderGeom, this.material);

	this.sphere = new THREE.Mesh (sphereGeom, this.material);
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
		var mesh = new THREE.Mesh (geometry, this.material);
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
			  that.model.position.y = origin.p;
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();
    }
  }

	executePath(){
		if(this.path != null){
			let pos = new THREE.Vector2(this.getPosition().x / MyConstant.BOX_SIZE, this.getPosition().z / MyConstant.BOX_SIZE);
			let dir = new THREE.Vector2(this.dirX, this.dirZ);

			pos = this.adjustPosition(pos, dir);

			if(pos.x == this.path[0].y && pos.y == this.path[0].x){
				this.path.shift();
				if(this.path.length == 0) this.path = null;
			}

			if(this.path != null){
				var newDirX = this.path[0].y - pos.x;
				var newDirZ = this.path[0].x - pos.y ;
				var newDir = new THREE.Vector2(newDirX, newDirZ);
				this.rotate(newDir);
			}
		}

	}

	adjustPositionForPath(pos, dir){

		var adjustedPosition = new THREE.Vector2(pos.x, pos.y);

		if(dir.x == 1){
			adjustedPosition.x = Math.floor(pos.x);
		}
		else if(dir.x == -1){
			adjustedPosition.x = Math.ceil(pos.x);
		}
		else{
			adjustedPosition.x = Math.round(pos.x);
		}
		if(dir.y == 1){
			adjustedPosition.y = Math.floor(pos.y);
		}
		else if(dir.y == -1){
			adjustedPosition.y = Math.ceil(pos.y);
		}
		else{
			adjustedPosition.y = Math.round(pos.y);
		}

		return adjustedPosition;

	}

  update(){
	  this.executePath();
	  super.update();
	  TWEEN.update();
  }
}
