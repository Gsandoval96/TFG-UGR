

class MyGame extends THREE.Object3D {
  constructor(){
    super();

	 this.start = false;

    // Title

    var titlePos = new THREE.Vector3(-16, 24, 0);
    this.title = new MyTitle(titlePos, 5, false);
    this.add(this.title);

	 var pacmanPos = new THREE.Vector3(1, 0, 1);
	 this.pacman = new MyPacman(pacmanPos,MyConstant.PACMAN_SIZE);
	 this.add(this.pacman);

	 this.maze = new MyMaze(MyConstant.BOX_SIZE);
	 this.add(this.maze);
  }

  startGame(){
	  this.start = true;
  }

  collisionManager(){
	  var pacmanPos = this.pacman.getPosition();
	  var pacmanDir = this.pacman.getDirection();

	  var pacmanX = ((pacmanPos.x / MyConstant.BOX_SIZE) | 0) + pacmanDir.x;
	  var pacmanZ = ((pacmanPos.z / MyConstant.BOX_SIZE) | 0) + pacmanDir.y;
	  console.log("PACMAN MIRANDO: ", pacmanX, ", ", pacmanZ);
	  var collision = this.maze.checkCollision(this.pacman.getCollisionBox(), pacmanX, pacmanZ);


	  this.pacman.setCollision(collision);
  }

  update(){
		if(this.start){
			this.pacman.update();
			this.collisionManager();
		}
  }
}
