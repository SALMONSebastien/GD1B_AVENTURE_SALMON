class basement extends Phaser.Scene {
    constructor() {
        
        super("basement");
    }

    init(data){
        this.health = data.health;
        this.battery = data.battery;
        this.gold = data.gold;
        this.playerSpawnX = data.spawnX;
        this.playerSpawnY = data.spawnY;
        this.gameStart = data.gameStart;
        this.lampObtained = data.lamp;
        this.crowbarObtained = data.crowbar;

        this.exiting = data.exit;
    }


    preload() {
        
        this.load.image('basement-bg', 'assets/basement.png');

        this.load.image('cache1', 'assets/cache1.png');
        this.load.image('cache2', 'assets/cache2.png');
        this.load.image('cache3', 'assets/cache3.png');
        this.load.image('cache4', 'assets/cache4.png');

        this.load.image('light', 'assets/test.png');
        this.load.image('ombre', 'assets/ombre.png');
        this.load.image('doorKey', 'assets/PorteClé.png');
        this.load.image('doorBarricade', 'assets/porteBarricadée.png');

        this.load.image('key', 'assets/key.png');
        this.load.image('keyHUD', 'assets/keyHUD.png');

        this.load.image('crowbar', 'assets/crowbar.png');

        this.load.image('ghost', 'assets/enemy.png');


        this.load.image('perso', 'assets/perso.png');
        

        //HUD 

        this.load.image('healthHUD', 'assets/healthHUD.png');

        this.load.image('doorBlocked', 'assets/messages/doorBlocked.png');
        
        
    }
    create() {

        this.colliders = this.physics.add.staticGroup();
        
        this.add.image(1600, 1500, 'basement-bg').setScale(1);
        
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cursors2 = this.input.keyboard.addKeys('e');
        
        this.playerLocation = 1;
        this.lampUsed = false;
        this.doorKey = this.add.image(1265, 1190, 'doorKey').setScale(1).setVisible(true);
        this.doorBarricade = this.add.image(2090, 1740, 'doorBarricade').setScale(1).setVisible(true);
        this.key = this.physics.add.image(1950, 2200, 'key').setScale(0.45).setVisible(false);
        this.crowbar = this.physics.add.image(2820, 1200, 'crowbar').setScale(1).setVisible(false);

       

        this.player = this.physics.add.sprite(this.playerSpawnX, this.playerSpawnY, 'perso').setScale(1);
        //this.player = this.physics.add.sprite(1600, 2200, 'perso').setScale(1);

        this.cameras.main.setBounds(0, 0, 3200, 3000);
        this.cameras.main.startFollow(this.player);

        this.cache1 = this.add.image(1600, 1500, 'cache1').setScale(1).setVisible(false);
        this.cache2 = this.add.image(1600, 1500, 'cache2').setScale(1).setVisible(false);
        this.cache3 = this.add.image(1600, 1500, 'cache3').setScale(1).setVisible(false);
        this.cache4 = this.add.image(1600, 1500, 'cache4').setScale(1).setVisible(false);

        this.ombre = this.add.image(1600, 1500, 'ombre').setScale(1).setAlpha(0.4);

        // items nécessaires pour débloquer l'accès à d'autres parties du donjon

        this.keyObtained = false;

        this.crowbarObtained = false;

        this.lampObtained = true;

        this.exiting = 0;

        this.player.invincible = false;

        this.timer = 0;

        this.batteryPickUp = this.physics.add.staticGroup();

        this.keyE = this.add.image(0, 0, 'keyE').setScale(0.4).setVisible(false);


        this.goldPickUp = this.physics.add.staticGroup();

        // Gold caché en guise de tuto

        this.hiddenGoldBasement = this.goldPickUp.create(2300, 500, 'goldPickUp').setScale(1).refreshBody().setVisible(false);
        

        //Enemies

        this.ghost = this.physics.add.staticGroup();

        this.ghost1 = this.ghost.create(1350, 2500, 'ghost').setScale(0.6).setVisible(false);
        this.ghost2 = this.ghost.create(2000, 1200, 'ghost').setScale(0.6).setVisible(false);
        this.ghost3 = this.ghost.create(3100, 1800, 'ghost').setScale(0.6).setVisible(false);
        this.ghost4 = this.ghost.create(1250, 525, 'ghost').setScale(0.6).setVisible(false);
        this.ghost5 = this.ghost.create(3300, 510, 'ghost').setScale(0.6).setVisible(false);
        

        
        // Variables de vie des ennemis

        
        this.ghost1PV = 100;
        this.ghost1Dead = false;

        this.ghost2PV = 100;
        this.ghost2Dead = false;

        this.ghost3PV = 100;
        this.ghost3Dead = false;

        this.ghost4PV = 100;
        this.ghost4Dead = false;

        this.ghost5PV = 100;
        this.ghost5Dead = false;

        this.lightLamp = this.physics.add.image(this.player.x, this.player.y, 'light').setScale(1).setVisible(true);
        
        
        
        

        //HUD
        
        // this.playerXtext = this.add.text(300, 400, this.player.x).setScrollFactor(0);

        // this.playerYtext = this.add.text(300, 500, this.player.y).setScrollFactor(0);

        this.healthHUD = this.add.image(960, 540, 'healthHUD').setScale(1).setScrollFactor(0).setVisible(true);
        this.keyHUD = this.add.image(1850, 35, 'keyHUD').setScale(0.5).setScrollFactor(0).setVisible(false);

        this.healthText = this.add.text(150, 130, this.health + '%', { font: '45px Courier'}).setScrollFactor(0);

        this.goldText = this.add.text(65, 850, this.gold + 'G' , { font: '45px Courier'}).setScrollFactor(0).setVisible(true);
        this.batteryText = this.add.text(65, 760, this.battery  + '%', { font: '45px Courier'}).setScrollFactor(0).setVisible(false);

        this.goldHUD = this.add.image(30, 875, 'goldHUD').setScale(1).setScrollFactor(0).setVisible(true);
        this.batteryHUD = this.add.image(30, 785, 'batteryHUD').setScale(1).setScrollFactor(0).setVisible(false);

        this.mission1 = this.add.image(1720, 350, 'mission1').setScale(0.8).setScrollFactor(0).setAlpha(0.7).setVisible(true);

        this.mission2 = this.add.image(1720, 300, 'mission2').setScale(0.8).setScrollFactor(0).setAlpha(0.7).setVisible(false);

        this.hudLamp = this.add.image(1800, 900, 'hudLamp').setScale(0.8).setScrollFactor(0).setAlpha(0.8).setVisible(false);
        this.hudCrowbar = this.add.image(1815, 750, 'hudCrowbar').setScale(0.8).setScrollFactor(0).setAlpha(0.8).setVisible(false);

        this.doorBlocked = true;

        this.doorBlockedMessage = this.add.image(1470, 680, 'doorBlocked').setScale(0.8).setScrollFactor(0).setVisible(false);

        this.radar7 = this.add.sprite(1750, 110, 'radar7').setScale(0.6).setScrollFactor(0).setVisible(true);




        //collisions

        this.physics.add.collider(this.lightLamp, this.key, this.displayKey,null,this);
        this.physics.add.collider(this.lightLamp, this.crowbar, this.displayCrowbar,null,this);
        this.physics.add.collider(this.player, this.key, this.getKey,null,this);
        this.physics.add.collider(this.player, this.crowbar, this.getCrowbar,null,this);

        // dommages pour le joueur

        this.physics.add.collider(this.lightLamp, this.ghost1, this.damageGhost1,null,this);
        this.physics.add.collider(this.lightLamp, this.ghost2, this.damageGhost2,null,this);
        this.physics.add.collider(this.lightLamp, this.ghost3, this.damageGhost3,null,this);
        this.physics.add.collider(this.lightLamp, this.ghost4, this.damageGhost4,null,this);
        this.physics.add.collider(this.lightLamp, this.ghost5, this.damageGhost5,null,this);


        // dommages pour les ennemis


        this.physics.add.collider(this.player, this.ghost1, this.damagePlayer1,null,this);
        this.physics.add.collider(this.player, this.ghost2, this.damagePlayer2,null,this);
        this.physics.add.collider(this.player, this.ghost3, this.damagePlayer3,null,this);
        this.physics.add.collider(this.player, this.ghost4, this.damagePlayer4,null,this);
        this.physics.add.collider(this.player, this.ghost5, this.damagePlayer5,null,this);


        this.key.body.immovable = true;
        this.crowbar.body.immovable = true;

        this.physics.add.collider(this.lightLamp, this.hiddenGoldBasement, this.displayGold,null,this);

        this.physics.add.collider(this.player, this.goldPickUp, this.getGold,null,this);

        this.physics.add.collider(this.player, this.batteryPickUp, this.getBattery,null,this);
    }

    update(time,delta) {
        playerControls(this.player,this.cursors);

        if (this.player.invincible == true){

            this.player.setTint('0xff0000');
            

            setTimeout(() => {
    
                this.player.invincible = false;
                this.player.clearTint();
    
    
            }, 3000);
    
    
        }

        

        if ( this.lampObtained == true) {

            this.hudLamp.setVisible(true);

        }
        

        if ( this.crowbarObtained == true && this.player.x >= 2045 && this.player.x <= 2130 && this.player.y >= 1625 && this.player.y <= 1645) {

            this.hudCrowbar.setVisible(true);
            

        }

        else {

            this.hudCrowbar.setVisible(false);

        }
        
        this.goldText.setText(this.gold); 
        this.healthText.setText(this.health + '%'); 


        //ennemi 

        if (this.keyObtained == true){

            this.ghost1.setVisible(true);
            

        }

        if (this.crowbarObtained == true){


            this.ghost2.setVisible(true);
            this.ghost3.setVisible(true);
            this.exiting = 1;

        }

        if (this.playerLocation == 2 && this.exiting == 1 && this.player.x == 2380){

            this.ghost4.setVisible(true);
            this.ghost5.setVisible(true);
            this.exiting = 2;

        }


        // Pattern ennemis 

        //ghost 1

        if (this.ghost1PV > 0 && this.ghost1.visible == true ){

            if (this.ghost1.x > this.player.x && this.ghost1Dead == false){

                this.ghost1.x -= 1;
                this.ghost1.body.x -= 1;


            }

            if (this.ghost1.x < this.player.x  && this.ghost1Dead == false){

                this.ghost1.x += 1;
                this.ghost1.body.x += 1;


            }

            if (this.ghost1.y > this.player.y  && this.ghost1Dead == false){

                this.ghost1.y -= 1;
                this.ghost1.body.y -= 1;


            }

            if (this.ghost1.y < this.player.y  && this.ghost1Dead == false){

                this.ghost1.y += 1;
                this.ghost1.body.y += 1;


            }
        }

        //ghost 2

        if (this.ghost2PV > 0 && this.ghost2.visible == true ){

            if (this.ghost2.x > this.player.x && this.ghost2Dead == false){

                this.ghost2.x -= 1;
                this.ghost2.body.x -= 1;


            }

            if (this.ghost2.x < this.player.x  && this.ghost2Dead == false){

                this.ghost2.x += 1;
                this.ghost2.body.x += 1;


            }

            if (this.ghost2.y > this.player.y  && this.ghost2Dead == false){

                this.ghost2.y -= 1;
                this.ghost2.body.y -= 1;


            }

            if (this.ghost2.y < this.player.y  && this.ghost2Dead == false){

                this.ghost2.y += 1;
                this.ghost2.body.y += 1;


            }
        }

        //ghost 3


        if (this.ghost3PV > 0 && this.ghost3.visible == true ){

            if (this.ghost3.x > this.player.x && this.ghost3Dead == false){

                this.ghost3.x -= 1;
                this.ghost3.body.x -= 1;


            }

            if (this.ghost3.x < this.player.x  && this.ghost3Dead == false){

                this.ghost3.x += 1;
                this.ghost3.body.x += 1;


            }

            if (this.ghost3.y > this.player.y  && this.ghost3Dead == false){

                this.ghost3.y -= 1;
                this.ghost3.body.y -= 1;


            }

            if (this.ghost3.y < this.player.y  && this.ghost3Dead == false){

                this.ghost3.y += 1;
                this.ghost3.body.y += 1;


            }
        }

        //ghost 4


        if (this.ghost4PV > 0 && this.ghost4.visible == true ){

            if (this.ghost4.x > this.player.x && this.ghost4Dead == false){

                this.ghost4.x -= 1;
                this.ghost4.body.x -= 1;


            }

            if (this.ghost4.x < this.player.x  && this.ghost4Dead == false){

                this.ghost4.x += 1;
                this.ghost4.body.x += 1;


            }

            if (this.ghost4.y > this.player.y  && this.ghost4Dead == false){

                this.ghost4.y -= 1;
                this.ghost4.body.y -= 1;


            }

            if (this.ghost4.y < this.player.y  && this.ghost4Dead == false){

                this.ghost4.y += 1;
                this.ghost4.body.y += 1;


            }
        }

        //ghost 5

        if (this.ghost5PV > 0 && this.ghost5.visible == true ){

            if (this.ghost5.x > this.player.x && this.ghost5Dead == false){

                this.ghost5.x -= 1;
                this.ghost5.body.x -= 1;


            }

            if (this.ghost5.x < this.player.x  && this.ghost5Dead == false){

                this.ghost5.x += 1;
                this.ghost5.body.x += 1;


            }

            if (this.ghost5.y > this.player.y  && this.ghost5Dead == false){

                this.ghost5.y -= 1;
                this.ghost5.body.y -= 1;


            }

            if (this.ghost5.y < this.player.y  && this.ghost5Dead == false){

                this.ghost5.y += 1;
                this.ghost5.body.y += 1;


            }
        }


        //Régénération santé ennemis

        // ghost 1

        if (this.ghost1PV > 90){

            this.ghost1.setAlpha(1);
           
        }

        if (this.ghost1PV >= 70 && this.ghost1PV < 90){

            this.ghost1.setAlpha(0.8);

        }

        if (this.ghost1PV >= 50 && this.ghost1PV < 70){

            this.ghost1.setAlpha(0.6);

        }

        if (this.ghost1PV >= 30 && this.ghost1PV < 50){

            this.ghost1.setAlpha(0.4);
           
        }

        if (this.ghost1PV >= 10 && this.ghost1PV < 30){

            this.ghost1.setAlpha(0.2);
        }

        if (this.ghost1PV <= 10){

            this.ghost1.setAlpha(0.1);
        }

        if (this.ghost1PV < 100){

            this.ghost1PV += 1;
        }   

        //Max PV des ennemis

        if (this.ghost1PV >= 100){

            this.ghost1PV = 100;
           
        }

        if (this.ghost1PV <= 0){

            this.ghost1PV = 0;
           
        }


        if (this.ghost1PV <= 0){

            this.batteryPickUp.create(this.ghost1.x,this.ghost1.y, 'batteryPickUp').setScale(1).refreshBody();
            this.ghost1Dead = true;


            setTimeout(() => {

                this.ghost1.destroy();
                
    
            }, 500);
        
        }


         // ghost 2

         if (this.ghost2PV > 90){

            this.ghost2.setAlpha(1);
           
        }

        if (this.ghost2PV >= 70 && this.ghost2PV < 90){

            this.ghost2.setAlpha(0.8);

        }

        if (this.ghost2PV >= 50 && this.ghost2PV < 70){

            this.ghost2.setAlpha(0.6);

        }

        if (this.ghost2PV >= 30 && this.ghost2PV < 50){

            this.ghost2.setAlpha(0.4);
           
        }

        if (this.ghost2PV >= 10 && this.ghost2PV < 30){

            this.ghost2.setAlpha(0.2);
        }

        if (this.ghost2PV <= 10){

            this.ghost2.setAlpha(0.1);
        }

        if (this.ghost2PV < 100){

            this.ghost2PV += 1;
        }   

        //Max PV des ennemis

        if (this.ghost2PV >= 100){

            this.ghost2PV = 100;
           
        }

        if (this.ghost2PV <= 0){

            this.ghost2PV = 0;
           
        }


        if (this.ghost2PV <= 0){

            this.batteryPickUp.create(this.ghost2.x,this.ghost2.y, 'batteryPickUp').setScale(1).refreshBody();
            this.ghost2Dead = true;


            setTimeout(() => {

                this.ghost2.destroy();
                
    
            }, 500);
        
        }


        // ghost 3

        if (this.ghost3PV > 90){

            this.ghost3.setAlpha(1);
           
        }

        if (this.ghost3PV >= 70 && this.ghost3PV < 90){

            this.ghost3.setAlpha(0.8);

        }

        if (this.ghost3PV >= 50 && this.ghost3PV < 70){

            this.ghost3.setAlpha(0.6);

        }

        if (this.ghost3PV >= 30 && this.ghost3PV < 50){

            this.ghost3.setAlpha(0.4);
           
        }

        if (this.ghost3PV >= 10 && this.ghost3PV < 30){

            this.ghost3.setAlpha(0.2);
        }

        if (this.ghost3PV <= 10){

            this.ghost3.setAlpha(0.1);
        }

        if (this.ghost3PV < 100){

            this.ghost3PV += 1;
        }   

        //Max PV des ennemis

        if (this.ghost3PV >= 100){

            this.ghost3PV = 100;
           
        }

        if (this.ghost3PV <= 0){

            this.ghost3PV = 0;
           
        }


        if (this.ghost3PV <= 0){

            this.batteryPickUp.create(this.ghost3.x,this.ghost3.y, 'batteryPickUp').setScale(1).refreshBody();
            this.ghost3Dead = true;


            setTimeout(() => {

                this.ghost3.destroy();
                
    
            }, 500);
        
        }


        // ghost 4

        if (this.ghost4PV > 90){

            this.ghost4.setAlpha(1);
           
        }

        if (this.ghost4PV >= 70 && this.ghost4PV < 90){

            this.ghost4.setAlpha(0.8);

        }

        if (this.ghost4PV >= 50 && this.ghost4PV < 70){

            this.ghost4.setAlpha(0.6);

        }

        if (this.ghost4PV >= 30 && this.ghost4PV < 50){

            this.ghost4.setAlpha(0.4);
           
        }

        if (this.ghost4PV >= 10 && this.ghost4PV < 30){

            this.ghost4.setAlpha(0.2);
        }

        if (this.ghost4PV <= 10){

            this.ghost4.setAlpha(0.1);
        }

        if (this.ghost4PV < 100){

            this.ghost4PV += 1;
        }   

        //Max PV des ennemis

        if (this.ghost4PV >= 100){

            this.ghost4PV = 100;
           
        }

        if (this.ghost4PV <= 0){

            this.ghost4PV = 0;
           
        }


        if (this.ghost4PV <= 0){

            this.batteryPickUp.create(this.ghost4.x,this.ghost4.y, 'batteryPickUp').setScale(1).refreshBody();
            this.ghost4Dead = true;


            setTimeout(() => {

                this.ghost4.destroy();
                
    
            }, 500);
        
        }


        // ghost 5

        if (this.ghost5PV > 90){

            this.ghost5.setAlpha(1);
           
        }

        if (this.ghost5PV >= 70 && this.ghost5PV < 90){

            this.ghost5.setAlpha(0.8);

        }

        if (this.ghost5PV >= 50 && this.ghost5PV < 70){

            this.ghost5.setAlpha(0.6);

        }

        if (this.ghost5PV >= 30 && this.ghost5PV < 50){

            this.ghost5.setAlpha(0.4);
           
        }

        if (this.ghost5PV >= 10 && this.ghost5PV < 30){

            this.ghost5.setAlpha(0.2);
        }

        if (this.ghost5PV <= 10){

            this.ghost5.setAlpha(0.1);
        }

        if (this.ghost5PV < 100){

            this.ghost5PV += 1;
        }   

        //Max PV des ennemis

        if (this.ghost5PV >= 100){

            this.ghost5PV = 100;
           
        }

        if (this.ghost5PV <= 0){

            this.ghost5PV = 0;
           
        }


        if (this.ghost5PV <= 0){

            this.batteryPickUp.create(this.ghost5.x,this.ghost5.y, 'goldPickUp').setScale(1).refreshBody();
            this.ghost5Dead = true;


            setTimeout(() => {

                this.ghost5.destroy();
                
    
            }, 500);
        
        }



        if (this.keyObtained == true){

            this.keyHUD.setVisible(true);

        }

        if (this.lampObtained == true){

            this.batteryText.setVisible(true);
            this.batteryHUD.setVisible(true);
            this.batteryText.setText(this.battery + '%');            

        }
        // Retour au bar 

        if (this.player.x >= 250 && this.player.x <= 280 &&  this.player.y >= 410 && this.player.y <= 530 && this.cursors2.e.isDown){

            this.playerSpawnX = 1260;

            this.playerSpawnY = 150;

            this.scene.start("bar", {health : this.health, battery : this.battery, gold : this.gold, spawnX : this.playerSpawnX, spawnY : this.playerSpawnY, gameStart : this.gameStart, lamp : this.lampObtained, crowbar : this.crowbarObtained, exit : this.exiting});


        }


        
        if (this.player.x >= 850 && this.player.x <= 900 &&  this.player.y >= 410 && this.player.y <= 560 && this.cursors2.e.isDown){

            this.playerLocation = 2;
            this.player.x = 1420;
            this.player.y = 470;
            this.lightLamp.x = this.player.x + 170
            this.lightLamp.y = this.player.y + 10
            this.lightLamp.angle = 0;


        }
        
        //porte barrée inaccessible

        if (this.player.x >= 2310 && this.player.x <= 2430 && this.player.y <= 290 && this.cursors2.e.isDown && this.doorBlocked == true && this.exiting < 2){

            
            this.doorBlockedMessage.setVisible(true);

            setTimeout(() => {

                this.doorBlockedMessage.setVisible(false);
            

            }, 3000);

        }

    

        if (this.player.x >= 2310 && this.player.x <= 2430 && this.player.y <= 290 && this.cursors2.e.isDown && this.doorBlocked == false ){

            this.playerLocation = 4;
            this.player.x = 2100;
            this.player.y = 1630;
            this.lightLamp.x = this.player.x + 170
            this.lightLamp.y = this.player.y + 10
            this.lightLamp.angle = 0;

        }

        if (this.player.x >= 1350 && this.player.x <= 1400 &&  this.player.y >= 410 && this.player.y <= 600 && this.cursors2.e.isDown){

            this.playerLocation = 1;
            this.player.x = 800;
            this.player.y = 490;
            this.lightLamp.x = this.player.x + 170
            this.lightLamp.y = this.player.y + 10
            this.lightLamp.angle = 0;


        }

        if (this.player.x >= 2965 && this.player.y >= 420 && this.player.y <= 520 && this.cursors2.e.isDown && this.exiting < 2){

            this.playerLocation = 3;
            this.player.x = 400;
            this.player.y = 1800;
            this.lightLamp.x = this.player.x + 170
            this.lightLamp.y = this.player.y + 10
            this.lightLamp.angle = 0;


        }

        // Porte accessible lorsque la clé est obtenue

        if (this.player.x >= 1220 && this.player.x <= 1320 && this.player.y >= 1200 && this.player.y <= 1250 && this.cursors2.e.isDown && this.keyObtained == true ){

            this.playerLocation = 4;
            this.keyHUD.setAlpha(0);
            this.player.x = 2730;
            this.player.y = 2730;
            this.lightLamp.x = this.player.x + 30
            this.lightLamp.y = this.player.y - 200
            this.lightLamp.angle = -90;


        }

        if (this.player.x >= 2045 && this.player.x <= 2130 && this.player.y >= 1625 && this.player.y <= 1645 && this.cursors2.e.isDown && this.crowbarObtained == true ){

            this.doorBarricade.destroy();
            this.doorBlocked = false;

            setTimeout(() => {

                
                this.playerLocation = 2;
                this.player.x = 2380;
                this.player.y = 250;
                this.lightLamp.x = this.player.x - 10
                this.lightLamp.y = this.player.y + 170
                this.lightLamp.angle = 90;
    
            }, 500);
            


        }

        //lampe torche keyboard

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
        
        if (this.cursors.shift.isUp){

            this.lightLamp.setVisible(false);
            this.ombre.setAlpha(0.8);
            this.lampUsed = false;
            
        }

        if (this.lampUsed == true) {

            this.lightLamp.setVisible(true);
            this.ombre.setAlpha(0.1);


    
        }

        if (this.lampUsed == false) {
            
            this.ombre.setAlpha(0.4);
            this.key.setVisible(false);

        }

        //caches du donjon 

        if (this.playerLocation == 1){

            this.cache1.setVisible(true);
            this.cache2.setVisible(false);
            this.cache3.setVisible(false);
            this.cache4.setVisible(false);


        }

        if (this.playerLocation == 2){

            this.cache1.setVisible(false);
            this.cache2.setVisible(true);
            this.cache3.setVisible(false);
            this.cache4.setVisible(false);


        }


        if (this.playerLocation == 3){

            this.cache1.setVisible(false);
            this.cache2.setVisible(false);
            this.cache3.setVisible(true);
            this.cache4.setVisible(false);


        }

        if (this.playerLocation == 4){

            this.cache1.setVisible(false);
            this.cache2.setVisible(false);
            this.cache3.setVisible(false);
            this.cache4.setVisible(true);


        }

        // this.playerXtext.setText(this.player.x);

        // this.playerYtext.setText(this.player.y);

        
        this.timer += delta;     
        if (this.lampObtained == true && this.lampUsed == true && this.timer > Phaser.Math.Between(800, 3000)) {

            
            this.battery -= 1;

            this.batteryText.setText(this.battery  + '%', { font: '45px Courier'});

            this.timer = 0;
        
        
        }
        

    }


    displayKey(lightLamp, key){

        key.setVisible(true);


    }

    displayGold(lightLamp, gold){

        if (this.hiddenGoldBasement.visible == false){


            gold.setVisible(true);

        }


    }

    getKey(player, key,enemy){

        if (key.visible == true){

            this.keyObtained = true;

            key.destroy();

            
        

        }

    }

    displayCrowbar(lightLamp, crowbar){

        crowbar.setVisible(true);


    }

    getCrowbar(player, crowbar){

        if (crowbar.visible == true){

            this.crowbarObtained = true;

            crowbar.destroy();

        }

    }

    damagePlayer1(){

        if(this.player.invincible == false && this.ghost1.visible == true){

            this.health -= 10;
            this.player.invincible = true;
        }

    }

    damagePlayer2(){

        if(this.player.invincible == false && this.ghost2.visible == true){

            this.health -= 10;
            this.player.invincible = true;
        }

    }

    damagePlayer3(){

        if(this.player.invincible == false && this.ghost3.visible == true){

            this.health -= 10;
            this.player.invincible = true;
        }

    }

    damagePlayer4(){

        if(this.player.invincible == false && this.ghost4.visible == true){

            this.health -= 10;
            this.player.invincible = true;
        }

    }

    damagePlayer5(){

        if(this.player.invincible == false && this.ghost5.visible == true){

            this.health -= 10;
            this.player.invincible = true;
        }

    }

    damageGhost1(lightLamp, ghost){

        if (lightLamp.visible == true && ghost.visible == true){
            this.ghost1PV -= 2;

        }

    }

    damageGhost2(lightLamp, ghost){

        if (lightLamp.visible == true && ghost.visible == true){
            this.ghost2PV -= 2;

        }

    }

    damageGhost3(lightLamp, ghost){

        if (lightLamp.visible == true && ghost.visible == true){
            this.ghost3PV -= 2;

        }

    }

    damageGhost4(lightLamp, ghost){

        if (lightLamp.visible == true && ghost.visible == true){
            this.ghost4PV -= 2;

        }

    }

    damageGhost5(lightLamp, ghost){

        if (lightLamp.visible == true && ghost.visible == true){
            this.ghost5PV -= 2;

        }

    }


    getGold(player, goldPickUp){

        if (goldPickUp.visible == true){

            this.gold += 5;

            goldPickUp.destroy();

        }

    }

    getBattery(player, batteryPickUp){

        if (batteryPickUp.visible == true){

            this.battery = 100;

            batteryPickUp.destroy();

        }

    }

    keyDisplay(key,place){

        key.setVisible(true);
        key.x = place.x + 70
        key.y = place.y - 100


    }


    
    
};