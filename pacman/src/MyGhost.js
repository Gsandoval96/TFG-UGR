class MyGhost extends MyCharacter {
  constructor(pos, size, dir, material) {
   super(pos, size);

	this.behaviour = "chase";

  this.updatePathTime = 7500;

	this.speed = this.speed * 0.75; //los fantasmas se mueven más lento

	this.path = null;

	this.sphereGeom = new THREE.SphereGeometry(size * 4/5, 20.0, 20.0, 0.0, Math.PI);
	this.eyeGeom = new THREE.SphereGeometry(size * 6/25, 20.0, 20.0, 0.0);
	this.pupilGeom = new THREE.SphereGeometry(size * 2/25, 20.0, 20.0, 0.0);
	this.cylinderGeom = new THREE.CylinderGeometry(size * 4/5, size * 4/5, size*4/3, 20.0);
  this.material = material;
	//material.side = THREE.DoubleSide;

  // Ya podemos construir el Mesh de la parte superior
  this.cylinder = new THREE.Mesh (this.cylinderGeom, this.material);

	this.sphere = new THREE.Mesh (this.sphereGeom, this.material);
	this.sphere.position.y = size*2/3 - 0.1 ;
	this.sphere.rotation.x = -Math.PI / 2 ;

	this.rightEye = new THREE.Object3D();
	var rightEyeball = new THREE.Mesh (this.eyeGeom, MyMaterial.WHITE);
	var rightPupil = new THREE.Mesh (this.pupilGeom, MyMaterial.BLACK);
	rightPupil.position.x = size * 6/25 - 0.05;
	this.rightEye.add(rightEyeball);
	this.rightEye.add(rightPupil);
	this.rightEye.position.z = - size * 2/5 ;

	this.leftEye = new THREE.Object3D();
	var leftEyeball = new THREE.Mesh (this.eyeGeom, MyMaterial.WHITE);
	var leftPupil = new THREE.Mesh (this.pupilGeom, MyMaterial.BLACK);
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

	this.feetGeom = new THREE.ExtrudeGeometry( shape, options );
	this.feetGeom.scale(0.1,0.1,0.1);
	this.feetGeom.translate(0, 0, size * 4/5 - size/10);

	this.feet = new THREE.Object3D();
	for(var i=0; i<16; i++){
		var mesh = new THREE.Mesh (this.feetGeom, this.material);
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
	this.rotate(dir); //Colocamos al personaje en la dirección adecuada

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

  dispose(){
    this.sphereGeom.dispose();
  	this.eyeGeom.dispose();
  	this.pupilGeom.dispose();
  	this.cylinderGeom.dispose();
    this.feetGeom.dispose();

    if(this.helper != undefined){
      this.helper.geometry.dispose();
    }
  }

	executePath(){
		if(this.path != null){
			let pos = new THREE.Vector2(this.getPosition().x / MyConstant.BOX_SIZE, this.getPosition().z / MyConstant.BOX_SIZE);
			let dir = new THREE.Vector2(this.dirX, this.dirZ);

			pos = this.adjustedPosition(pos, dir);

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
      //Si ha acabado la ruta de volver a casa
      else if(this.behaviour == "return"){
        //console.log("REVIVIENDO", this.material);
        this.revive();
      }
		}
	}

	scare(){
    this.startInvencibleAnimation();
		this.changeColor(MyMaterial.BLUE);
		this.behaviour = "scape";
		this.path = null;
	}

  revive(){
    this.speed = this.speed / 2;
    this.chase();
  }

  chase(){
    this.changeColor(this.material);
    this.behaviour = "chase";
    this.path = null;
  }

  returnHome(){
    this.stopInvencibleAnimation();
    this.speed = this.speed * 2;
		this.changeColor(MyMaterial.INVISIBLE);
		this.behaviour = "return";
		this.path = null;
	}

	changeColor(material){
		this.cylinder.material = material;
		this.sphere.material = material;
		for(let mesh of this.feet.children){
			mesh.material = material;
		}
	}

  changeBehaviour(status){
    this.behaviour = status;
  }

  startUpdatingPaths(){
		var that = this;

		this.updatePaths = new TWEEN.Tween(origin)
			.duration(that.updatePathTime)
			.onRepeat (function(){
				if(that.behaviour == "chase"){
					that.path = null;
				}
			})
			.repeat(Infinity)
			.start();
  }

  stopInvencibleAnimation(){
    this.invencibleStartingAnimation.stop();
    this.invencibleEndingAnimation.stop();
  }

  startInvencibleAnimation(){
    if(this.invencibleStartingAnimation != undefined){
      this.invencibleStartingAnimation.stop();
      this.invencibleEndingAnimation.stop();
    }

		var that = this;

		this.invencibleStartingAnimation = new TWEEN.Tween(origin)
			.duration(15000) //15 segundos
			.onComplete (function(){
				that.invencibleEndingAnimation.start();
      })
			.start();

		var that = this;
    var val = 1;

		this.invencibleEndingAnimation = new TWEEN.Tween(origin)
			.duration(500) //0.5 segundos
			.onRepeat (function(){
        if(val % 2 == 0){
          that.changeColor(MyMaterial.BLUE);
        }
        else{
          that.changeColor(MyMaterial.WHITE);
        }
				val = val + 1;
      })
			.onComplete (function(){
				that.chase();
      })
      .repeat(9);
	}

	update(){
    //this.status = "freeze";
		if(this.behaviour != "freeze" && this.behaviour != "home"){
		  this.executePath();
		  super.update();
		  TWEEN.update();
	  }
	}
}
