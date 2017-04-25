var KOF = KOF || {};

WebFontConfig = {
		
		    //  'active' means all requested fonts have finished loading
		    //  We set a 1 second delay before calling 'createText'.
		    //  For some reason if we don't the browser cannot render the text the first time it's created.
		    active: function() { 
		    	
		    	/*this.game.time.events.add(Phaser.Timer.SECOND, null, this);*/ 
		    	KOF.game.state.start('MainMenu');
		    	},
		
		    //  The Google Fonts we want to load (specify as many as you like in the array)
		    google: {
		      families: ['Revalia']
		    }
		
		};


//loading the game assets
KOF.Preload = function(){};

KOF.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	//this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    //this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);
    
    
    var text = "LOADING...";
    var style = { font: "30px Arial", fill: "#000", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);


    
    //my
    
    
    this.load.image('bg_game', 'assets/images/bg.png');
	this.load.image('bg_mainmenu', 'assets/images/aaa.png');
 
    this.load.image('title', 'assets/images/title.png');
	this.load.image('easy', 'assets/images/easy.png');
	this.load.image('hard', 'assets/images/hard.png');
	
    this.load.spritesheet('snowflakes', 'assets/sprites/snowflakes.png', 17, 17);
    this.load.spritesheet('snowflakes_large', 'assets/sprites/snowflakes_large.png', 64, 64);
    
    
    this.load.atlas('arc', 'assets/sprites/p1.png', 'assets/sprites/p1.json');
    this.load.atlas('P1S1', 'assets/sprites/p1s1.png', 'assets/sprites/p1s1.json');
    this.load.atlas('P1S2', 'assets/sprites/p1s2.png', 'assets/sprites/p1s2.json');
	
    
    this.load.atlas('rie', 'assets/sprites/p2.png', 'assets/sprites/p2.json');
    this.load.atlas('P2S1', 'assets/sprites/p2s1.png', 'assets/sprites/p2s1.json');
    this.load.atlas('P2S2', 'assets/sprites/p2s2.png', 'assets/sprites/p2s2.json');
    
    
    // this.load.audio('bgm', ['assets/audio/bgm.mp3', 'assets/audio/bgm.ogg']);
	
	this.load.audio('StairsOfTime', ['assets/audio/StairsOfTime.mp3', 'assets/audio/StairsOfTime.ogg']);
	this.load.audio('Irruption', ['assets/audio/Irruption.mp3', 'assets/audio/Irruption.ogg']);
	
	
    this.load.audio('p1s1', ['assets/audio/p1s1.mp3', 'assets/audio/p1s1.ogg']);
    this.load.audio('p1s2', ['assets/audio/p1s2.mp3', 'assets/audio/p1s2.ogg']);
    this.load.audio('p2s1', ['assets/audio/p2s1.mp3', 'assets/audio/p2s1.ogg']);
    this.load.audio('p2s2', ['assets/audio/p2s2.mp3', 'assets/audio/p2s2.ogg']);
	this.load.audio('hit', ['assets/audio/hit.mp3', 'assets/audio/hit.ogg']);
	
	this.load.atlas('ufo', 'assets/sprites/ufo.png', 'assets/sprites/ufo.json');
	this.load.atlas('explosion', 'assets/sprites/explosion.png', 'assets/sprites/explosion.json');
    this.load.atlas('blood', 'assets/sprites/blood.png', 'assets/sprites/blood.json');
    
    
	
	this.load.spritesheet('bullet1', 'assets/sprites/bullet1.png');
    this.load.spritesheet('bullet2', 'assets/sprites/bullet2.png');
	//this.load.spritesheet('enemy1', 'assets/sprites/enemy1.png', 39, 45, 6);
	// this.load.atlas('enemy1', 'assets/sprites/enemy1.png', 'assets/sprites/enemy1.json');
	
	this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //my
    
  },
  create: function() {
  	//this.game.state.start('MainMenu');
  }
};
