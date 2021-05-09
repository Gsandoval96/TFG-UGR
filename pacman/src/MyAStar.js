class Node{
	constructor(pos, father, g, h){
		this.position = pos;
		this.father = father;
		this.gValue = g;
		this.hValue = h;
	}

	getFValue(){
		return this.gValue + this.hValue;
	}
}

class MyAStar{
	constructor(){
		this.openNodes = new TinyQueue([], function (a, b) {
			return a.getFValue() < b.getFValue();
		});

		this.closedMap = new Map();
		//this.contacts.set('Jessie', {phone: "213-555-1234", address: "123 N 1st Ave"})
		//contacts.has('Jessie')

		this.recoverExecution = false;
		this.pathFinded = false;
	}

	getPath(data, start, goal){
		//console.log("START:", start);
		var firstNode = new Node(start, null, 0, this.manhattanDistance(start, goal));
		this.openNodes.push(firstNode);
		//console.log(this.openNodes.peek());
		var currentNode = null;
		var path = null;

		while(this.openNodes.length != 0 && !this.pathFinded){
			currentNode = this.openNodes.pop();
			console.log("-------------------------------------");
			console.log("MAZE DATA CURRENT:", data[currentNode.position.x][currentNode.position.y]);
			console.log("CURRENT NODE: ", currentNode.getFValue());
			console.log("CURRENT NODE POS: ", currentNode.position);
			this.closedMap.set(currentNode.position, currentNode.gValue );
			this.pathFinded = currentNode.position.x == goal.x && currentNode.position.y == goal.y;

			if(!this.pathFinded){
				var sonsPositions = [[-1, 0],[1, 0],[0, -1],[0, 1]];

				for(let pos of sonsPositions){
					var sonPos = new THREE.Vector2(currentNode.position.x + pos[0], currentNode.position.y + pos[1]);
					console.log("MAZE DATA:", data[sonPos.x][sonPos.y]);
					if(data[sonPos.x][sonPos.y] != 1){
						var child = new Node(sonPos, currentNode, currentNode.gValue + 1, this.manhattanDistance(sonPos, goal));
						if(this.closedMap.has(sonPos)){

							if(this.closedMap.get(sonPos) > child.gValue){
								this.closedMap.delete(sonPos);
								this.openNodes.push(child);
								console.log("CHILD NODE: ", child.getFValue());
								console.log("CHILD NODE POS: ", child.position);
							}
						}
						else{
							this.openNodes.push(child);
							console.log("CHILD NODE: ", child.getFValue());
							console.log("CHILD NODE POS: ", child.position);
						}
					}
				}
				//this.closedMap.set(currentNode.position, currentNode.gValue );
			}
		}

		if(this.pathFinded){
			path = this.reconstructPath(currentNode);
		}

		if(path == null) console.log("NULO");

		return path;

	}

	manhattanDistance(a, b){
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	}

	reconstructPath(currentNode){
		var path = [];
		var node = currentNode;

		while(node.father != null){
			path.unshift(node.position);
			node = node.father;
		}

		return path;
	}

}
