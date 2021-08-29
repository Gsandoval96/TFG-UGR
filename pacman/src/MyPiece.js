//Tipos de celdas
var cell = [1,1];
var empty = [0,0];
var cellUp = [1,0];
var cellRight = [0,1];

class MyPiece{

	//Una parte de la una pieza -> [ row, col, type ]

	static t1 = [	[0,0,[...cellUp]],	[0,1,[...cellUp]],		[1,1,[...cellRight]],	[0,2,[...cell]]			];
	static t2 = [	[0,0,[...cellUp]],	[0,1,[...empty]],			[-1,1,[...cell]],			[0,2,[...cell]]			];
	static t3 = [	[0,0,[...cellUp]],	[0,1,[...cellRight]],	[-1,1,[...cell]],			[1,1,[...cellRight]]		];
	static t4 = [	[0,0,[...cellUp]],	[0,1,[...cell]],			[-1,0,[...cell]],			[1,0,[...cellRight]]			];

	static l1 = [	[0,0,[...empty]],		[0,1,[...cell]],			[-1,0,[...cell]]		];
	static l2 = [	[0,0,[...cellUp]],	[0,1,[...cell]],			[1,0,[...cellRight]]	];
	static l3 = [	[0,0,[...cellUp]],	[0,1,[...cellRight]],	[-1,1,[...cell]]		];
	static l4 = [	[0,0,[...cellUp]],	[0,1,[...cell]],			[1,1,[...cellRight]]	];

	static i1 = [	[0,0,[...cellUp]],	[0,1,[...cell]]		];
	static i2a = [	[0,0,[...cell]],		[1,0,[...cellRight]]	];
	static i2b = [	[0,0,[...cellRight]],[-1,0,[...cell]]		];

	static X1 = [	[0,0,[...cellUp]],	[0,1,[...empty]],	[-1,1,[...cell]],	[1,1,[...cellRight]],	[0,2,[...cell]]	];

	static o1 = [	[0,0,[...cell]]	];

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
