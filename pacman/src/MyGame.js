class MyGame extends THREE.Object3D {
  constructor(){
    super();

	 this.start = false;

    // Title

    var titlePos = new THREE.Vector3(-16, 24, 0);
    this.title = new MyTitle(titlePos, 5, false);
    this.add(this.title);

	 var redGhostDir = new THREE.Vector2(1,0);
	 var pinkGhostDir = new THREE.Vector2(1,0);
	 var blueGhostDir = new THREE.Vector2(1,0);
	 var orangeGhostDir = new THREE.Vector2(0,-1);

	 var pacmanPos = new THREE.Vector3(1, 0, 1);
	 var redGhostPos = new THREE.Vector3(1, 0, 20);
	 var pinkGhostPos = new THREE.Vector3(1, 0, 29);
	 var blueGhostPos = new THREE.Vector3(6, 0, 26);
	 var orangeGhostPos = new THREE.Vector3(21, 0, 1);

	 this.pacman = new MyPacman(pacmanPos, MyConstant.CHARACTER_SIZE);
	 this.redGhost = new MyGhost(redGhostPos, MyConstant.CHARACTER_SIZE, redGhostDir, MyMaterial.RED_GHOST);
	 this.pinkGhost = new MyGhost(pinkGhostPos, MyConstant.CHARACTER_SIZE, pinkGhostDir, MyMaterial.PINK_GHOST);
	 this.blueGhost = new MyGhost(blueGhostPos, MyConstant.CHARACTER_SIZE, blueGhostDir, MyMaterial.BLUE_GHOST);
	 this.blueGhost.rotate("u");
	 this.orangeGhost = new MyGhost(orangeGhostPos, MyConstant.CHARACTER_SIZE, orangeGhostDir, MyMaterial.ORANGE_GHOST);
	 this.orangeGhost.rotate("d");

	 this.add(this.pacman);
	 this.add(this.redGhost);
	 this.add(this.pinkGhost);
	 this.add(this.blueGhost);
	 this.add(this.orangeGhost);

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
	  this.redGhost.update();
 	 this.pinkGhost.update();
 	 this.blueGhost.update();
 	 this.orangeGhost.update();

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
