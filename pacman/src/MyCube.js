class MyCube extends THREE.Object3D {
  constructor(pos, material, size){
    super();

    //var SIZE = 1;
    var edgeSize = size/10;

    // Creamos la geometría y la colocamos en el 0,0,0
    var boxGeom = new THREE.BoxGeometry (size-edgeSize,size-edgeSize,size-edgeSize);

    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, material);
    this.box.position.set(pos.x, pos.y, pos.z);

    // Y añadirlo como hijo del Object3D
    this.add (this.box);
  }
}
