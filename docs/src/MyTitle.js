class MyTitle extends THREE.Object3D {
  constructor(pos, size, animated) {
    super();

	 this.animated = animated;

    var posP = new THREE.Vector3(pos.x, pos.y, pos.z);
    var posA1 = new THREE.Vector3(pos.x+size*0.75, pos.y, pos.z);
    var posC = new THREE.Vector3(pos.x+size*1.75, pos.y, pos.z);
    var posSymb = new THREE.Vector3(pos.x+size*3, pos.y, pos.z);
    var posM = new THREE.Vector3(pos.x+size*3.75, pos.y, pos.z);
	 var posA2 = new THREE.Vector3(pos.x+size*4.9, pos.y, pos.z);
    var posN = new THREE.Vector3(pos.x+size*6, pos.y, pos.z);

    var fontURL = '../fonts/helvetiker_regular.typeface.json';

    this.p = new MyText(posP, 'P', size, MyMaterial.YELLOW, fontURL);
    this.a1 = new MyText(posA1, 'A', size, MyMaterial.YELLOW, fontURL);
    this.c = new MyText(posC, 'C', size, MyMaterial.YELLOW, fontURL);
    this.symb = new MyText(posSymb, '-', size, MyMaterial.YELLOW, fontURL);
    this.m = new MyText(posM, 'M', size, MyMaterial.YELLOW, fontURL);
    this.a2 = new MyText(posA2, 'A', size, MyMaterial.YELLOW, fontURL);
	 this.n = new MyText(posN, 'N', size, MyMaterial.YELLOW, fontURL);

    this.pacman = new THREE.Object3D();
    this.pacman.add(this.p);
    this.pacman.add(this.a1);
    this.pacman.add(this.c);
    this.pacman.add(this.symb);
    this.pacman.add(this.m);
	 this.pacman.add(this.a2);
    this.pacman.add(this.n);

    this.add(this.pacman);

    //Animaciones con TWEEN
    if(this.animated){
      var origin = { p : -size/10 } ;
      var destiny = { p : size/10 } ;
      var that = this;

      var animation = new TWEEN.Tween(origin)
        .to(destiny, 1000) //1 segundo
        .onUpdate (function(){
            that.p.position.y = origin.p;
            that.c.position.y = origin.p;
            that.a2.position.y = origin.p;
        })
        .repeat(Infinity)
        .yoyo(true)
        .start();

        //Animaciones con TWEEN
        var origin2 = { p : size/10 } ;
        var destiny2 = { p : -size/10 } ;

        var animation2 = new TWEEN.Tween(origin2)
          .to(destiny2, 1000) //1 segundo
          .onUpdate (function(){
              that.a1.position.y = origin2.p;
              that.m.position.y = origin2.p;
              that.n.position.y = origin2.p;
          })
          .repeat(Infinity)
          .yoyo(true)
          .start();
    }

  }

  update(){
	 if(this.animated) TWEEN.update();
  }
}
