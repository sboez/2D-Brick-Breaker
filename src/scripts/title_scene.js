import Button from './button';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('logo', 'assets/Game/logo.png');
		this.load.image('trophy', 'assets/Game/trophee.png');

		this.load.spritesheet('buttons', "assets/Game/buttons_spritesheet.png", { frameWidth: 115, frameHeight: 42 });

		this.load.audio('soundMenu', [ "assets/Sounds/Menu_Navigate.mp3" ]);
	}

	create() {
		/* With mobile device the game should be fullscreen */
		if (!this.sys.game.device.os.desktop) {
			this.scale.scaleMode = Phaser.Scale.ScaleModes.NONE;
			this.scale.refresh();
		}

		this.clickSound = this.sound.add('soundMenu');

		/* Sounds will be not paused when game looses focus */
		this.sound.pauseOnBlur = false;

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 120, 'logo');
		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'trophy').setScale(.4);

		/* Button and label are in a container to get the text centered */
		const button = new Button(this, 0, 0, 'buttons', 0, 1, 2).on('pointerup', this.onPressed, this);
		const label = this.add.text(0, 0, "START",
		{
			fontFamily: 'myFont', 
			fontSize: 24
		}).setOrigin(0.5);

		this.add.container(this.cameras.main.centerX, this.cameras.main.centerY + 120, [button, label]);
	}

	onPressed() {
		this.clickSound.play();
		this.scene.start('LoginScene');
	}
}
