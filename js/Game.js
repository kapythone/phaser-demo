var KOF = KOF || {};

Enemy = function (index, game, players, bullets) {

    var x = game.world.randomX;
	if (x <= 500) {
		x = 500;
	}
	
    var y = game.world.randomY;

    this.game = game;
    this.health = 4 * KOF.mode;
    this.players = players;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    
    this.sprite = game.add.sprite(x, y, 'ufo', 'frame16');
    this.sprite.scale.setTo(2);
    
	
	
    this.sprite.anchor.set(0.5);
	
    this.sprite.name = index.toString();
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 0);
	
	this.sprite.body.gravity.y = 900;
	
	this.sprite.animations.add('walk', ['frame16', 'frame17', 'frame18', 'frame19', 'frame20', 'frame21', 'frame22', 'frame23', 'frame24', 'frame25', 'frame26', 'frame27', 'frame28', 'frame29', 'frame30', 'frame31']);
	
	
	
	this.sprite.animations.add('die', ['frame68', 'frame69', 'frame70', 'frame71', 'frame72', 'frame73', 'frame74', 'frame75', 'frame76', 'frame77', 'frame78', 'frame79', 'frame80', 'frame81', 'frame82', 'frame83', 'frame84', 'frame85', 'frame86', 'frame87', 'frame88', 'frame89', 'frame90', 'frame91']);
	//this.sprite.animations.play('die', 10, false)
	this.sprite.animations.getAnimation('die').onComplete.add(this.DisposeEffects, game);
	
	
	this.sprite.animations.play('walk', 10, true);
	//this.sprite.angle = game.rnd.angle();

    //game.physics.arcade.velocityFromRotation(this.sprite.rotation, 100, this.sprite.body.velocity);

};

Enemy.prototype.DisposeEffects = function (sprite, animation) {

	sprite.exists = false;

};

Enemy.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;

		
		this.sprite.animations.play('die', 10, false)
		
        //this.sprite.kill();


        return true;
    }

    return false;

};

Enemy.prototype.damage2 = function() {

    this.health -= 0.5;

    if (this.health <= 0)
    {
        this.alive = false;


		
		this.sprite.animations.play('die', 10, false)
        //this.sprite.kill();

        return true;
    }

    return false;

};

Enemy.prototype.update = function() {

    // this.shadow.x = this.tank.x;
    // this.shadow.y = this.tank.y;
    // this.shadow.rotation = this.tank.rotation;

    // this.turret.x = this.tank.x;
    // this.turret.y = this.tank.y;
    // this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);

	var target = -1;
	var d = 1000;
	
	for (var i = 0; i < this.players.length; i++)
    {
		
		if (this.game.physics.arcade.distanceBetween(this.sprite, this.players[i]) < 500)
		{
			if (d > this.game.physics.arcade.distanceBetween(this.sprite, this.players[i])) {
				d = this.game.physics.arcade.distanceBetween(this.sprite, this.players[i])
				target = i;
			}
			
		}
    }
	
	if (target >= 0 && this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
	{
		this.nextFire = this.game.time.now + this.fireRate;

		var bullet = this.bullets.getFirstDead();

		bullet.reset(this.sprite.x, this.sprite.y);

		bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.players[target], 500 * KOF.mode);
	}
	
	
    // if (this.game.physics.arcade.distanceBetween(this.sprite, this.player) < 300)
    // {
        // if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        // {
            // this.nextFire = this.game.time.now + this.fireRate;

            // var bullet = this.bullets.getFirstDead();

            // bullet.reset(this.sprite.x, this.sprite.y);

            // bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
        // }
    // }

};



//title screen
KOF.Game = function(){};



KOF.Game.prototype = {
	
	//generate snowing effects
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
  	
  	
  	
    
    
    // Add a input listener that can help us return from being paused
    this.game.input.onDown.add(restart, self);

    // And finally the method that handels the pause menu
    function restart(event){
        // Only act if paused
        if(KOF.game.paused){
            KOF.game.paused = false;
            
            KOF.game.state.start('MainMenu');
        }
    };
    
    

  	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	
  	//set world and game dimensions
	
	this.worldScale = 2;
	
	this.game.width = this.game.cache.getImage('bg_game').width * this.worldScale;
	this.game.height = this.game.cache.getImage('bg_game').height * this.worldScale;
	
    this.game.world.setBounds(0, 0, this.game.cache.getImage('bg_game').width * this.worldScale, this.game.cache.getImage('bg_game').height * this.worldScale);
	
	this.background = this.game.add.sprite(0, 0, 'bg_game');
    this.background.scale.setTo(this.worldScale);
	
	this.game.physics.arcade.setBounds(0, 0, this.game.world.width, this.game.world.height - 40);
	//return;
		//initialize the players
    this.InitPlayers();


	this.Snow();

    //show relevant information
    this.showLabels();

		//play background music
	this.bgm = this.game.add.audio('Irruption');
    this.bgm.play('', 0, 1, true, true);
	


    this.P1.audio = function() {};
    this.P1.audio.p1s1 = this.game.add.audio('p1s1');
    this.P1.audio.p1s2 = this.game.add.audio('p1s2');

    
    this.P2.audio = function() {};
    this.P2.audio.p2s1 = this.game.add.audio('p2s1');
    this.P2.audio.p2s2 = this.game.add.audio('p2s2');

	
	this.hit = this.game.add.audio('hit');
    
    
  },

	ResumeStand: function (sprite, animation) {

		sprite.animations.play('stand');

	},
	
	DisposeEffects: function (sprite, animation) {

		sprite.exists = false;

	},
	
	GenerateEffects: function (sprite, animation) {

		sprite.exists = true;

	},

  InitPlayers: function() {
      
    //each group contains the sprite and effects related to that sprite
    this.P1 = this.game.add.group();
    this.P2 = this.game.add.group();
    this.P1.enableBody = true;
    this.P2.enableBody = true;
    this.P1.physicsBodyType = Phaser.Physics.ARCADE;
    this.P2.physicsBodyType = Phaser.Physics.ARCADE;
    
    this.game.physics.arcade.enable([this.P1, this.P2]);
	
	this.P1.sprite = this.P1.create(0, 0, 'arc', 'arc0000');
    this.P1.sprite.scale.setTo(1);
	
    this.P1.sprite.anchor.setTo(0.5, 0.5);
    this.P1.sprite.animations.add('stand', ['arc0000', 'arc0001', 'arc0002', 'arc0003', 'arc0004', 'arc0005', 'arc0006', 'arc0007', 'arc0008', 'arc0009', 'arc0010', 'arc0011', 'arc0012', 'arc0013', 'arc0014', 'arc0015', 'arc0016', 'arc0017', 'arc0018', 'arc0019', 'arc0020', 'arc0021', 'arc0022', 'arc0023'], 10, true);
    this.P1.sprite.animations.add('walk_forward', ['arc2602', 'arc2603', 'arc2604', 'arc2605', 'arc2606', 'arc2607', 'arc2608', 'arc2609', 'arc2610', 'arc2611'], 10, false);
    this.P1.sprite.animations.add('walk_backward', ['arc2700', 'arc2701', 'arc2702', 'arc2703', 'arc2704', 'arc2705', 'arc2706', 'arc2707', 'arc2708', 'arc2709', 'arc2710', 'arc2711'], 10, false);
    this.P1.sprite.animations.add('attack', ['arc0300', 'arc0301', 'arc0302', 'arc0303', 'arc0304', 'arc0305', 'arc0306', 'arc0307', 'arc0308', 'arc0309', 'arc0310', 'arc0311', 'arc0312', 'arc0313', 'arc0314', 'arc0315'], 16, false);
    this.P1.sprite.animations.add('jump_up', ['arc1701', 'arc1702', 'arc1703', 'arc1704', 'arc1705', 'arc1706', 'arc1707', 'arc1708', 'arc1709', 'arc1710', 'arc1711', 'arc1712', 'arc1713', 'arc1714', 'arc1715', 'arc1716', 'arc1717', 'arc1718', 'arc1719', 'arc1720', 'arc1721', 'arc1722', 'arc1723', 'arc1724', 'arc1725', 'arc1726', 'arc1727'], 15, false);
    this.P1.sprite.animations.add('jump_forward', ['arc1501', 'arc1502', 'arc1503', 'arc1504', 'arc1505', 'arc1506', 'arc1507', 'arc1508', 'arc1509', 'arc1510', 'arc1511', 'arc1512', 'arc1513', 'arc1514', 'arc1515', 'arc1516', 'arc1517', 'arc1518', 'arc1519', 'arc1520', 'arc1521', 'arc1522', 'arc1523', 'arc1524', 'arc1525', 'arc1526'], 15, false);
    this.P1.sprite.animations.add('jump_backward', ['arc1601', 'arc1602', 'arc1603', 'arc1604', 'arc1605', 'arc1606', 'arc1607', 'arc1608', 'arc1609', 'arc1610', 'arc1611', 'arc1612', 'arc1613', 'arc1614', 'arc1615', 'arc1616', 'arc1617', 'arc1618', 'arc1619', 'arc1620', 'arc1621', 'arc1622', 'arc1623', 'arc1624', 'arc1625'], 15, false);
    this.P1.sprite.animations.add('crouch', ['arc2830', 'arc2831', 'arc2832', 'arc2833', 'arc2834', 'arc2835', 'arc2836', 'arc2837', 'arc2838', 'arc2839', 'arc2840', 'arc2841'], 10, true);
    
	
	
    this.P1.sprite.animations.getAnimation('attack').onComplete.add(this.ResumeStand, this);
    this.P1.sprite.animations.getAnimation('jump_up').onComplete.add(this.ResumeStand, this);
    this.P1.sprite.animations.getAnimation('jump_forward').onComplete.add(this.ResumeStand, this);
    this.P1.sprite.animations.getAnimation('jump_backward').onComplete.add(this.ResumeStand, this);

    
    
    
    this.P1.sprite.animations.play('stand');
    
    
    this.P2.sprite = this.P1.create(0, 0, 'rie', 'rie0000');
    this.P2.sprite.scale.setTo(1);
    this.P2.sprite.anchor.setTo(0.5, 0.5);
    //this.P2.sprite.scale.x *= -1;
    this.P2.sprite.animations.add('stand', ['rie0000', 'rie0001', 'rie0002', 'rie0003', 'rie0004', 'rie0005', 'rie0006', 'rie0007', 'rie0008', 'rie0009', 'rie0010', 'rie0011', 'rie0012', 'rie0013', 'rie0014', 'rie0015', 'rie0016', 'rie0017', 'rie0018', 'rie0019', 'rie0020', 'rie0021', 'rie0022', 'rie0023', 'rie0024', 'rie0025', 'rie0026', 'rie0027', 'rie0028', 'rie0029', 'rie0030', 'rie0031'], 10, true);
    this.P2.sprite.animations.add('walk_forward', ['rie2600', 'rie2601', 'rie2602', 'rie2603', 'rie2604', 'rie2605', 'rie2606', 'rie2607', 'rie2608', 'rie2609', 'rie2610', 'rie2611', 'rie2612', 'rie2613', 'rie2614', 'rie2615'], 10, false);
    this.P2.sprite.animations.add('walk_backward', ['rie2700', 'rie2701', 'rie2702', 'rie2703', 'rie2704', 'rie2705', 'rie2706', 'rie2707', 'rie2708', 'rie2709', 'rie2710', 'rie2711', 'rie2712', 'rie2713', 'rie2714', 'rie2715', 'rie2716'], 10, false);

    
    this.P2.sprite.animations.add('attack', ['rie5100', 'rie5101', 'rie5102', 'rie5103', 'rie5104', 'rie5105', 'rie5106', 'rie5107', 'rie5108', 'rie5109', 'rie5110', 'rie5111', 'rie5112'], 15, false);
    this.P2.sprite.animations.add('jump_up', ['rie1700', 'rie1701', 'rie1702', 'rie1703', 'rie1704', 'rie1705', 'rie1706', 'rie1707', 'rie1708', 'rie1709', 'rie1710', 'rie1711', 'rie1712', 'rie1713', 'rie1714', 'rie1715', 'rie1716', 'rie1717', 'rie1718', 'rie1719', 'rie1720', 'rie1721', 'rie1722'], 13, false);
    this.P2.sprite.animations.add('jump_forward', ['rie1500', 'rie1501', 'rie1502', 'rie1503', 'rie1504', 'rie1505', 'rie1506', 'rie1507', 'rie1508', 'rie1509', 'rie1510', 'rie1511', 'rie1512', 'rie1513', 'rie1514', 'rie1515', 'rie1516', 'rie1517', 'rie1518', 'rie1519', 'rie1520', 'rie1521', 'rie1522'], 13, false);
    this.P2.sprite.animations.add('jump_backward', ['rie1600', 'rie1601', 'rie1602', 'rie1603', 'rie1604', 'rie1605', 'rie1606', 'rie1607', 'rie1608', 'rie1609', 'rie1610', 'rie1611', 'rie1612', 'rie1613', 'rie1614', 'rie1615', 'rie1616', 'rie1617', 'rie1618', 'rie1619', 'rie1620', 'rie1621', 'rie1622', 'rie1623', 'rie1624'], 13, false);
    //this.P2.sprite.animations.add('crouch', ['rie3000', 'rie3001', 'rie3002'], 10, true);
	this.P2.sprite.animations.add('crouch', ['rie3002'], 10, true);
    
    this.P2.sprite.animations.getAnimation('attack').onComplete.add(this.ResumeStand, this);
    this.P2.sprite.animations.getAnimation('jump_up').onComplete.add(this.ResumeStand, this);
    this.P2.sprite.animations.getAnimation('jump_forward').onComplete.add(this.ResumeStand, this);
    this.P2.sprite.animations.getAnimation('jump_backward').onComplete.add(this.ResumeStand, this);

    
    this.P2.sprite.animations.play('stand');
    
    this.P1.keys = function(){};
    this.P1.keys.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.P1.keys.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.P1.keys.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.P1.keys.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.P1.keys.S1 = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
    this.P1.keys.S2 = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
    
    this.P2.keys = function(){};
    this.P2.keys.W = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.P2.keys.S = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.P2.keys.A = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.P2.keys.D = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.P2.keys.S1 = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.P2.keys.S2 = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
    
    
    
    this.P1.sprite.body.collideWorldBounds = true;
    this.P1.sprite.body.setSize(50, 105, 0, 36);
    this.P1.sprite.body.bounce.setTo(1, 0);
    this.P1.sprite.body.facing = 0;
    this.P1.sprite.body.gravity.y = 900;
    
    this.P1.sprite.status = "up";
    this.P1.sprite.HP = 10 * (1/KOF.mode);
    this.P1.sprite.AP = 0;
    
    this.P2.sprite.body.collideWorldBounds = true;
    this.P2.sprite.body.setSize(50, 105, 0, 36);
    this.P2.sprite.body.bounce.setTo(1, 0);
    this.P2.sprite.body.facing = 1;
    this.P2.sprite.body.gravity.y = 900;
    
    this.P2.sprite.status = "normal";
    this.P2.sprite.HP = 10 * (1/KOF.mode);
    this.P2.sprite.AP = 0;
    

	this.P1.jumpTimer = 0;
	this.P2.jumpTimer = 0;


	this.P1.S1 = this.P1.create(this.P1.sprite.body.x, this.P1.sprite.body.y, 'P1S1', 'arc0340');
	this.P1.S1.scale.setTo(1);
    this.P1.S1.anchor.setTo(0.5, 0.5);
    this.P1.S1.body.setSize(120, 60, 0, 10);
    this.P1.S1.animations.add('go', ['arc0340', 'arc0341', 'arc0342', 'arc0342', 'arc0343', 'arc0344', 'arc0345', 'arc0346', 'arc0347', 'arc0348', 'arc0348', 'arc0349', 'arc0350'], 15, false);
    this.P1.S1.exists = false;
    this.P1.S1.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
    this.P1.S1.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
    this.P1.S1.timer = 0;
    
    
    this.P1.S2 = this.P1.create(this.P1.sprite.body.x, this.P1.sprite.body.y, 'P1S2', 'arc6200');
	this.P1.S2.scale.setTo(1);
    this.P1.S2.anchor.setTo(0.5, 0.5);
    this.P1.S2.body.setSize(240, 240, 0, 0);
    this.P1.S2.animations.add('go', ['arc6200', 'arc6201', 'arc6202', 'arc6203', 'arc6204', 'arc6205', 'arc6206', 'arc6207', 'arc6208', 'arc6209', 'arc6210', 'arc6211', 'arc6212', 'arc6213', 'arc6214', 'arc6215', 'arc6216', 'arc6217', 'arc6218', 'arc6219', 'arc6220', 'arc6221'], 15, false);
    this.P1.S2.exists = false;
    this.P1.S2.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
    this.P1.S2.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
    this.P1.S2.timer = 0;
    
    
    this.P2.S1 = this.P2.create(this.P2.sprite.body.x, this.P2.sprite.body.y, 'P2S1', 'rie5150');
	this.P2.S1.scale.setTo(1);
    this.P2.S1.anchor.setTo(0.5, 0.5);
    this.P2.S1.body.setSize(120, 60, -90, 10);
    this.P2.S1.animations.add('go', ['rie5150', 'rie5151', 'rie5152', 'rie5153', 'rie5154', 'rie5155', 'rie5156', 'rie5157'], 8, false);
    this.P2.S1.exists = false;
    this.P2.S1.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
    this.P2.S1.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
    this.P2.S1.timer = 0;
    
    
    this.P2.S2 = this.P2.create(this.P2.sprite.body.x, this.P2.sprite.body.y, 'P2S2', 'rie61_400');
	this.P2.S2.scale.setTo(1);
    this.P2.S2.anchor.setTo(0.5, 0.5);
    //this.P2.S2.body.setSize(240, 200, 80, 0);
    this.P2.S2.body.setSize(240, 200, -80, 0);
    this.P2.S2.animations.add('go', ['rie61_400', 'rie61_401', 'rie61_402', 'rie61_403', 'rie61_404', 'rie61_405', 'rie61_406', 'rie61_407', 'rie61_408', 'rie61_409', 'rie61_410', 'rie61_411', 'rie61_412', 'rie61_413', 'rie61_414', 'rie61_415', 'rie61_416', 'rie61_417', 'rie61_418', 'rie61_419', 'rie61_420', 'rie61_421'], 15, false);
    this.P2.S2.exists = false;
    this.P2.S2.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
    this.P2.S2.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
    this.P2.S2.timer = 0;
    


    //the camera will follow the player in the world
    
    //this.game.camera.follow(this.P1.sprite);

	
	//  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet1', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	

	this.fireRate = 500;
	this.nextFire = 0;
	
	
	
	//  The enemies bullet group
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(100, 'bullet2');
    
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
	
	
	
	this.firedBullets = [];
	
	// enemy1 = this.game.add.sprite(100, 100, 'enemy1', 1);
    // enemy1.scale.set(4);
	
	this.enemies = [];
	this.enemiesTotal = 30;
	this.enemiesAlive = 30;
	
	for (var i = 0; i < this.enemiesTotal; i++)
    {
        this.enemies.push(new Enemy(i, this.game, [this.P1.sprite, this.P2.sprite], this.enemyBullets));
    }
	
	
  },


	bulletHitEnemy: function(enemy, bullet) {

		bullet.kill();
		this.hit.play();

		var destroyed = this.enemies[enemy.name].damage();

		if (destroyed)
		{
			// var explosionAnimation = explosions.getFirstExists(false);
			// explosionAnimation.reset(tank.x, tank.y);
			// explosionAnimation.play('kaboom', 30, false, true);
		}

		explosion = this.game.add.sprite(enemy.body.x, enemy.body.y + 20, 'blood', 'frame8');
		explosion.scale.setTo(2);
		explosion.anchor.setTo(0.5, 0.5);
		//this.P2.S2.body.setSize(240, 200, 80, 0);
		explosion.animations.add('go', ['frame8', 'frame9', 'frame10', 'frame11', 'frame12', 'frame13', 'frame14'], 15, false);
		
		explosion.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
		explosion.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
		explosion.animations.play('go');
		
	},
	
	bulletHitEnemy2: function(enemy, bullet) {

		//bullet.kill();

		var destroyed = this.enemies[enemy.name].damage2();

		if (destroyed)
		{
			// var explosionAnimation = explosions.getFirstExists(false);
			// explosionAnimation.reset(tank.x, tank.y);
			// explosionAnimation.play('kaboom', 30, false, true);
		}
		
		explosion = this.game.add.sprite(enemy.body.x, enemy.body.y + 20, 'blood', 'frame8');
		explosion.scale.setTo(2);
		explosion.anchor.setTo(0.5, 0.5);
		//this.P2.S2.body.setSize(240, 200, 80, 0);
		explosion.animations.add('go', ['frame8', 'frame9', 'frame10', 'frame11', 'frame12', 'frame13', 'frame14'], 15, false);
		
		explosion.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
		explosion.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
		explosion.animations.play('go');

	},
  
  bulletHitPlayer: function(player, bullet) {
  
	bullet.kill();

    player.HP -= 1;
	
	
	explosion = this.game.add.sprite(player.body.x, player.body.y + 20, 'explosion', 'frame397');
	explosion.scale.setTo(2);
    explosion.anchor.setTo(0.5, 0.5);
    //this.P2.S2.body.setSize(240, 200, 80, 0);
    explosion.animations.add('go', ['frame397', 'frame398', 'frame399', 'frame400', 'frame401', 'frame402', 'frame403', 'frame404', 'frame405', 'frame406', 'frame407', 'frame408', 'frame409', 'frame410', 'frame411', 'frame412', 'frame413', 'frame414', 'frame415', 'frame416', 'frame417', 'frame418', 'frame419', 'frame420', 'frame421', 'frame422', 'frame423', 'frame424', 'frame425', 'frame426', 'frame427', 'frame428', 'frame429', 'frame430', 'frame431'], 15, false);
    
	explosion.animations.getAnimation('go').onStart.add(this.GenerateEffects, this);
    explosion.animations.getAnimation('go').onComplete.add(this.DisposeEffects, this);
    explosion.animations.play('go');
  
  },
  
  update: function() {
    
	this.game.physics.arcade.overlap(this.enemyBullets, this.P1.sprite, this.bulletHitPlayer, null, this);
	this.game.physics.arcade.overlap(this.enemyBullets, this.P2.sprite, this.bulletHitPlayer, null, this);

	
    this.enemiesAlive = 0;

    for (var i = 0; i < this.enemies.length; i++)
    {
        if (this.enemies[i].alive)
        {
            this.enemiesAlive++;
            // this.game.physics.arcade.collide(this.P1.sprite, this.enemies[i].sprite);
            // this.game.physics.arcade.overlap(this.bullets, this.enemies[i].sprite, this.bulletHitEnemy, null, this);
            this.game.physics.arcade.overlap(this.enemies[i].sprite, this.bullets, this.bulletHitEnemy, null, this);
            
			this.game.physics.arcade.overlap(this.enemies[i].sprite, this.P1.S2, this.bulletHitEnemy2, null, this);
			this.game.physics.arcade.overlap(this.enemies[i].sprite, this.P2.S2, this.bulletHitEnemy2, null, this);
			
			this.enemies[i].update();
        }
    }
	
	
    
    this.updateHp();
    
    //  Reset the player, then check for movement keys
    //this.P1.sprite.body.velocity.setTo(0);
    //this.P2.sprite.body.velocity.setTo(0);
    
    this.P1.sprite.body.velocity.x = 0;
    this.P2.sprite.body.velocity.x = 0;
	
	
    
    
    //adjust the skill sprite position according to the players' positions
    this.P1.S1.body.x = this.P1.sprite.body.center.x - 60;
	this.P1.S1.body.y = this.P1.sprite.body.center.y - 55;
	this.P1.S2.body.x = this.P1.sprite.body.center.x - 120;
	this.P1.S2.body.y = this.P1.sprite.body.center.y - 180;
	
	
	this.P2.S1.body.x = this.P2.sprite.body.center.x - 60;
	this.P2.S1.body.y = this.P2.sprite.body.center.y - 55;
	this.P2.S2.body.x = this.P2.sprite.body.center.x - 120;
	this.P2.S2.body.y = this.P2.sprite.body.center.y - 150;
    

		//adjust the animations according to the players' relative positions
	/*
	if (this.P1.sprite.body.center.x > this.P2.sprite.body.center.x) {
		this.P1.sprite.body.facing = 1;
		this.P2.sprite.body.facing = 0;
		
		this.P1.sprite.scale.x = -1;
		this.P2.sprite.scale.x = 1;
		
	}
	else {
		this.P1.sprite.body.facing = 0;
		this.P2.sprite.body.facing = 1;
		
		this.P1.sprite.scale.x = 1;
		this.P2.sprite.scale.x = -1;
		
	}*/

    if (this.P1.sprite.scale.x < 0) {
			
			this.P1.S1.scale.x = -1;
			this.P1.S2.scale.x = -1;
			this.P1.S1.body.setSize(120, 60, 0, 10);
			this.P1.S2.body.setSize(240, 240, 0, 0);
			}
			else {

			this.P1.S1.scale.x = 1;
			this.P1.S2.scale.x = 1;
			this.P1.S1.body.setSize(120, 60, 0, 10);
			this.P1.S2.body.setSize(240, 240, 0, 0);
			}
			if (this.P2.sprite.scale.x > 0) {

			this.P2.S1.scale.x = 1;
			this.P2.S2.scale.x = 1;
			
			this.P2.S1.body.setSize(120, 60, 80, 10);
			this.P2.S2.body.setSize(240, 200, -80, -10);
			}
			else {

			this.P2.S1.scale.x = -1;
			this.P2.S2.scale.x = -1;
			
			this.P2.S1.body.setSize(120, 60, -90, 10);
			this.P2.S2.body.setSize(240, 200, 80, -10);
			}
    
    //dispatch input keys for P1
	if (this.P1.sprite.exists) {
		//if (this.P1.keys.S1.isDown  && this.game.time.now > this.P1.S1.timer)
		if (this.P1.keys.S1.isDown)
			{
					this.P1.S1.timer = this.game.time.now + 1050;
					
					//this.P1.sprite.status = "attack"; 
					
					this.P1.sprite.animations.play('attack');
					
					this.P1.S1.animations.play('go');
					this.P1.audio.p1s1.play();
					
					this.fire(this.P1.sprite);
					
			}
			//else if (this.P1.keys.S2.isDown  && this.game.time.now > this.P1.S2.timer)
			else if (this.P1.keys.S2.isDown)
			{
					//this.P1.S2.timer = this.game.time.now + 450;
					this.P1.S2.timer = this.game.time.now + 1050;
					
					//this.P1.sprite.status = "attack"; 
					

					this.P1.S2.animations.play('go');
					this.P1.audio.p1s2.play();
					
			}
		else 
		{
			  //this.P1.sprite.status = "normal";
					if (this.P1.keys.S.isDown)
					{
					}
					else if (this.P1.keys.D.isDown && !this.P1.S1.exists)
					{
						this.P1.sprite.scale.x = 1;
						this.P1.sprite.body.velocity.x = 200;
						if (!this.game.camera.view.contains(this.P1.sprite.body.center.x + 20, this.P1.sprite.body.center.y)) {
							this.P1.sprite.body.velocity.x = 0;
						}
						
					}
					else if (this.P1.keys.A.isDown && !this.P1.S1.exists)
					{
						this.P1.sprite.scale.x = -1;
						this.P1.sprite.body.velocity.x = -200;
						if (!this.game.camera.view.contains(this.P1.sprite.body.center.x - 20, this.P1.sprite.body.center.y)) {
							this.P1.sprite.body.velocity.x = 0;
						}
						
					}
						
			  
					if (this.P1.keys.S.isDown && !this.P1.S1.exists)
					{
					
						// if (this.P1.sprite.status == 'up') {
							// this.P1.sprite.body.setSize(50, 55, 0, 56);
						// }
						
						if (this.P1.keys.S.justPressed()) {
							this.P1.sprite.body.setSize(50, 55, 0, 56);
							this.P1.sprite.status = 'down';
						}
						
						
						//this.P1.sprite.body.velocity.x = -200;
						
						this.P1.sprite.animations.play('crouch');

						
					}
					else 
					{
						
						// if (this.P1.sprite.status == 'down' && this.P1.keys.S.justReleased()) {
							// this.P1.sprite.body.setSize(50, 105, 0, 36);
						// }
						
						if (this.P1.keys.S.justReleased()) {
							this.P1.sprite.body.setSize(50, 105, 0, 36);
							this.P1.sprite.status = 'up';
						}
						
						
						if (this.P1.keys.W.isDown  && this.P1.sprite.body.onFloor() && this.game.time.now > this.P1.jumpTimer && !this.P1.S1.exists)
						{
							this.P1.sprite.body.velocity.y = -550;
							this.P1.jumpTimer = this.game.time.now + 1550;
							
							
							this.P1.sprite.animations.play('jump_up');
							if (this.P1.keys.D.isDown) {
								
								
								if (this.P1.sprite.scale.x > 0) {
								
									this.P1.sprite.animations.play('jump_forward');
								}
								else {
									this.P1.sprite.animations.play('jump_backward');
								}
							
							}
							else if (this.P1.keys.A.isDown) {
			
								
									if (this.P1.sprite.scale.x > 0) {
									
									this.P1.sprite.animations.play('jump_backward');
								}
								else {
									this.P1.sprite.animations.play('jump_forward');
								}
							}
							else {
							
								this.P1.sprite.animations.play('jump_up');
							}
							
							
							
						}
						else if (this.P1.keys.D.isDown  && this.P1.sprite.body.onFloor() && !this.P1.S1.exists)
						{
							//this.P1.sprite.body.velocity.x = 200;
							
							
							if (this.P1.sprite.scale.x > 0) {
								
								this.P1.sprite.animations.play('walk_forward');
							}
							else {
								this.P1.sprite.animations.play('walk_backward');
							}
						}
						else if (this.P1.keys.A.isDown && this.P1.sprite.body.onFloor() && !this.P1.S1.exists)
						{
							//this.P1.sprite.body.velocity.x = -200;
							
							if (this.P1.sprite.scale.x > 0) {
								
								this.P1.sprite.animations.play('walk_backward');
							}
							else {
								this.P1.sprite.animations.play('walk_forward');
							}
						}
						
						else
						{
							//this.npc.scale.x *= -1;
							//console.log(this.P1.sprite.animations.currentAnim.name);
							if (this.P1.sprite.animations.currentAnim.name == 'walk_backward' || this.P1.sprite.animations.currentAnim.name == 'walk_forward' || this.P1.sprite.animations.currentAnim.name == 'crouch') {
								
								this.P1.sprite.animations.play('stand');
							}
							
							this.P1.sprite.animations.play(this.P1.sprite.animations.currentAnim.name);
							
							if (this.P1.S1.exists == true) {
							
								this.P1.S1.animations.play(this.P1.S1.animations.currentAnim.name);
							
							}
						}
					}
		}
		
	}
    
	
	//dispatch input keys for P2
	if (this.P2.sprite.exists) {
		// if (this.P2.keys.S1.isDown  && this.game.time.now > this.P2.S1.timer) {
		if (this.P2.keys.S1.isDown ) {
					this.P2.S1.timer = this.game.time.now + 1050;
					
					this.P2.sprite.status = "attack"; 
					
					this.P2.sprite.animations.play('attack');
					
					
					
					//var style = { font: "20px Arial", fill: "#fff", align: "center" };
				//txt = this.game.add.text(this.P2.sprite.body.center.x, this.P2.sprite.body.center.y, 'XXXXXXXXXXXXXXXX',  style);
					
					
					//this.P1.S1.exists = true;
					this.P2.S1.animations.play('go');
					this.P2.audio.p2s1.play();
					
					this.fire(this.P2.sprite);
					
			}
		// else if (this.P2.keys.S2.isDown  && this.game.time.now > this.P2.S2.timer)
		else if (this.P2.keys.S2.isDown)
		{
					//this.P2.S2.timer = this.game.time.now + 550;
					this.P2.S2.timer = this.game.time.now + 1050;
					
					//this.P2.sprite.status = "attack"; 
					
					//this.P2.sprite.animations.play('attack');
					
					
					
					//var style = { font: "20px Arial", fill: "#fff", align: "center" };
				//txt = this.game.add.text(this.P2.sprite.body.center.x, this.P2.sprite.body.center.y, 'XXXXXXXXXXXXXXXX',  style);
					
					
					//this.P2.S1.exists = true;
					this.P2.S2.animations.play('go');
					this.P2.audio.p2s2.play();
					
			}
		else 
		{
			  //this.P2.sprite.status = "normal";
					if (this.P2.keys.S.isDown)
					{
					}
					else if (this.P2.keys.D.isDown && !this.P2.S1.exists)
					{
						this.P2.sprite.scale.x = 1;
						this.P2.sprite.body.velocity.x = 200;
						if (!this.game.camera.view.contains(this.P2.sprite.body.center.x + 20, this.P2.sprite.body.center.y)) {
							this.P2.sprite.body.velocity.x = 0;
						}
						
					}
					else if (this.P2.keys.A.isDown && !this.P2.S1.exists)
					{
						this.P2.sprite.scale.x = -1;
						this.P2.sprite.body.velocity.x = -200;
						if (!this.game.camera.view.contains(this.P2.sprite.body.center.x - 20, this.P2.sprite.body.center.y)) {
							this.P2.sprite.body.velocity.x = 0;
						}
						
					}
					
					if (this.P2.keys.S.isDown && !this.P2.S1.exists)
					{
					
						// if (this.P1.sprite.status == 'up') {
							// this.P1.sprite.body.setSize(50, 55, 0, 56);
						// }
						
						if (this.P2.keys.S.justPressed()) {
							this.P2.sprite.body.setSize(50, 55, 0, 56);
							this.P2.sprite.status = 'down';
						}
						
						
						//this.P1.sprite.body.velocity.x = -200;
						
						this.P2.sprite.animations.play('crouch');

						
					}
					else 
					{					
				  
						if (this.P2.keys.S.justReleased()) {
							this.P2.sprite.body.setSize(50, 105, 0, 36);
							this.P2.sprite.status = 'up';
						}
							
						if (this.P2.keys.W.isDown  && this.P2.sprite.body.onFloor() && this.game.time.now > this.P2.jumpTimer && !this.P2.S1.exists)
						{
							this.P2.sprite.body.velocity.y = -550;
							this.P2.jumpTimer = this.game.time.now + 1550;
							
							
							this.P2.sprite.animations.play('jump_up');
							if (this.P2.keys.D.isDown) {
								
								
								if (this.P2.sprite.scale.x > 0) {
								
									this.P2.sprite.animations.play('jump_forward');
								}
								else {
									this.P2.sprite.animations.play('jump_backward');
								}
							
							}
							else if (this.P2.keys.A.isDown) {
			
								
									if (this.P2.sprite.scale.x > 0) {
									
									this.P2.sprite.animations.play('jump_backward');
								}
								else {
									this.P2.sprite.animations.play('jump_forward');
								}
							}
							else {
							
								this.P2.sprite.animations.play('jump_up');
							}
							
							
							
						}
						else if (this.P2.keys.D.isDown  && this.P2.sprite.body.onFloor() && !this.P2.S1.exists)
						{
							//this.P2.sprite.body.velocity.x = 200;
							
							//this.P2.sprite.scale.x = 1;
							
							if (this.P2.sprite.scale.x > 0) {
								
								this.P2.sprite.animations.play('walk_forward');
							}
							else {
								this.P2.sprite.animations.play('walk_backward');
							}
						}
						else if (this.P2.keys.A.isDown && this.P2.sprite.body.onFloor() && !this.P2.S1.exists)
						{
							//this.P2.sprite.body.velocity.x = -200;
							
							//this.P2.sprite.scale.x = -1;
							
							if (this.P2.sprite.scale.x > 0) {
								
								this.P2.sprite.animations.play('walk_backward');
							}
							else {
								this.P2.sprite.animations.play('walk_forward');
							}
						}
						else
						{
							//this.npc.scale.x *= -1;
							//console.log(this.P2.sprite.animations.currentAnim.name);
							if (this.P2.sprite.animations.currentAnim.name == 'walk_backward' || this.P2.sprite.animations.currentAnim.name == 'walk_forward' || this.P2.sprite.animations.currentAnim.name == 'crouch') {
								
								this.P2.sprite.animations.play('stand');
							}
							
							this.P2.sprite.animations.play(this.P2.sprite.animations.currentAnim.name);
							
							if (this.P2.S1.exists == true) {
							
								this.P2.S1.animations.play(this.P2.S1.animations.currentAnim.name);
							
							}
						}
					}
		}
	}
    
    //collision and overlap effects
    // this.game.physics.arcade.collide(this.P1.sprite, this.P2.sprite, this.testanim, null, this);
    // this.game.physics.arcade.overlap(this.P1.S1, this.P2.sprite, this.S1hit, null, this);
    // this.game.physics.arcade.overlap(this.P2.S1, this.P1.sprite, this.S1hit, null, this);
    // this.game.physics.arcade.overlap(this.P1.S2, this.P2.sprite, this.S2hit, null, this);
    // this.game.physics.arcade.overlap(this.P2.S2, this.P1.sprite, this.S2hit, null, this);

    
    
		//adjust the position of camera according to players' positions
    if (this.P1.sprite.exists && this.P2.sprite.exists) {
		
		this.game.camera.focusOnXY((this.P1.sprite.body.center.x + this.P2.sprite.body.center.x) / 2, (this.P1.sprite.body.center.y + this.P2.sprite.body.center.y) / 2);

	}
	else if (this.P1.sprite.exists) {
		this.game.camera.focusOnXY(this.P1.sprite.body.center.x, this.P1.sprite.body.center.y);

	}
	else if (this.P2.sprite.exists) {
		this.game.camera.focusOnXY(this.P2.sprite.body.center.x, this.P2.sprite.body.center.y);
	}
	
	if (!this.game.camera.view.contains(this.P1.sprite.body.center.x, this.P1.sprite.body.center.y)) {
		this.P1.sprite.body.velocity.x = 0;
	}
	if (!this.game.camera.view.contains(this.P2.sprite.body.center.x, this.P2.sprite.body.center.y)) {
		this.P2.sprite.body.velocity.x = 0;
	}
	// this.game.camera.focusOnXY((this.P1.sprite.body.center.x + this.P2.sprite.body.center.x) / 2, (this.P1.sprite.body.center.y + this.P2.sprite.body.center.y) / 2);

    
	/*
	for (var i = 0; i < this.firedBullets.length; i++)
    {
		if(this.firedBullets[i].inCamera == false){
			this.firedBullets[i].body.exists = false;
			alert('aaa');
			this.firedBullets.splice(i, 1);
		}
		
    }
	*/
	
	/*
	this.bullets.forEach(function(item) {
    if(item.alive === false){
	   item.reset(window.KOF.game.camera.x, window.KOF.game.camera.y);
	}});
	
	this.bullets.forEach(function(item) {
    if(item.alive === true && item.inCamera===false){
	   item.kill();
	}});
	
	this.enemyBullets.forEach(function(item) {
    if(item.alive === false){
	   item.reset(window.KOF.game.camera.x, window.KOF.game.camera.y);
	}});
	
	this.enemyBullets.forEach(function(item) {
    if(item.alive === true && item.inCamera===false){
	   item.kill();
	}});
	*/
	
    
  },
  
  
  
  fire: function(player) {

    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstExists(false);
		
		
		this.firedBullets.push(bullet);
		
        bullet.reset(player.body.center.x, player.body.center.y - 20);

        bullet.rotation = this.game.physics.arcade.moveToXY(bullet, player.body.center.x + player.scale.x * 500, player.body.center.y, 700, 500);
    }

},
  
  //Skill 1
  S1hit: function(S, sprite) {
  	
	sprite.kill();
	
	return;
	
  	//sprite.HP -= 0.1;
  	sprite.AP += 0.1;
  	
  	
  	if (sprite.HP <= 0)
    {
    	//sprite.destroy();
    	sprite.HP = 0;
    	//this.game.time.events.add(800, this.gameOver, this);
    }

  },
  
  //Skill 2
  S2hit: function(S, sprite) {
  	
  	sprite.health -= 0.5;
  	sprite.AP += 0.1;
  	
  	if (sprite.HP <= 0)
    {
    	//sprite.destroy();
    	sprite.HP = 0;
    	//this.game.time.events.add(800, this.gameOver, this);
    }

  },

	//update the HP of each player
  updateHp: function() {
      
      this.p2_hp.text = "P2 HP: " + String(Math.round(this.P2.sprite.HP));
      this.p1_hp.text = "P1 HP: " + String(Math.round(this.P1.sprite.HP));
      
      //this.p2_ap.text = "AP: " + String(this.P2.sprite.AP);
      //this.p1_ap.text = "AP: " + String(this.P1.sprite.AP);
	  
		if (this.P1.sprite.HP <= 0) {
			//sprite.destroy();
			this.P1.sprite.HP = 0;
			this.P1.sprite.exists = false;
		}
		
		if (this.P2.sprite.HP <= 0) {
			//sprite.destroy();
			this.P2.sprite.HP = 0;
			this.P2.sprite.exists = false;
		}
		
		if (this.P2.sprite.HP <= 0 && this.P1.sprite.HP <= 0) {
			
			this.game.time.events.add(800, this.gameOver, this);
		}

		
		if (this.enemiesAlive == 0) {
			this.game.time.events.add(800, this.gameSuccess, this);
		
		}
		
		// if (this.P1.sprite.exists && this.P1.sprite.body.x > this.game.width - 100)
		// {
			// this.game.time.events.add(800, this.gameSuccess, this);
		// }
		// if (this.P2.sprite.exists && this.P2.sprite.body.x > this.game.width - 100)
		// {
			// this.game.time.events.add(800, this.gameSuccess, this);
		// }
  },


  gameOver: function() {    

    
    text = "GAME OVER";
    style = { font: "60px Revalia", fill: "#fff", align: "center" };
  
    this.gameover = this.game.add.text(this.game.camera.x  + this.game.camera.width / 2, this.game.camera.y  + this.game.camera.height / 2, text, style);
    
    this.gameover.anchor.set(0.5);
    this.bgm.stop();
    //this.gameover.exists = true;
    this.game.paused = true;

  },
  
  gameSuccess: function() {    

    
    text = "MISSION COMPLETE";
    style = { font: "60px Revalia", fill: "#fff", align: "center" };
  
    this.gameover = this.game.add.text(this.game.camera.x  + this.game.camera.width / 2, this.game.camera.y  + this.game.camera.height / 2, text, style);
    
    this.gameover.anchor.set(0.5);
    this.bgm.stop();
    //this.gameover.exists = true;
    this.game.paused = true;

  },

  showLabels: function() {

    var text = "0";
    var style = { font: "20px Revalia", fill: "#fff", align: "center" };
    
    this.p1_hp = this.game.add.text(50, 50, "P1 HP: " + String(Math.round(this.P1.sprite.HP)), style);
    this.p1_hp.fixedToCamera = true;
    
    this.p2_hp = this.game.add.text(600, 50, "P2 HP: " + String(Math.round(this.P2.sprite.HP)), style);
    this.p2_hp.fixedToCamera = true;
    
    /*
    this.p1_ap = this.game.add.text(50, 70, "AP: " + String(this.P1.sprite.AP), style);
    this.p1_ap.fixedToCamera = true;
    
    this.p2_ap = this.game.add.text(this.game.width-100, 70, "AP: " + String(this.P2.sprite.AP), style);
    this.p2_ap.fixedToCamera = true;
    */
  },
  
  render: function() {

    //this.game.debug.cameraInfo(this.game.camera, 500, 32);
    //game.debug.spriteInfo(player, 32, 32);
    //game.debug.spriteBounds(player);
    //game.debug.body(player);
    //game.debug.bodyInfo(player, 100, 100);
    // this.god(this.P1.sprite);
    // this.god(this.P2.sprite);
    
    //this.god(this.P1.S1);
    //this.god(this.P1.S2);
    
    //this.god(this.P2.S1);
    //this.god(this.P2.S2);

	},

	god: function(s) {

    //this.game.debug.spriteBounds(s);
    this.game.debug.body(s);
    this.game.debug.bodyInfo(s, 100, 100);
    //console.log("body.x:" + s.body.center.x);
		//console.log("body.y:" + s.body.center.y);
	}
};

/*
TODO

-audio
-asteriod bounch
*/
