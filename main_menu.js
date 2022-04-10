class main_menu extends Phaser.Scene {
    constructor() {

        super("main_menu");
    }
    preload() {
        this.load.image('main', 'assets/bg-main_menu.png');
        this.load.image('startButton', 'assets/startButton.png');
        this.load.image('closeButton', 'assets/closeButton.png');


        
    }
    create() {
        this.add.image(960, 540, 'main');

        this.physics.world.setBounds(0, 0, 3000,2000)

        
        this.cursors = this.input.keyboard.createCursorKeys();

        var startButton = this.add.image(1320, 550, 'startButton').setScale(0.8).setInteractive();

            startButton.on('pointerdown', function (pointer) {

                console.log('bonjour');

                this.scene.scene.start("village1");


        });

        var closeButton = this.add.image(1350, 750, 'closeButton').setScale(0.8).setInteractive();

            closeButton.on('pointerdown', function (pointer) {

                this.scene.scene.stop("main_menu");

        });

        

        


        
    }

    update() {


        
    }

   
    
};