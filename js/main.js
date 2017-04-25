var KOF = KOF || {};

KOF.game = new Phaser.Game(800, 400, Phaser.AUTO, 'phaser-example');

KOF.game.state.add('Boot', KOF.Boot);
KOF.game.state.add('Preload', KOF.Preload);
KOF.game.state.add('MainMenu', KOF.MainMenu);
KOF.game.state.add('Game', KOF.Game);

KOF.game.state.start('Boot');