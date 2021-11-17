class MyMenu extends THREE.Object3D {
  constructor() {
    super();

    var titlePos = new THREE.Vector3(-9.5,16,3);
    this.title = new MyTitle(titlePos,4.5,true);
    this.add(this.title);

    var pos = new THREE.Vector3(2,7,2.5);
    var adjust = new THREE.Vector3(2,3,1.6);
    this.keyPLAY = new MyKeyObj(pos,30,15,'PLAY', adjust);
    this.add(this.keyPLAY);

    var fontURL = '../fonts/helvetiker_regular.typeface.json'

    var githubTextPosition = new THREE.Vector3(1,3,2.5);
    var githubText = new MyText(githubTextPosition,'github.com/Gsandoval96',0.5,MyMaterial.WHITE,fontURL);
    this.add(githubText);
  }

  update(){
    this.title.update();
    //TWEEN.update(); -- TODO
  }
}
