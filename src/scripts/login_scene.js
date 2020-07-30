import Button from './button';

export default class LoginScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoginScene' });
	}

	/* Get music from LoginScene */
	init(data) {
		this.bgMusic = data.music;
	}

	create() {
		const style = { fontFamily: 'myFont', fontSize: 24 };

		this.background = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 328, 600, 'background');

		this.clickSound = this.sound.add('soundMenu');

		this.add.text(30, this.cameras.main.centerY - 130, "Please put your name to play", style);

		this.inputText = this.add.rexInputText(this.cameras.main.centerX, this.cameras.main.centerY, 200, 40, {
			type: 'textarea',
			text: '',
			align: 'center',
			placeholder: 'name',
			fontFamily: 'myFont',
			fontSize: '22px',
			border: 1,
			borderColor: '#7A8080',
			backgroundColor: '#525656'
		})
		.selectText()
		.setBlur()
		.on('textchange', inputText => {
			this.yourName = this.inputText.text;
		});

		this.yourName = this.inputText.text;

		/* Button and label are in a container to get the text centered */
		const button = new Button(this, 0, 0, 'buttons', 0, 1, 2).on('pointerup', this.checkName, this);
		const label = this.add.text(0, 0, "OK", style).setOrigin(0.5);

		this.add.container(this.cameras.main.centerX, this.cameras.main.centerY + 120, [button, label]);
	}

	/* Can't validate the name if it's empty, contains space, is inferior to 3 or is superior to 9 characters */
	checkName() {
		this.clickSound.play();

		if (this.inputText.text === '' || this.inputText.text.length < 3 || /\s/.test(this.inputText.text))
			alert("Sorry, your name is invalid");
		else if (this.inputText.text.length > 9) alert("Sorry, your name is too big");
		else {
			this.bgMusic.stop();
			this.scene.start('GameScene', { name: this.yourName });
		}
	}
	
	update() {
		this.background.tilePositionX -= .3;
	}
}
