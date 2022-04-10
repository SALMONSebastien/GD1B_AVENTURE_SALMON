var config = {
    type: Phaser.AUTO,
    width: 1920 , height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
            
        }
    },
    

    scene: [main_menu,village1,bar,basement],
    input:{gamepad:true},
};
new Phaser.Game(config);

