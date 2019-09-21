var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

var score = 0

var colors = ["Red", "DarkOrange", "Yellow", "YellowGreen", "Green", "Blue", "Purple"]


var drawBorder = function () {
	ctx.fillStyle = "Gray";
	ctx.fillRect(0, 0, width, blockSize);
	ctx.fillRect(0, height - blockSize, width, blockSize);
	ctx.fillRect(0, 0, blockSize, height);
	ctx.fillRect(width - blockSize, 0, blockSize, height);
};

var drawScore = function () {
	ctx.font = "20px Courier";
	ctx.fillStyle = "Black";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, blockSize, blockSize);
};

var gameOver = function () {
	clearInterval(intervalId);
	ctx.font = "60px Courier";
	ctx.fillStyle = "Black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Game Over", width / 2, height / 2);
};

var circle = function (x, y, radius, fillCircle) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fillCircle) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
};

class Block{

  constructor(col, row) {
		this.col = col;
		this.row = row;
	};

	function drawSquare(color) {
		var x = this.col * blockSize;
		var y = this.row * blockSize;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, blockSize, blockSize);
	};

	 function drawCircle(color) {
		var centerX = this.col * blockSize + blockSize / 2;
		var centerY = this.row * blockSize + blockSize / 2;
		ctx.fillStyle = color;
		circle(centerX, centerY, blockSize / 2, true);
	};

	function equals(otherBlock) {
		return this.col === otherBlock.col && this.row === otherBlock.col;
	};

};

class Snake {
	constructor() {
		this.segments = [
			new Block(17, 15),
			new Block(16, 15),
			new Block(15, 15)
		];

		this.direction = "right";
		this.next = "right";
	};

	function draw() {
		for (var i = 0; i < this.segments.length; i++) {
			this.segments[i].drawSquare(colors[i]);
		}
	};

	function move() {
		var head = this.segments[0];
		var newHead;

		this.direction = this.next;

		if  (this.direction === 'right') {
			newHead = new Block(head.col + 1, head.row);
		} else if (this.direction === 'down') {
			newHead = new Block(head.col, head.row + 1);
		} else if(this.direction === 'left') {
			newHead = new Block(head.col - 1, head.row);
		} else if(this.direction === 'up') {
			newHead = new Block(head.col, head.row - 1);
		}


		if (this.checkCollision(newHead)) {
			gameOver();
			return;
		}

		if (newHead.equals(apple.position)) {
			score++;
			apple.move();
		} else {
			this.segments.pop();
		}

		this.segments.unshift(newHead);

	};

	function checkCollision(head) {
		var leftCollision = (head.col === 0);
		var topCollision = (head.row === 0);
		var rightCollision = (head.col === widthInBlocks - 1);
		var bottomCollision = (head.row === heightInBlocks - 1);
		var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
		var selfCollision = false;

		for (var i = 1; i < this.segments.length; i++) {
			if (head.equals(this.segments[i])) {
				selfCollision = true;
				console.log(i);
			}
			console.log(head.equals(this.segments[i]));
		}

		return wallCollision || selfCollision;
	};

	Snake.prototype.setDirection = function (newDirection) {
		if (this.direction === "up" && newDirection === "down") {
			return;
		} else if (this.direction === "right" && newDirection === "left") {
			return;
		} else if (this.direction === "down" && newDirection === "up") {
			return;
		} else if (this.direction === "left" && newDirection === "right") {
			return;
		}

		this.next = newDirection;
	};

};

class Apple {
	constructor() {
		this.position = new Block(10,10);
		this.move();
	};

	function draw() {
		this.position.drawCircle("LimeGreen");
	};

	function move() {
		var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
		var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
		this.position = new Block(randomCol, randomRow);
	};

};

var snake = new Snake();
var apple = new Apple();

var intervalId = setInterval(function () {
	ctx.clearRect(0, 0, width, height);
	drawScore();
	snake.move();
	snake.draw();
	apple.draw();
	drawBorder();
}, 100);

var directions = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};

$("body").keydown(function (event) {
	var newDirection = directions[event.keyCode];
	if (newDirection !== undefined) {
		snake.setDirection(newDirection);
	}
});
