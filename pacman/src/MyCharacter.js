class MyCharacter extends THREE.Object3D {
  constructor(pos, size) {
   super();

	this.dirX = 0;
	this.dirZ = 0;

	this.speed = 0.2;

	this.hitbox = new THREE.Box3();
	var hitbox_pos = new THREE.Vector3( pos.x * MyConstant.BOX_SIZE, pos.y* MyConstant.BOX_SIZE, pos.z* MyConstant.BOX_SIZE );
	this.hitbox_size = new THREE.Vector3(MyConstant.BOX_SIZE * 0.75, MyConstant.BOX_SIZE * 0.75, MyConstant.BOX_SIZE * 0.75);
	this.hitbox.setFromCenterAndSize(hitbox_pos, this.hitbox_size);

	if(MyConstant.SHOW_HITBOX){
		var helper = new THREE.Box3Helper( this.hitbox, 0xff0000 );
		this.add(helper);
	}

	this.animated = true;

	this.model = new THREE.Object3D();
  }

  getPosition(){
	  return this.model.position;
  }

  rotate(dir){

	  if(dir.x != this.dirX || dir.y != this.dirZ){

		  if(dir.x == 1){
			  this.model.rotation.y = 0;
		  }
		  else if (dir.x == -1){
			  this.model.rotation.y = Math.PI;
		  }
		  else if (dir.y == 1){
			  this.model.rotation.y = 3 * Math.PI / 2;
		  }
		  else if (dir.y == -1){
			  this.model.rotation.y = Math.PI / 2;
		  }

		  this.setDir(dir);
	  }
  }

  setDir(dir){
	  this.dirX = dir.x;
	  this.dirZ = dir.y;
  }

  setPosition2D(pos2D){
	  this.model.position.x = pos2D.x;
	  this.model.position.z = pos2D.y;
  }


  move(){
	  switch (this.model.rotation.y) {
	  	case 0:
	  		this.model.position.x += this.speed;
	  	break;
		case Math.PI / 2:
	  		this.model.position.z -= this.speed;
	  	break;
		case Math.PI:
	  		this.model.position.x -= this.speed;
	  	break;
		case 3 * Math.PI / 2:
	  		this.model.position.z += this.speed;
	  	break;
	  }

	  var hitbox_pos = new THREE.Vector3( this.model.position.x, this.model.position.y, this.model.position.z );
	  this.hitbox.setFromCenterAndSize(hitbox_pos, this.hitbox_size);
  }

  getCollisionBox(){
	  return this.hitbox;
  }

  update(){
	  this.move();
  }
}
