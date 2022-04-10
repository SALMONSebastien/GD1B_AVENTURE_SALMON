class bar extends Phaser.Scene {
    constructor() {
        
        super("bar");

    }

    // Récupération des données entre chaque scène
    init(data){
        this.health = data.health;
        this.battery = data.battery;
        this.gold = data.gold;
        this.playerSpawnX = data.spawnX;
        this.playerSpawnY = data.spawnY;
        this.gameStart = data.gameStart;
        this.lampObtained = data.lamp;
        this.crowbarObtained = data.crowbar;
        this.lookingForLamp = data.lookingLamp;
        this.exiting = data.exit;
    }
        
    preload() {
        
        this.load.image('bar-bg', 'assets/bar-bg.png');
        this.load.image('shadowBar', 'assets/shadowBar.png');

        this.load.image('doorbaropen', 'assets/door-baropen.png');
        this.load.image('doorbar', 'assets/door-bar.png');

        this.load.image('closedDoorMessage', 'assets/messages/closedDoor.png');

        this.load.image('barman', 'assets/barman-idle.png');

        this.load.image('jukebox', 'assets/jukebox.png');

        this.load.image('light-bar', 'assets/light-bar.png');

        this.load.image('lampNeeded', 'assets/messages/lampNeeded.png');

        this.load.image('lampFound', 'assets/messages/lampFound.png');


        this.load.image('barQuestEnd', 'assets/messages/barQuestEnd.png');


        this.load.image('radarLost', 'assets/radar/7.png');

        
    }
    create() {

        this.colliders = this.physics.add.staticGroup();
        
        this.add.image(960, 480, 'bar-bg').setScale(1);

        this.add.image(1260, 122, 'doorbar').setScale(1).setVisible(true);
        this.doorbar = this.add.image(1260, 122, 'doorbaropen').setScale(1).setVisible(false);


        

        this.add.image(880, 175, 'barman').setScale(1).setVisible(true);

        this.add.image(1030, 830, 'jukebox').setScale(1);
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('e');

        this.player = this.physics.add.sprite(this.playerSpawnX, this.playerSpawnY, 'perso').setScale(1);

        //this.add.image(1070, 480, 'shadowBar').setScale(1);



        this.add.image(560, 495, 'light-bar').setScale(1).setAlpha(0.5);

        this.exiting = 0;

        this.lookingForLamp = false;

        this.questTaken = false;

        this.rewardTaken = false;

        this.keyE = this.add.image(0, 0, 'keyE').setScale(0.4).setVisible(false);

        
        
    
        this.cameras.main.setBounds(0, 0, 1920, 1080);
        this.cameras.main.startFollow(this.player);

        this.lightLamp = this.physics.add.image(this.player.x, this.player.y, 'light').setScale(1).setVisible(false);
        

        //HUD
        
        // this.playerXtext = this.add.text(300, 400, this.player.x).setScrollFactor(0);

        // this.playerYtext = this.add.text(300, 500, this.player.y).setScrollFactor(0);

        this.healthHUD = this.add.image(960, 540, 'healthHUD').setScale(1).setScrollFactor(0).setVisible(true);

        this.healthText = this.add.text(150, 130, this.health + '%', { font: '45px Courier'}).setScrollFactor(0);
        this.goldText = this.add.text(65, 850, this.gold , { font: '45px Courier'}).setScrollFactor(0).setVisible(true);
        this.batteryText = this.add.text(65, 760, this.battery  + '%', { font: '45px Courier'}).setScrollFactor(0).setVisible(false);

        this.goldHUD = this.add.image(30, 875, 'goldHUD').setScale(1).setScrollFactor(0).setVisible(true);
        this.batteryHUD = this.add.image(30, 785, 'batteryHUD').setScale(1).setScrollFactor(0).setVisible(false);

        this.mission1 = this.add.image(1720, 350, 'mission1').setScale(0.8).setScrollFactor(0).setAlpha(0.7).setVisible(true);

        this.mission2 = this.add.image(1720, 300, 'mission2').setScale(0.8).setScrollFactor(0).setAlpha(0.7).setVisible(false);

        this.hudLamp = this.add.image(1800, 900, 'hudLamp').setScale(0.8).setScrollFactor(0).setAlpha(0.8).setVisible(false);
        this.hudCrowbar = this.add.image(1815, 750, 'hudCrowbar').setScale(0.8).setScrollFactor(0).setAlpha(0.8).setVisible(false);

        this.doorClosed = this.add.image(1500, 680, 'closedDoorMessage').setScale(0.8).setVisible(false);


        this.lampNeeded = this.add.image(1470, 680, 'lampNeeded').setScale(0.8).setVisible(false);


        this.barQuestEnd = this.add.image(1470, 680, 'barQuestEnd').setScale(0.8).setVisible(false);

        this.lampFound = this.add.image(1470, 680, 'lampFound').setScale(0.8).setVisible(false);

        this.radar7 = this.add.sprite(1750, 110, 'radar7').setScale(0.6).setScrollFactor(0).setVisible(true);

    }

    update(time,delta) {
        playerControls(this.player,this.cursors);
        this.goldText.setText(this.gold); 

        if (this.lampObtained == true){

            this.batteryText.setVisible(true);
            this.batteryHUD.setVisible(true);
            this.batteryText.setText(this.battery + '%');            

        }

        if ( this.lampObtained == true) {

            this.hudLamp.setVisible(true);

        }
        

        if ( this.crowbarObtained == true && this.player.x >= 160 && this.player.x <= 275 &&  this.player.y < 400) {

            this.hudCrowbar.setVisible(true);

        }

        this.timer += delta;     
        if (this.lampObtained == true && this.lampUsed == true && this.timer > Phaser.Math.Between(800, 3000)) {

            
            this.battery -= 1;

            this.batteryText.setText(this.battery  + '%', { font: '45px Courier'});

            this.timer = 0;
        
        
        }

        // Déplacement vers d'autres scènes conditionné par les placements et les inputs

        //Affichage de la touche E

        if (this.player.x >= 1220 && this.player.x <= 1310 && this.player.y >= 125 && this.player.y <= 180 && this.questTaken == true) {

            this.keyDisplay(this.keyE, this.player)


            setTimeout(() => {

                this.keyE.setVisible(false);
            

            }, 3000);

        }
        
        if (this.player.x >= 1220 && this.player.x <= 1310 && this.player.y >= 125 && this.player.y <= 180 && this.questTaken == true && this.cursors2.e.isDown && this.exiting < 2){

            this.playerSpawnX = 280;

            this.playerSpawnY = 500;

            this.scene.start("basement", {health : this.health, battery : this.battery, gold : this.gold, spawnX : this.playerSpawnX, spawnY : this.playerSpawnY, gameStart : this.gameStart, lamp : this.lampObtained, crowbar : this.crowbarObtained});

        }

        if (this.player.x >= 1220 && this.player.x <= 1310 && this.player.y >= 125 && this.player.y <= 180 && this.questTaken == false && this.cursors2.e.isDown){

            this.doorClosed.setVisible(true);

            setTimeout(() => {

                this.doorClosed.setVisible(false);
            

            }, 3000);

        }

        //Affichage de la touche E

        if (this.player.x >= 350 && this.player.x <= 415 && this.player.y >= 410 && this.player.y <= 530) {

            this.keyDisplay(this.keyE, this.player)


            setTimeout(() => {

                this.keyE.setVisible(false);
            

            }, 3000);

        }

        if (this.player.x >= 350 && this.player.x <= 415 && this.player.y >= 410 && this.player.y <= 530 && this.cursors2.e.isDown){

            this.playerSpawnX = 2700;

            this.playerSpawnY = 1165;

            this.scene.start("village1", {health : this.health, battery : this.battery, gold : this.gold, spawnX : this.playerSpawnX, spawnY : this.playerSpawnY, gameStart : this.gameStart, lamp : this.lampObtained, crowbar : this.crowbarObtained, lookingLamp : this.lookingForLamp, exit : this.exiting});

        }

       //Interdiction de prendre la quête tant que la lampe n'est pas obtenue

       if (this.player.x >= 700 && this.player.x <= 1050 && this.player.y <= 350 && this.questTaken == false && this.cursors2.e.isDown){

        this.lookingForLamp = true;
    

        this.lampNeeded.setVisible(true);

        setTimeout(() => {

            this.lampNeeded.setVisible(false);

        }, 10000);


    }

    // Validation de la prise de quête, lors de l'interaction avec le barman ( en ayant la lampe torche )

       if (this.player.x >= 700 && this.player.x <= 1050 && this.player.y <= 350 && this.questTaken == false && this.cursors2.e.isDown && this.lampObtained == true && this.crowbarObtained == false){

            this.questTaken = true;
            this.doorbar.setVisible(true);


            this.lampFound.setVisible(true);

            setTimeout(() => {

                this.lampFound.setVisible(false);
            

            }, 10000);


        }



        if (this.player.x >= 700 && this.player.x <= 1050 && this.player.y <= 350 && this.questTaken == false && this.cursors2.e.isDown && this.lampObtained == true && this.crowbarObtained == true){

            
            this.barQuestEnd.setVisible(true);
            this.exiting = 2;

            

            setTimeout(() => {

                this.barQuestEnd.setVisible(false);
            

            }, 10000);


        }

        if (this.player.x >= 700 && this.player.x <= 1050 && this.player.y <= 350 && this.rewardTaken == false){


            this.gold += 200; // Récompense de fin de quête ( même si l'argent ne sert pas )
            this.rewardTaken = true;

        }


        // Affichage de la touche à appuyer 

        if ( this.player.x >= 700 && this.player.x <= 1050 &&  this.player.y < 350 ) {

            this.keyDisplay(this.keyE, this.player)


            setTimeout(() => {

                this.keyE.setVisible(false);
            

            }, 3000);

        }

        //lampe torche keyboard

        if (this.cursors.shift.isUp && this.lampObtained == true){

            this.lightLamp.setVisible(false);
            
            this.lampUsed = false;
            
        }

        if (this.cursors.shift.isDown && this.lampObtained == true){

            this.lightLamp.setVisible(true);
            this.lampUsed = true;
            
            

            if (this.cursors.right.isDown){

                this.lightLamp.setVisible(true);
                
                this.lightLamp.x = this.player.x + 170
                this.lightLamp.y = this.player.y + 10
                this.lightLamp.angle = 0;
                
    
            }

            if (this.cursors.left.isDown){

                this.lightLamp.setVisible(true);
                
                this.lightLamp.x = this.player.x - 200
                this.lightLamp.y = this.player.y 
                this.lightLamp.angle = 180;
                
                
    
            }

            if (this.cursors.down.isDown){

                this.lightLamp.setVisible(true);
                
                this.lightLamp.x = this.player.x - 10
                this.lightLamp.y = this.player.y + 170
                this.lightLamp.angle = 90;
                
    
            }

            if (this.cursors.up.isDown){

                this.lightLamp.setVisible(true);
                
                this.lightLamp.x = this.player.x + 30
                this.lightLamp.y = this.player.y - 200
                this.lightLamp.angle = -90;
                
                
    
            }

        }

        // this.playerXtext.setText(this.player.x);

        // this.playerYtext.setText(this.player.y);

    }

    keyDisplay(key,place){

        key.setVisible(true);
        key.x = place.x + 70
        key.y = place.y - 100


    }


    
};