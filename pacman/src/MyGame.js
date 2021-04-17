

class MyGame extends THREE.Object3D {
  constructor(){
    super();

    // Title

    var titlePos = new THREE.Vector3(-0.5, 22, 0.5);
    this.title = new MyTitle(titlePos,2,false);
    this.add(this.title);
  }

  startGame(){
  }

  update(){
	  //TWEEN.update();
  }
}
