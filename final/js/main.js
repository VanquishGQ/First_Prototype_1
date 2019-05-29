'use strict';
// Team: Quan Gao, Bo Yang, NaiXin Lou
// Source: https://drive.google.com/file/d/1C5PZWEgVSOIt4hDRZJE1HgJHPFnuk2yS/view?usp=sharing
// Git: https://github.com/VanquishGQ/First_Prototype_1
var game = new Phaser.Game(1280, 640, Phaser.AUTO);
var message;
var style = { font: '24px Helvetica', fill: '#FFF'};
var checkPoint_x = 400;
var music;
// MainMenu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {

		// Load tmp assest
		game.load.audio('bgm', 'assets/audio/bgm.mp3');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('box', 'assets/img/Box_Small_0003.png');
		game.load.image('Big_box', 'assets/img/Box_Large_0001.png');
		game.load.image('ladder', 'assets/img/Ladder_Iron_0001.png');
		game.load.image('button', 'assets/img/Button.png');
		game.load.image('button_1', 'assets/img/Button_0004.png');
		game.load.image('trap', 'assets/img/Wall_Trap_R_0001.png');
		game.load.image('trap2', 'assets/img/Trap_Circle_0003.png');
		game.load.image('trap3', 'assets/img/Small_Circular Saw Blade_0010.png');
		game.load.image('spike', 'assets/img/Spikes_0003.png');
		game.load.image('item', 'assets/img/item.png',300, 300);
		game.load.spritesheet('hero', 'assets/img/hero.png',50 ,37);
		game.load.tilemap('test', 'assets/map/t10.json', null, Phaser.Tilemap.TILED_JSON);
		
	    game.load.image('swingTrap', 'assets/img/SwingTrap.png');
	    game.load.image('block', 'assets/img/Block.png');
	    game.load.image('rope', 'assets/img/Rope.png');
		game.load.image('wallTrap', 'assets/img/WallTrap.png');
		game.load.image('barrier', 'assets/img/block.png');
		game.load.image('circle_trap', 'assets/img/Large_Circular Saw Blade_0002.png');
	},
	create: function() {
		message = game.add.text(game.world.centerX, game.world.centerY, "Press SPACEBAR to restart game\nArrow keys to move\nHold C to push and pull boxes", style);
		message.anchor.set(0.5);
	},
	update: function() {
        // jump to game play
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false);
		}
	}
}



// GameOver state
var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {

	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false);
		}
	}
}
var z;
var z1;
var z2;
var z3;
var z4;
var z5;
var z6;
var z7;
var z8;
// GamePlay State
var GamePlay = function(game) {
	// Local varaibles
	this.player;
	this.box;
	this.box2;
	this.box3;
	this.box4;
	this.box6;
	this.groundTrap;

 
};
GamePlay.prototype = {

	init: function() {

	},

	create: function() {
		// Set up game's physics properties
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;
		// play music
		//music = new Phaser.Sound(game,'bgm',1, true);
		//music.play();
		// Set up game map and background color
		game.stage.backgroundColor = "#e0e0e0";
		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('ground', 'ground');
		this.map.setCollisionByExclusion([]); // Make map is able to collide with other objects
		this.mapLayer = this.map.createLayer('Tile Layer 1'); // Crate a map layer
		this.mapLayer.resizeWorld();

		this.player = new Player(game, 400, 963, 'hero', 0); // add player to game
		game.add.existing(this.player);

		this.ladder = new Ladder(game, 600, 650, 'ladder', 0, this.player); // add player to game
		game.add.existing(this.ladder);

		this.box = new Box(game, 980, 305, 'box', 0, this.player, this.box2); // add player to game
		game.add.existing(this.box);

		this.swingTrap = new SwingTrap(game, 800, 900, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap);

		this.swingRope = new swingRope(game, 800, 715, 'rope', 0, this.player); // add player to game
		game.add.existing(this.swingRope);


		this.groundTrap = new GroundTrap(game, 900, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap);

		this.groundTrap2 = new GroundTrap(game, 1000, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap2);
/*
		this.button = this.add.sprite(2090, 800, 'button');
		this.button.scale.setTo(0.5); // Make it smaller
		game.physics.enable(this.button, Phaser.Physics.ARCADE);
		this.button.body.gravity.y = 3000;
*/
		this.button = new Button(game, 2090, 1250, 'button', 0, this.player); // add player to game
		game.add.existing(this.button);
        z1 = this.button.y;

		this.droppingBlock = new Block(game, 2000, 400, 'block', 0, this.player); // add player to game
		game.add.existing(this.droppingBlock);

		this.droppingBlock2 = new Block(game, 2400, 600, 'block', 0, this.player); // add player to game
		game.add.existing(this.droppingBlock2);

		this.box2 = new Box(game, 2500, 450, 'box', 0, this.player,  this.box); // add player to game
		game.add.existing(this.box2);
		//this.box2.body.gravity.y = 0;

		this.groundTrap3 = new GroundTrap(game, 5000, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap3);

		this.groundTrap4 = new GroundTrap(game, 5100, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap4);

		this.groundTrap5 = new GroundTrap(game, 5200, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap5);
		
		this.groundTrap6 = new GroundTrap(game, 5300, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap6);

		this.rope = new Rope(game, 4700, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope);

		this.rope2 = new Rope(game, 4900, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope2);

		this.rope3 = new Rope(game, 5100, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope3);

		this.rope4 = new Rope(game, 5300, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope4);

		this.rope5 = new Rope(game, 4500, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope5);

		this.wallTrap = new WallTrap(game, 6000, 800, 'wallTrap', 0, this.player); // add player to game
		game.add.existing(this.wallTrap);

		this.wallTrap2 = new WallTrap(game, 8400, 800, 'wallTrap', 0, this.player); // add player to game
		game.add.existing(this.wallTrap2);
		this.wallTrap2.scale.x = -1;

		this.button3 = new Button(game, 6400, 1250, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button3);
		z2 = this.button3.y;

		this.box3 = new Box(game, 6600, 400, 'box', 0, this.player, this.box4, this.button4); // add player to game
		game.add.existing(this.box3);
		this.box3.body.gravity.y = 0;

		this.button4 = new Button(game, 7000, 1250, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button4);
		z3 = this.button4.y;

		this.box4 = new Box(game, 7200, 400, 'box', 0, this.player, this.box5); // add player to game
		game.add.existing(this.box4);
		this.box4.body.gravity.y = 0;

		this.button5 = new Button(game, 7600, 1250, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button5);
        z = this.button5.y;

		this.box5 = new Box(game, 7800, 400, 'box', 0, this.player); // add player to game
		game.add.existing(this.box5);
		this.box5.body.gravity.y = 0;

		this.swingTrap1 = new SwingTrap(game, 9650, 950, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap1);

		this.swingTrap2 = new SwingTrap(game, 10050, 950, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap2);

		this.box6 = new Box(game, 10025, 400, 'box', 0, this.player); // add player to game
		game.add.existing(this.box6);

		this.swingRope1 = new circleTrap(game, 10250, 1240, 'trap3', 0, this.player); // add player to game
		game.add.existing(this.swingRope1);

		this.ladder1 = new Ladder(game, 11100, 720, 'ladder', 0, this.player); // add player to game
		game.add.existing(this.ladder1);

		this.big_box =new Box(game,11300,0,'Big_box',0,this.player);
		game.add.existing(this.big_box);

		this.groundTrap7 = new GroundTrap(game, 11600, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap7);

		this.groundTrap8 = new GroundTrap(game, 11700, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap8);

		this.groundTrap9 = new GroundTrap(game, 11800, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap9);

		this.groundTrap10 = new GroundTrap(game, 11900, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap10);

		this.groundTrap11 = new GroundTrap(game, 12000, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap11);

		this.groundTrap12 = new GroundTrap(game, 12100, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap12);

		this.groundTrap13 = new GroundTrap(game, 12200, 640, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap13);

		this.button_L = new newButton(game, 12290, 590, 'button_1', 0, this.big_box,this.mapLayer,this.big_box); // add player to game
		game.add.existing(this.button_L);
		z4=this.button_L.x;

		this.movingTrap = new movingtrap(game, 12600, 900, 'barrier', 0, this.player, 7, 1); // add player to game
		game.add.existing(this.movingTrap);
		z5=this.movingTrap.y;

		this.circle_trap = new circleTrap(game, 12650, 1150, 'circle_trap', 0, this.player); // add player to game
		game.add.existing(this.circle_trap);

		game.camera.follow(this.player);

		this.movingTrap1 = new movingtrap(game, 13500, 1250, 'barrier', 0, this.player, 2, 0.3); // add player to game
		game.add.existing(this.movingTrap1);

		this.movingTrap2 = new movingtrap(game, 14400, 1200, 'barrier', 0, this.player, 2.5, 0.3); // add player to game
		game.add.existing(this.movingTrap2);

		this.movingTrap3 = new movingtrap(game, 15300, 1150, 'barrier', 0, this.player, 3, 0.3); // add player to game
		game.add.existing(this.movingTrap3);

		this.movingTrap4 = new movingtrap(game, 16200, 1100, 'barrier', 0, this.player, 3.5, 0.3); // add player to game
		game.add.existing(this.movingTrap4);
		
		this.movingTrap5 = new movingtrap(game, 17100, 1050, 'barrier', 0, this.player, 4.5, 0.3); // add player to game
		game.add.existing(this.movingTrap5);

		this.movingTrap6 = new movingtrap(game, 18000, 1000, 'barrier', 0, this.player, 5, 0.3); // add player to game
		game.add.existing(this.movingTrap6);

		this.button6 = new Button(game, 16750, 1250, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button6);
		z6 = this.button6.y;
		
		this.button7 = new Button(game, 17660, 1250, 'button', 0, this.player, this.mapLayer); // add player to game
		game.add.existing(this.button7);
        z7 = this.button7.y;

		this.movingTrap7 = new movingtrap(game, 19300, 450, 'barrier', 0, this.player, 4, 0.8); // add player to game
		game.add.existing(this.movingTrap7);

		this.movingTrap8 = new movingtrap(game, 19520, 450, 'barrier', 0, this.player, 4, 0.8); // add player to game
		game.add.existing(this.movingTrap8);

		this.movingTrap9 = new movingtrap(game, 19740, 450, 'barrier', 0, this.player, 4, 0.8); // add player to game
		game.add.existing(this.movingTrap9);

		this.movingTrap10 = new movingtrap(game, 19960, 450, 'barrier', 0, this.player, 4, 0.8); // add player to game
		game.add.existing(this.movingTrap10);

		this.movingTrap11 = new movingtrap(game, 20180, 450, 'barrier', 0, this.player, 4, 0.8); // add player to game
		game.add.existing(this.movingTrap11);

		this.movingTrap12 = new movingtrap(game, 20400, 450, 'barrier', 0, this.player, 4, 0.8); // add player to game
		game.add.existing(this.movingTrap12);

		this.movingTrap13 = new movingtrap(game, 22350, 1100, 'barrier', 0, this.player, 3.5, 1); // add player to game
		game.add.existing(this.movingTrap13);

		this.movingTrap14 = new movingtrap(game, 22750, 1100, 'barrier', 0, this.player, 3.5, 1); // add player to game
		game.add.existing(this.movingTrap14);

		this.movingTrap14 = new movingtrap(game, 23250, 1100, 'barrier', 0, this.player, 3.5, 1); // add player to game
		game.add.existing(this.movingTrap14);

		this.movingTrap15 = new movingtrap(game, 23750, 1100, 'barrier', 0, this.player, 3.5, 1); // add player to game
		game.add.existing(this.movingTrap15);

		this.movingTrap16 = new movingtrap(game, 24250, 1050, 'barrier', 0, this.player, 4.5, 1); // add player to game
		game.add.existing(this.movingTrap16);

		this.rope6 = new Rope(game, 24700, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope6);

		this.movingTrap17 = new movingtrap(game, 24950, 1050, 'barrier', 0, this.player, 4.5, 1); // add player to game
		game.add.existing(this.movingTrap17);

		this.rope7 = new Rope(game, 25400, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope7);

		this.rope8 = new Rope(game, 25650, 600, 'rope', 0, this.player); // add player to game
		game.add.existing(this.rope8);

		this.swingTrap3 = new SwingTrap(game, 22650, 750, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap3);

		this.movingTrap18 = new movingtrap(game, 23250, 500, 'barrier', 0, this.player, 4.5, 1); // add player to game
		game.add.existing(this.movingTrap18);

		this.groundTrap14 = new GroundTrap(game, 22606, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap14);

		this.groundTrap15 = new GroundTrap(game, 23006, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap15);

		this.groundTrap16 = new GroundTrap(game, 23120, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap16);

		this.groundTrap17 = new GroundTrap(game, 23506, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap17);

		this.groundTrap18 = new GroundTrap(game, 23616, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap18);

		this.groundTrap19 = new GroundTrap(game, 24006, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap19);

		this.groundTrap20 = new GroundTrap(game, 24116, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap20);

		this.groundTrap21 = new GroundTrap(game, 24506, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap21);

		this.groundTrap22 = new GroundTrap(game, 24616, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap22);

		this.groundTrap23 = new GroundTrap(game, 24726, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap23);

		this.groundTrap24 = new GroundTrap(game, 24836, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap24);

		this.groundTrap25 = new GroundTrap(game, 25206, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap25);

		this.groundTrap26 = new GroundTrap(game, 25316, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap26);

		this.groundTrap27 = new GroundTrap(game, 25426, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap27);

		this.groundTrap28 = new GroundTrap(game, 25526, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap28);

		this.groundTrap29 = new GroundTrap(game, 25626, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap29);

		this.groundTrap30 = new GroundTrap(game, 25736, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap30);

		this.groundTrap31 = new GroundTrap(game, 25846, 1190, 'spike', 0, this.player); // add player to game
		game.add.existing(this.groundTrap31);

		this.swingTrap4 = new SwingTrap(game, 26560, 530, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap4);

		this.swingTrap5 = new SwingTrap(game, 27220, 530, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap5);

		this.swingTrap6 = new SwingTrap(game, 27840, 530, 'trap2', 0, this.player); // add player to game
		game.add.existing(this.swingTrap6);

		this.wallTrap3 = new WallTrap(game, 25953, 550, 'wallTrap', 0, this.player); // add player to game
		game.add.existing(this.wallTrap3);

		this.wallTrap4 = new WallTrap(game, 28455, 550, 'wallTrap', 0, this.player); // add player to game
		game.add.existing(this.wallTrap4);
		this.wallTrap4.scale.x = -1;

	},


	update: function() {
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box, this.mapLayer);
		game.physics.arcade.collide(this.box3, this.mapLayer);
		game.physics.arcade.collide(this.box4, this.mapLayer);
		game.physics.arcade.collide(this.box5, this.mapLayer);
		game.physics.arcade.collide(this.box6, this.mapLayer);
		game.physics.arcade.collide(this.button, this.mapLayer);
		game.physics.arcade.collide(this.droppingBlock, this.mapLayer);
		//game.physics.arcade.collide(this.droppingBlock, this.player);
		game.physics.arcade.collide(this.droppingBlock2, this.mapLayer);
		game.physics.arcade.collide(this.player, this.box2);
		game.physics.arcade.collide(this.player, this.box);
		//game.physics.arcade.collide(this.player, this.box2);
		game.physics.arcade.collide(this.droppingBlock2, this.box2);
		game.physics.arcade.collide(this.droppingBlock, this.box2);
		game.physics.arcade.collide(this.mapLayer, this.box2);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap2);
		game.physics.arcade.collide(this.box, this.droppingBlock);
		game.physics.arcade.collide(this.box, this.box2);
		game.physics.arcade.collide(this.box, this.box2);
		game.physics.arcade.collide(this.box3, this.box4);
		game.physics.arcade.collide(this.box4, this.box5);
		game.physics.arcade.collide(this.box5, this.box3);

		game.physics.arcade.collide(this.box5, this.box3);

		game.physics.arcade.collide(this.wallTrap, this.box3);
		game.physics.arcade.collide(this.wallTrap2, this.box3);
		game.physics.arcade.collide(this.big_box, this.mapLayer);
		game.physics.arcade.collide(this.big_box, this.button_L);
		game.physics.arcade.collide(this.big_box, this.groundTrap7, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap8, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap9, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap10, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap11, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap12, this.collideSpike);
		game.physics.arcade.collide(this.big_box, this.groundTrap13, this.collideSpike);
		game.physics.arcade.collide(this.movingTrap, this.mapLayer);
		//var movingTrap_hit=game.physics.arcade.collide(this.movingTrap7, this.mapLayer);
		game.physics.arcade.collide(this.movingTrap8, this.mapLayer);
		game.physics.arcade.collide(this.movingTrap9, this.mapLayer);
		game.physics.arcade.collide(this.movingTrap10, this.mapLayer);
		game.physics.arcade.collide(this.movingTrap11, this.mapLayer);
		game.physics.arcade.collide(this.movingTrap12, this.mapLayer);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap3);
		game.physics.arcade.collide(this.mapLayer, this.wallTrap4);


		if (this.button.hit) {
			this.droppingBlock.body.velocity.y = 900;
			this.droppingBlock2.body.velocity.y = 750;
			this.box2.body.gravity.y = 1000;
			//this.box2.body.immovable = true;
			//this.droppingBlock2.body.immovable = true;

			this.button.y =z1+15;
		}
		//z8=1118;

		if (this.button3.hit) {
			this.box3.body.gravity.y = 1000;
			this.button3.y =z2+15;
		}

		if (this.button4.hit) {
			this.box4.body.gravity.y = 1000;
			//this.button4.y =this.button4.y+30;
			this.button4.y =z3+15;
		}

		if (this.button5.hit) {
			this.box5.body.gravity.y = 1000;
			this.button5.y =z+15;
			//this.button5.body.immovable = true;

		}

		if (this.button_L.hit1) {
			//this.box5.body.gravity.y = 1000;
			this.button_L.x=z4+6;
		}

		if(this.button_L.hit2) {
			this.movingTrap.y=z5+200;
		}

		if(this.box3.hit_box){
		//	this.button3.kill();
			this.button4.kill();
		}

		if(checkOverlap(this.box3,this.box4)){
			if(this.box3.body.velocity.x==0){
				this.box4.body.velocity.x=0;
			}else{
				this.box4.body.velocity.x=this.box3.body.velocity.x+10;
			}
		}

		if(checkOverlap1(this.box5,this.box4)){
			if(this.box4.body.velocity.x==0){
				this.box5.body.velocity.x=0;
			}else{
				this.box5.body.velocity.x=this.box4.body.velocity.x+10;
			}
		}

		if(checkOverlap2(this.box5,this.box3)){
			if(this.box3.body.velocity.x==0){
				this.box5.body.velocity.x=0;
			}else{
				this.box5.body.velocity.x=this.box3.body.velocity.x+10;
			}
		}

		if (this.player.body.x >= 6100 && this.player.body.x <= 8400 && this.player.body.y <= 1300) {
			this.wallTrap2.body.moves = true;
			this.wallTrap.body.moves = true;
			this.wallTrap.body.velocity.x = 50;
			this.wallTrap2.body.velocity.x = -50;
		} else {
			this.wallTrap2.body.moves = false;
			this.wallTrap.body.moves = false;
		}

		if (this.player.body.x >= 13000 && this.player.body.x <= 18076) {
			this.circle_trap.body.moves = true;
			//this.wallTrap.body.moves = true;
			this.circle_trap.body.velocity.x = 280;
			//this.wallTrap2.body.velocity.x = -50;
		} else {
			this.circle_trap.body.moves = false;
			//this.wallTrap.body.moves = false;
		}

		if (this.button6.hit) {
			//this.box5.body.gravity.y = 1000;
			this.button6.y =z6+15;
			//this.button5.body.immovable = true;

		}

		if (this.button7.hit) {
			//this.box5.body.gravity.y = 1000;
			this.button7.y =z7+15;
			//this.button5.body.immovable = true;

		}

		if (this.player.body.x >= 26070 && this.player.body.x <= 28350) {
			this.wallTrap3.body.moves = true;
			this.wallTrap4.body.moves = true;
			this.wallTrap3.body.velocity.x = 50;
			this.wallTrap4.body.velocity.x = -50;
		} else {
			this.wallTrap4.body.moves = false;
			this.wallTrap3.body.moves = false;
		}

		/*if (this.player.body.x >= 19000 ) {
			this.movingTrap7.body.moves = true;
			//this.wallTrap.body.moves = true;
			
			if(movingTrap_hit){
				this.movingTrap7.body.velocity.y = -200;
			}else{
				this.movingTrap7.body.velocity.y = 200;
			}
			//this.wallTrap2.body.velocity.x = -50;
		} else {
			//this.circle_trap.body.moves = false;
			//this.wallTrap.body.moves = false;
		}*/





		function checkOverlap(box3,box4){
			var bound1=box3.getBounds();
			var bound2=box4.getBounds();
			return Phaser.Rectangle.intersects(bound1, bound2);
		}

		function checkOverlap1(box5,box4){
			var bound1=box5.getBounds();
			var bound2=box4.getBounds();
			return Phaser.Rectangle.intersects(bound1, bound2);
		}

		function checkOverlap2(box5,box3){
			var bound1=box5.getBounds();
			var bound2=box3.getBounds();
			return Phaser.Rectangle.intersects(bound1, bound2);
		}

		/*function checkOverlap3(box2,player){
			var bound1=box2.getBounds();
			var bound2=player.getBounds();
			return Phaser.Rectangle.intersects(bound1, bound2);
		}*/

		


	},

	

	checkCollide: function(){

		console.log("Box is colliding");
	},

	// debug
	render: function() {
		game.debug.bodyInfo(this.player, 32, 32);
		game.debug.body(this.player);
		game.debug.body(this.swingTrap);
		game.debug.body(this.groundTrap);
		game.debug.body(this.droppingBlock2);
		game.debug.body(this.button_L);
		game.debug.body(this.rope);
		game.debug.body(this.box2);
		game.debug.body(this.circle_trap);
		game.debug.body(this.wallTrap4);

		game.debug.bodyInfo(this.box2, 32, 128);
	},

	collideSpike: function(big_box, groundTrap) {
		groundTrap.kill();
	}

}

// add states
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
// start game at main menu state
game.state.start('MainMenu');
