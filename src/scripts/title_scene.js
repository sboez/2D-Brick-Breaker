import Button from './button';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('background', 'assets/Game/background.jpg');
		this.load.image('logo', 'assets/Game/logo.png');

		this.load.spritesheet('buttons', "assets/Game/buttons_spritesheet.png", { frameWidth: 115, frameHeight: 46 });

		this.load.audio('music', [ "assets/Sounds/cyberpunk_moonlight_sonata.mp3" ]);
		this.load.audio('soundMenu', [ "assets/Sounds/Menu_Navigate.mp3" ]);
	}

	create() {
		this.bgMusic = this.sound.add('music', { locked: false, loop: true });
		this.bgMusic.play();
		
		this.background = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 328, 600, 'background');

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 70, 'logo').setScale(0.12);

		/* With mobile device the game should be fullscreen */
		if (!this.sys.game.device.os.desktop) {
			this.scale.scaleMode = Phaser.Scale.ScaleModes.NONE;
			this.scale.refresh();
		}

		this.clickSound = this.sound.add('soundMenu');

		/* Sounds will be not paused when game looses focus */
		this.sound.pauseOnBlur = false;

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
		this.scene.start('LoginScene', { music: this.bgMusic });
	}

	update() {
		this.background.tilePositionX -= .3;
	}
}
