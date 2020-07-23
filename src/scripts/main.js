import phaser from 'phaser';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import TitleScene from './title_scene';
import LoginScene from './login_scene';
import GameScene from './game_scene';
import EndScene from './end_scene';

const config = {
	type: Phaser.AUTO,
	scale: {
		parent: 'phaser-app',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 328,
		height: 600
	},
	dom: {
        createContainer: true
    },
    plugins: {
        global: [{
            key: 'rexInputTextPlugin',
            plugin: InputTextPlugin,
            start: true
        }],
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: false
		},
	},
	scene: [
		TitleScene,
		LoginScene,
		GameScene,
		EndScene
	],
};

const game = new Phaser.Game(config);
