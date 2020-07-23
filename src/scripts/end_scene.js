import Button from './button';

export default class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' });
	}

	/* Get values from GameScene */
	init(data) {
		this.WINNER = data.win;
		this.LOOSER = data.lose;
		this.yourName = data.name;
	}

	preload() {
		this.load.audio('winner', [ "assets/Sounds/Jingle_Achievement.mp3" ]);
		this.load.audio('looser', [ "assets/Sounds/Jingle_Lose.mp3" ]);
	}

	create() {
		this.background = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 328, 600, 'background');

		this.winnerSound = this.sound.add('winner');
		this.looserSound = this.sound.add('looser');
		this.clickSound = this.sound.add('soundMenu');

		if (this.WINNER) {
			this.winnerSound.play();

			this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 
				"BRAVO \n" + this.yourName, 
				{
					align: 'center',
					fontFamily: 'myFont', 
					fontSize: 24 
				}).setOrigin(0.5);
		}

		else {
			this.looserSound.play();

			this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 
				"DAMAGE \n" + this.yourName, 
				{
					align: 'center',
					fontFamily: 'myFont', 
					fontSize: 24 
				}).setOrigin(0.5);
		}

		/* Button and label are in a container to get the text centered */
		const button = new Button(this, 0, 0, 'buttons', 0, 1, 2).on('pointerup', this.onPressed, this);
		const label = this.add.text(0, 0, "RETRY",
		{
			fontFamily: 'myFont', 
			fontSize: 24
		}).setOrigin(0.5);

		this.add.container(this.cameras.main.centerX, this.cameras.main.centerY + 120, [button, label]);
	}

	/* Stop the sound if player click before the end. Retry the game keeping the player's name */
	onPressed() {
		this.WINNER ? this.winnerSound.stop() : this.looserSound.stop();
		this.clickSound.play();
		this.scene.start('GameScene', { name: this.yourName });
	}

	update() {
		this.background.tilePositionX -= .3;
	}
}
