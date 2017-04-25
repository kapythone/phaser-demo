var KOF = KOF || {};

//title screen
KOF.MainMenu = function(){};

KOF.MainMenu.prototype = {
  init: function(score) {
    var score = score || 0;
    this.highestScore = this.highestScore || 0;

    this.highestScore = Math.max(score, this.highestScore);
   },
   
   Snow: function() {
		
	var back_emitter = this.game.add.emitter(this.game.camera.x, this.game.camera.y, 600);
    back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    back_emitter.maxParticleScale = 0.6;
    back_emitter.minParticleScale = 0.2;
    back_emitter.setYSpeed(10, 20);
    back_emitter.gravity = 0;
    back_emitter.width = this.game.world.width * 1.5;
    back_emitter.height = this.game.world.height * 1.5;
    back_emitter.minRotation = 0;
    back_emitter.maxRotation = 40;
    
    back_emitter.start(false, 16000, 5, 0);


    
	},
   
  create: function() {
  	//show the space tile, repeated
    //this.background = this.game.add.tileSprite(0, 0, this.game.cache.getImage('bg').width, this.game.cache.getImage('bg').height, 'bg');
    
	this.worldScale = 0.8;
	
	this.game.width = this.game.cache.getImage('bg_mainmenu').width * this.worldScale;
	this.game.height = this.game.cache.getImage('bg_mainmenu').height * this.worldScale;
	
    this.game.world.setBounds(0, 0, this.game.cache.getImage('bg_mainmenu').width * this.worldScale, this.game.cache.getImage('bg_mainmenu').height * this.worldScale);
	
	this.background = this.game.add.sprite(0, 0, 'bg_mainmenu');
    this.background.scale.setTo(this.worldScale);
	
	this.easy = this.game.add.sprite(this.game.camera.x  + this.game.camera.width / 2, this.game.camera.y  + this.game.camera.height / 2 + 50, 'easy');
	this.easy.anchor.set(0.5);
	this.easy.inputEnabled = true;
	this.easy.events.onInputDown.add(this.easylistener, this);
	
	this.hard = this.game.add.sprite(this.game.camera.x  + this.game.camera.width / 2, this.game.camera.y  + this.game.camera.height / 2 + 120, 'hard');
	this.hard.anchor.set(0.5);
	this.hard.inputEnabled = true;
	this.hard.events.onInputDown.add(this.hardlistener, this);
	
    //give it speed in x
    //this.background.autoScroll(-10, 0);
    
    
    //show the space tile, repeated
    //this.gametitle = this.game.add.tileSprite(this.game.width/2, this.game.height/2, 'title');
    //this.game.add.sprite(this.game.world.centerX - 240, this.game.world.centerY - 50, 'title');
    this.game.add.sprite(this.game.camera.x  + this.game.camera.width / 2 - 240, this.game.camera.y  + this.game.camera.height / 2 - 70, 'title');
    // text = "click to start";
    // style = { font: "30px Revalia", fill: "#fff", align: "center" };
  
    // var h = this.game.add.text(this.game.camera.x  + this.game.camera.width / 2, this.game.camera.y  + this.game.camera.height / 2 + 70, text);
    // h.anchor.set(0.5);
    
    this.Snow();
    
    this.bgm = this.game.add.audio('StairsOfTime');

    this.bgm.play('', 0, 1, true, true);
  },
  
  easylistener: function() {
	
	KOF.mode = 0.5;
	this.bgm.stop();
    this.game.state.start('Game');
  },
  
  hardlistener: function() {
	
	KOF.mode = 1;
	this.bgm.stop();
    this.game.state.start('Game');
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
    	// this.bgm.stop();
      // this.game.state.start('Game');
    // }
  }
};