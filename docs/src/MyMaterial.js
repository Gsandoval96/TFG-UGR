class MyMaterial {

  // static loader = new THREE. TextureLoader ( ) ;
  // static textura = MyMaterial.loader.load ( '../img/brick.jpg' ) ;
  //
  // static REDBRICK = new THREE.MeshStandardMaterial({color: 0xFF0000, map:MyMaterial.textura});
  // static GREENBRICK = new THREE.MeshStandardMaterial({color: 0x00FF00, map:MyMaterial.textura});
  // static BLUEBRICK = new THREE.MeshStandardMaterial({color: 0x0000FF, map:MyMaterial.textura});
  //
  // static CYANBRICK = new THREE.MeshStandardMaterial({color: 0x00FFFF, map:MyMaterial.textura});
  // static YELLOWBRICK = new THREE.MeshStandardMaterial({color: 0xFFFF00, map:MyMaterial.textura});
  // static PURPLEBRICK = new THREE.MeshStandardMaterial({color: 0xFF00FF, map:MyMaterial.textura});
  //
  // static ORANGEBRICK = new THREE.MeshStandardMaterial({color: 0xFF8000, map:MyMaterial.textura});

  static RED = new THREE.MeshStandardMaterial({color: 0xFF0000});
  static GREEN = new THREE.MeshStandardMaterial({color: 0x00FF00});
  static BLUE = new THREE.MeshStandardMaterial({color: 0x0000FF});

  static CYAN = new THREE.MeshStandardMaterial({color: 0x00FFFF});
  static YELLOW = new THREE.MeshStandardMaterial({color: 0xFFFF00});
  static PURPLE = new THREE.MeshStandardMaterial({color: 0xFF00FF});

  static WHITE = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  static BLACK = new THREE.MeshStandardMaterial({color: 0x000000});

  static RED_GHOST = new THREE.MeshStandardMaterial({color: 0xFF0000});
  static PINK_GHOST = new THREE.MeshStandardMaterial({color: 0xFFB8FF});
  static BLUE_GHOST = new THREE.MeshStandardMaterial({color: 0x00FFFF});
  static ORANGE_GHOST = new THREE.MeshStandardMaterial({color: 0xFFB852});

  static TRANSPARENT = new THREE.MeshStandardMaterial({color: 0xFFFFFF, opacity:0.1,transparent:true});
  static INVISIBLE = new THREE.MeshStandardMaterial({color: 0xFFFFFF, opacity:0.0,transparent:true});
}
