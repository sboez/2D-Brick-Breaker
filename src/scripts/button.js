export default class Button extends Phaser.GameObjects.Sprite {
	constructor(_scene, _x, _y, _img, _upFrame, _downFrame, _overFrame) {
		super(_scene, _x, _y, _img, _upFrame);

		this.upFrame = _upFrame;
		this.downFrame = _downFrame;
		this.overFrame = _overFrame;

		this.setInteractive({ useHandCursor: true });
		this.on('pointerup', this.pointerUp, this);
		this.on('pointerdown', this.pointerDown, this);
		this.on('pointerover', this.pointerOver, this);
		this.on('pointerout', this.pointerOut, this);

		_scene.add.existing(this);
	}

	pointerUp() {
		this.setFrame(this.upFrame);
	}

	pointerDown() {
		this.setFrame(this.downFrame);
	}

	pointerOver() {
		this.setFrame(this.overFrame);
	}

	pointerOut() {
		this.setFrame(this.upFrame);
	}
}
