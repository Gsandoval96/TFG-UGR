class MyPortal extends THREE.Object3D {
  constructor(pos, size){
    super();

    // Creamos la geometría y la colocamos en el 0,0,0
    this.torusGeom = new THREE.TorusGeometry(size/3,size/20,20,50);
    const loader = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial({
      map: loader.load('../img/portal.jpg'),
    });

    // Ya podemos construir el Mesh
    this.portal = new THREE.Mesh (this.torusGeom, material);
    this.portal2 = new THREE.Mesh (this.torusGeom, material);

    // Y añadirlo como hijo del Object3D
    this.add (this.portal);
    this.add (this.portal2);

    this.sphereGeom = new THREE.SphereGeometry( size/10, 20.0, 20.0);
    this.dot = new THREE.Mesh (this.sphereGeom, material);
    this.add(this.dot);

    this.position.set(pos.x, pos.y, pos.z);
    }

  dispose(){
    this.torusGeom.dispose();
  }

  update(){
    this.portal.rotation.y += 0.02;
    this.portal.rotation.z += 0.025;
    this.portal.rotation.x += 0.01;

    this.portal2.rotation.y += 0.01;
    this.portal2.rotation.z += 0.02;
    this.portal2.rotation.x += 0.025;
  }
}
