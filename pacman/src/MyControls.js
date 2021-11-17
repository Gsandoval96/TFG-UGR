class MyControls{

  constructor(){
    this.rotateLeftKey = 81; //Q
    this.rotateRightKey = 69; //E

    this.moveLeftKey = 37; //Flecha Izquierda
	  this.moveUpKey = 38; //Flecha Arriba
    this.moveRightKey = 39; //Flecha Derecha
    this.moveDownKey = 40; //Flecha Abajo

    this.dieKey = 32; //Espacio
    this.memoryKey = 13; //Enter
  }

  manager(keyCode, game, renderer){

    var dir = new THREE.Vector2(0,0);

    if (keyCode == this.moveLeftKey ){dir.x = -1;} //Flecha Izquierda
    if (keyCode == this.moveRightKey ){dir.x = 1;} //Flecha Derecha
    if (keyCode == this.moveDownKey ){dir.y = 1;} //Flecha Abajo
    if (keyCode == this.moveUpKey ){dir.y = -1;} //Flecha Arriba
    if (keyCode == this.dieKey ){
      game.respawn();
    }

    if (keyCode == this.memoryKey ){
    	console.log(renderer.info);
      //game.nextLevel();
    }

    if (dir.x != 0 || dir.y != 0){
      game.characters[0].rotateBuffer(dir);
    }
  }
}
