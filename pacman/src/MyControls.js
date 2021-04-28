class MyControls{

  constructor(){
    this.rotateLeftKey = 81; //Q
    this.rotateRightKey = 69; //E

    this.moveLeftKey = 37; //Flecha Izquierda
	 this.moveUpKey = 38; //Flecha Arriba
    this.moveRightKey = 39; //Flecha Derecha
    this.moveDownKey = 40; //Flecha Abajo

    this.hardDropKey = 32; //Espacio
    this.savePieceKey = 87; //W
  }

  manager(keyCode, game){

    // if (keyCode == this.rotateLeftKey ){game.pacman.movePacman(keyCode);} //Q
    // if (keyCode == this.rotateRightKey ){game.board.rotatePiece('R');} //E
	 //
    // if (keyCode == this.hardDropKey ){game.hardDrop();} //Espacio
    // if (keyCode == this.savePieceKey ){game.board.holdPiece();} //W
	 var dir = null;

    if (keyCode == this.moveLeftKey ){dir = "l";} //Flecha Izquierda
    if (keyCode == this.moveRightKey ){dir = "r";} //Flecha Derecha
    if (keyCode == this.moveDownKey ){dir = "d";} //Flecha Abajo
	 if (keyCode == this.moveUpKey ){dir = "u";} //Flecha Arriba

	 if (dir != null) game.pacman.rotatePacman(dir);
  }
}
