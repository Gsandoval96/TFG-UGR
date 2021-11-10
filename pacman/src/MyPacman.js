class MyPacman extends MyCharacter {
  constructor(pos, size, dir) {
   super(pos, size);

	this.status = "alive";

  this.dirBuffer = new THREE.Vector2(0,0);

  this.validRotationX = new THREE.Vector2(0,0);
  this.validRotationY = new THREE.Vector2(0,0);

	this.size = size;

	this.dirX = dir.x;
	this.dirZ = dir.y;

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

	//this.model = new THREE.Object3D();
	this.model.add(this.upHalf);
	this.model.add(this.downHalf);

	this.model.position.set(pos.x * MyConstant.BOX_SIZE, pos.y* MyConstant.BOX_SIZE, pos.z* MyConstant.BOX_SIZE);

	this.add(this.model);

    //Animaciones con TWEEN
    if(this.animated){
      var origin = { p : 0 } ;
      var destiny = { p : Math.PI/4 } ;
      var that = this;

      this.moveAnimation = new TWEEN.Tween(origin)
        .to(destiny, 200) //0.2 segundo
        .onUpdate (function(){
			  that.crearNuevo(size,origin.p);
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();
    }
  }

	deathAnimation(){
		var origin = { p : 0 } ;
		var destiny = { p : Math.PI } ;
		var that = this;

		var deathAnimation = new TWEEN.Tween(origin)
		.to(destiny, 1500) //1.5 segundos
		.onUpdate(function(){
			that.crearNuevo(that.size,origin.p);
		})
		.onComplete(function(){
			that.status = "dead";
		})
		.start();
   }

	die(){
		if(this.status != "dying"){
			this.moveAnimation.stop();
			this.status = "dying";
			this.deathAnimation();
		}
	}

	crearNuevo(size,rot){
		var sphereGeom = new THREE.SphereGeometry(size, 20.0, 20.0, 0.0, Math.PI - rot);
		this.upSphere.geometry = sphereGeom;
		this.upCircle.rotation.y = rot;
		this.downSphere.geometry = sphereGeom;
		this.downCircle.rotation.y = rot;
	}
  setNeightbors(neighbors){
    this.validRotationX = new THREE.Vector2(neighbors[0],neighbors[1]);
    this.validRotationY = new THREE.Vector2(neighbors[2],neighbors[3]);
  }
  rotateBuffer(dir){
      this.dirBuffer = dir;
  }

  setNeightbors(neighbors){
    this.validRotationX = new THREE.Vector2(neighbors[0],neighbors[1]);
    this.validRotationY = new THREE.Vector2(neighbors[2],neighbors[3]);
  }

  checkRotation(){

    if(this.dirBuffer.x != this.dirX || this.dirBuffer.y != this.dirZ){
      if((this.dirBuffer.x != 0 && this.dirBuffer.y == 0) ||
         (this.dirBuffer.x == 0 && this.dirBuffer.y != 0)){

           var validRotation = false;

            if(this.dirBuffer.x != 0){
                if( this.dirBuffer.x == this.validRotationX.x || this.dirBuffer.x == this.validRotationX.y)
                  validRotation = true;
            }
            else if (this.dirBuffer.y != 0){
                if( this.dirBuffer.y == this.validRotationY.x || this.dirBuffer.y == this.validRotationY.y)
                  validRotation = true;
            }

            if(validRotation){

              if(!(this.dirX == -this.dirBuffer.x || this.dirZ == -this.dirBuffer.y )){
                let pos = new THREE.Vector2(this.getPosition().x / MyConstant.BOX_SIZE, this.getPosition().z / MyConstant.BOX_SIZE);
           			let dir = new THREE.Vector2(this.dirX, this.dirZ);



           			pos = this.adjustPositionForPath(pos, dir);

                this.model.position.set(pos.x * MyConstant.BOX_SIZE, this.getPosition().y, pos.y* MyConstant.BOX_SIZE);
                var hitbox_pos = new THREE.Vector3( this.model.position.x, this.model.position.y, this.model.position.z );
            	  this.hitbox.setFromCenterAndSize(hitbox_pos, this.hitbox_size);
              }

              this.rotate(this.dirBuffer);
              this.dirBuffer = new THREE.Vector2(0,0);
              this.validRotationX = new THREE.Vector2(0,0);
              this.validRotationY = new THREE.Vector2(0,0);
            }
      }
    }
  }

	update(){
	  super.update();
    this.checkRotation();
	  TWEEN.update();
	}
}
