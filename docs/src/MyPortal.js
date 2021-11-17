class MyPortal extends THREE.Object3D {
  constructor(pos, size){
    super();

    // Creamos la geometría y la colocamos en el 0,0,0
    this.torusGeom = new THREE.TorusGeometry(size/3,size/20,20,50);

    this.torusGeom.rotateY(Math.PI/2);
    this.texture = new THREE.TextureLoader().load('../img/portal.jpg');
    var material = new THREE.MeshBasicMaterial( { map: this.texture } );

    // Ya podemos construir el Mesh
    this.portal = new THREE.Mesh (this.torusGeom, material);
    //this.portal.rotateZ(Math.PI/10);

    // Y añadirlo como hijo del Object3D
    this.add (this.portal);

    this.sphereGeom = new THREE.SphereGeometry( size/10, 20.0, 20.0);
    this.dot = new THREE.Mesh (this.sphereGeom, material);
    this.add(this.dot);

    this.position.set(pos.x, pos.y, pos.z);
    }

  dispose(){
    this.torusGeom.dispose();
    this.sphereGeom.dispose();
    this.texture.dispose();

  }

  update(){
    this.portal.rotation.x += 0.05;
  }
}
