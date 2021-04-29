

class MyGame extends THREE.Object3D {
  constructor(){
    super();

	 this.start = false;

    // Title

    var titlePos = new THREE.Vector3(-16, 24, 0);
    this.title = new MyTitle(titlePos, 5, false);
    this.add(this.title);

	 var pacmanPos = new THREE.Vector3(2, 0, 2);
	 this.pacman = new MyPacman(pacmanPos,MyConstant.PACMAN_SIZE);
	 this.add(this.pacman);

	 this.maze = new MyMaze(MyConstant.BOX_SIZE);
	 this.add(this.maze);
  }

  startGame(){
	  this.start = true;
  }

  collisionManager(){
	   this.maze.checkCollision(this.pacman.getCollisionBox());
  }

  update(){
		if(this.start){
			this.pacman.update();
			this.collisionManager();
		}
  }
}
