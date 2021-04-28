

class MyGame extends THREE.Object3D {
  constructor(){
    super();

	 this.start = false;

    // Title

    var titlePos = new THREE.Vector3(-0.5, 22, 0.5);
    this.title = new MyTitle(titlePos, 2, false);
    this.add(this.title);

	 var pacmanPos = new THREE.Vector3(0, 0, 0);
	 this.pacman = new MyPacman(pacmanPos, 5);
	 this.add(this.pacman);
  }

  startGame(){
	  this.start = true;
  }

  update(){
		if(this.start){
			this.pacman.movePacman();
			this.pacman.update();
		}
  }
}
