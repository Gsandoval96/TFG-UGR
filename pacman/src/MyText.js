class MyText extends THREE.Object3D {
  constructor(pos, text, size, mat, fontURL) {
    super();

    var that = this;

    var loader = new THREE.FontLoader();

    loader.load(fontURL, function ( font ) {
    	that.geometry = new THREE.TextGeometry( text, {
    		font: font,
    		size: size,
    		height: size/5,
    		curveSegments: 5,
    		bevelEnabled: true,
    		bevelThickness: size/5,
    		bevelSize: size/20,
    		bevelOffset: 0,
    		bevelSegments: 2
    	});

      var mesh = new THREE.Mesh(that.geometry, mat);
      mesh.userData = that;
      mesh.position.set(pos.x, pos.y, pos.z);

      that.add(mesh);
    });
  }

  dispose(){
<<<<<<< HEAD
    if(this.geometry != undefined)
      this.geometry.dispose();
=======
    this.geometry.dispose();
>>>>>>> refs/remotes/origin/master
  }
}
