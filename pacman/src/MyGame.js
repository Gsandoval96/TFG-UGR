

class MyGame extends THREE.Object3D {
  constructor(){
    super();

	 this.start = false;

    // Title

    var titlePos = new THREE.Vector3(-16, 24, 0);
    this.title = new MyTitle(titlePos, 5, false);
    this.add(this.title);

	 var pacmanPos = new THREE.Vector3(0, 0, 0);
	 this.pacman = new MyPacman(pacmanPos,1);
	 this.add(this.pacman);

	 this.maze = new MyMaze(2);
	 this.add(this.maze);
  }

  startGame(){
	  this.start = true;
  }

  update(){
		if(this.start){
			this.pacman.update();
		}
  }
}
