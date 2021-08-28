//Tipos de celdas
var cell = [1,1];
var empty = [0,0];
var cellUp = [1,0];
var cellRight = [0,1];

class MyPiece{
	static L1 = [	[0,0,[...empty]],	[0,1,[...cell]],		[-1,0,[...cell]]		];
	static L2 = [	[0,0,[...cellUp]],[0,1,[...cell]],		[1,0,[...cellRight]]	];
	static L3 = [	[0,0,[...cellUp]],[0,1,[...cellRight]],[-1,1,[...cell]]		];
	static L4 = [	[0,0,[...cellUp]],[0,1,[...cell]],		[1,1,[...cellRight]]	];
	static I1 = [	[0,0,[...cellUp]],[0,1,[...cell]]									];
	static I2 = [	[0,0,[...cell]],[1,0,[...cellRight]]								];

	static O1 = [	[0,0,[...cell]]															];

	static allPieces = [
		[...MyPiece.L1], [...MyPiece.L2], [...MyPiece.L3], [...MyPiece.L4], [...MyPiece.I1], [...MyPiece.I2]
	];

}
