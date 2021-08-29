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
		[...MyPiece.t1], [...MyPiece.t2], [...MyPiece.t3], [...MyPiece.t4],
		[...MyPiece.l1], [...MyPiece.l2], [...MyPiece.l3], [...MyPiece.l4],
		[...MyPiece.i1], [...MyPiece.i2a], [...MyPiece.i2b],
		[...MyPiece.X1]
	];

	static startColPieces = [
		[...MyPiece.l1], [...MyPiece.l2], [...MyPiece.l3], [...MyPiece.l4],
		[...MyPiece.i1], [...MyPiece.i2a], [...MyPiece.i2b]
	];

}
