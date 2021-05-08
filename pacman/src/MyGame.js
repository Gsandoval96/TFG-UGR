

class MyGame extends THREE.Object3D {
  constructor(){
    super();

	 this.start = false;

    // Title

    var titlePos = new THREE.Vector3(-16, 24, 0);
    this.title = new MyTitle(titlePos, 5, false);
    this.add(this.title);

	 var pacmanPos = new THREE.Vector3(1, 0, 1);
	 this.pacman = new MyGhost(pacmanPos,MyConstant.PACMAN_SIZE);
	 this.add(this.pacman);

	 this.maze = new MyMaze(MyConstant.BOX_SIZE);
	 this.add(this.maze);
  }

  startGame(){
	  this.start = true;
  }

  collisionManager(){
	  var last_pacmanPosX = this.pacman.getPosition().x;
	  var last_pacmanPosZ = this.pacman.getPosition().z;
	  var last_pacmanDir = new THREE.Vector2();
	  last_pacmanDir.x = this.pacman.dirX;
	  last_pacmanDir.y = this.pacman.dirZ;

	  this.pacman.update();

	  var pacmanPosX = this.pacman.getPosition().x / MyConstant.BOX_SIZE;
	  var pacmanPosZ = this.pacman.getPosition().z / MyConstant.BOX_SIZE;
	  var pacmanDir = new THREE.Vector2();
	  pacmanDir.x = this.pacman.dirX;
	  pacmanDir.y = this.pacman.dirZ;

	  if(pacmanDir.x == 1){// || (pacmanDir.x == 0 && last_pacmanDir.x == -1)){
		  pacmanPosX = Math.ceil(pacmanPosX);
	  }
	  else if(pacmanDir.x == -1){
	  	  pacmanPosX = Math.floor(pacmanPosX);
	  }
	  else{
		  pacmanPosX = Math.round(pacmanPosX);
	  }

	  if(pacmanDir.y == 1){
		  pacmanPosZ = Math.ceil(pacmanPosZ);
	  }
	  else if(pacmanDir.y == -1){
	  	  pacmanPosZ = Math.floor(pacmanPosZ);
	  }
	  else{
		  pacmanPosZ = Math.round(pacmanPosZ);
	  }

	  var collision = this.maze.checkCollision(this.pacman.getCollisionBox(), pacmanPosX, pacmanPosZ, pacmanDir);


	  if(collision){
		  this.pacman.setPosition2D(last_pacmanPosX, last_pacmanPosZ);
	  }
  }

  update(){
		if(this.start){
			this.collisionManager();
		}
  }
}
