export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });
	}

	preload() {
		this.load.image('ball', 'assets/Game/ball.png');
		this.load.image('paddle', 'assets/Game/paddle.png');
		this.load.image('brick', 'assets/Game/orange_brick.png');

		this.load.audio('hit', [ "assets/Sounds/Hit.mp3" ]);
		this.load.audio('shoot', [ "assets/Sounds/Shoot.mp3" ]);
		this.load.audio('dead', [ "assets/Sounds/Explosion.mp3" ]);
	}

	/* Get yourName value from LoginScene */
	init(data) {
		this.yourName = data.name;
	}

	create() {
		/* Reset variables when the game restarts */ 
		this.START = false;
		this.TAP = false;
		this.WINNER = false;
		this.LOOSER = false;
		this.score = 0;
		this.lives = 3;

		this.hitSound = this.sound.add('hit');
		this.shootSound = this.sound.add('shoot');
		this.deadSound = this.sound.add('dead');

		this.add.image(0, 0, 'background').setOrigin(0).setScale(1.5);

		this.setBricks();
		this.setPlayer();
		this.setBall();

		this.physics.world.checkCollision.down = false;
		this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
		this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);

		this.setControls();
		this.setText();
	}

	/* Set 42 bricks. 7 columns, 6 lines */
	setBricks() {
		this.bricks = this.physics.add.group({
			immovable: true
		});

		for (let i = 0; i < 7; ++i) {
			for (let j = 0; j < 6; ++j) {
				const brick = this.physics.add.sprite(40 + i * 35, 150 + j * 20, 'brick').setOrigin(0).setScale(0.08);
				this.bricks.add(brick);
			}
		}
	}

	/* Set the paddle sprite and add collider */
	setPlayer() {
		this.player = this.physics.add.sprite(this.cameras.main.centerX, 500, 'paddle');
		this.player.displayWidth = 80;
		this.player.displayHeight = 15;

		this.player.setCollideWorldBounds(true);
		this.player.setImmovable(true);
	}

	/* Set the ball sprite and add collider, the ball is 'attached' to the paddle */
	setBall() {
		this.ball = this.physics.add.sprite(this.player.x, 480, 'ball');
		this.ball.displayWidth = 12;
		this.ball.displayHeight = 12;

		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1, 1);
		this.ball.setData('onPlayer', true);
	}

	/* Set controls, the ball follow the paddle, the game start when the pointerdown is called */
	setControls() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.input.on('pointermove', pointer => {
			this.player.x = Phaser.Math.Clamp(
			pointer.x,
			35,
			this.physics.world.bounds.width - (this.player.displayWidth / 2));

			if (this.ball.getData('onPlayer')) this.ball.x = this.player.x;
		}, this);

		this.input.on('pointerdown', pointer => {
			if (this.ball.getData('onPlayer')) this.TAP = true;
		}, this);
	}

	setText() {
		const style = { fontFamily: 'myFont', fontSize: '24px', fill: '#fff' };

		this.scoreText = this.add.text(70, 35, 'Score: 0', style);

		this.livesText = this.add.text(190, 35, 'Lives: 3', style); 

		this.startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,
			'Press SPACE or TAP to Start', style).setOrigin(0.5);

		/* Start text infinite animation */
		this.tweens.add({ 
			targets: this.startText, 
			alpha: { from: 0, to: 1 }, 
			ease: 'Linear',
			duration: 1000, 
			repeat: -1 
		});
	}

	/* Hide brick after collision, a brick give 20 score pts */
	hitBrick(ball, brick) {
		this.hitSound.play();

		brick.disableBody(true, true);

		this.score += 20;
		this.scoreText.setText('Score: ' + this.score);
	}

	/* Set reverse ball direction compared to the player */
	hitPlayer(ball, player) {
		this.shootSound.play();

		let diff = 0;

		if (this.ball.x < this.player.x)
		{
			diff = this.player.x - this.ball.x;
			this.ball.setVelocityX(-5 * diff);
		}
		else if (this.ball.x > this.player.x)
		{
			diff = this.ball.x -this.player.x;
			this.ball.setVelocityX(5 * diff);
		}
		else this.ball.setVelocityX(2 + Math.random() * 8);
	}

	isGameOver() {
		return this.ball.body.y > this.physics.world.bounds.height;
	}

	isWon() {
		return this.bricks.countActive() === 0;
	}

	resetBall() {
		this.ball.setVelocity(0);
		this.ball.setPosition(this.player.x, 475);
		this.ball.setData('onPlayer', true);
	}

	/* Call when a life is lose, reset the ball */
	reset() {
		this.deadSound.play();
		this.resetBall();

		this.START = false;
		this.TAP = false;
		this.lives -= 1;
		this.livesText.setText('Lives: ' + this.lives);

		if (this.lives <= 0) this.gameOver();
	}

	gameOver() {
		this.LOOSER = true;
		this.scene.start('EndScene', { win: this.WINNER, lose: this.LOOSER, name: this.yourName });
	}

	update() {
		if (!this.START) {
			this.ball.setX(this.player.x);

			if (this.cursors.space.isDown || this.TAP) {
				this.START = true;
				this.ball.setData('onPlayer', false);
				this.ball.setVelocity(-75, -300);
				this.startText.setVisible(false);
			}
		}

		if (this.isGameOver(this.physics.world)) this.reset();
		else if (this.isWon()) {
			this.WINNER = true;
			this.scene.start('EndScene', { win: this.WINNER, lose: this.LOOSER, name: this.yourName });
		};
	}
}
