class village1 extends Phaser.Scene {
    constructor() {
        
        super("village1");
    }
    //Récupération des données entre chaque scène
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

    // Si la musique ne s'exécute pas, essayez d'utiliser un autre navigateur que Chrome.

    preload() {


        this.load.image('bg', 'assets/ground.png');
        this.load.image('inventory-bg', 'assets/inventory-bg.png');
        this.load.image('barriere', 'assets/Barrière.png');
        this.load.image('bar', 'assets/bar.png');
        this.load.image('atelier', 'assets/Atelier.png');
        this.load.image('building1', 'assets/Batiment1.png');
        this.load.image('building2', 'assets/Batiment2.png');
        this.load.image('building3', 'assets/Batiment3.png');
        this.load.image('building4', 'assets/Other.png');
        this.load.image('lamp', 'assets/Lamp.png');

        this.load.image('antenna', 'assets/Antenna.png');
        this.load.image('antennaFront', 'assets/AntennaFront.png');
        this.load.image('barBehind', 'assets/barBehind.png');
        this.load.image('building1Behind', 'assets/Batiment1Behind.png');
        this.load.image('building2Behind', 'assets/Batiment2Behind.png');
        this.load.image('building3Behind', 'assets/Batiment3Behind.png');
        this.load.image('building4Behind', 'assets/OtherBehind.png');


        this.load.image('light', 'assets/test.png');

        this.load.image('goldPickUp', 'assets/goldHUD.png');

        this.load.image('batteryPickUp', 'assets/batteryHUD.png');


        this.load.image('keyE', 'assets/keyE.png');

        
        
        //Spritesheet 

        this.load.spritesheet('perso','assets/persoSpritesheet.png',
        { frameWidth: 128, frameHeight: 128 });

        



        //this.load.image('perso', 'assets/perso.png');

        this.load.image('shadows', 'assets/shadows.png');

        this.load.image('planks_barriere', 'assets/planks_barriere.png');


        // loading musique village

        this.load.audio('village', ['assets/music/village theme.ogg']);

        // load son village

        this.load.audio('villageAmbiance', ['assets/sounds/village_ambiance.wav']);



        //HUD 

        this.load.image('healthHUD', 'assets/healthHUD.png');
        this.load.image('goldHUD', 'assets/goldHUD.png');
        
        this.load.image('batteryHUD', 'assets/batteryHUD.png');

        this.load.image('mission1', 'assets/mission1.png');
        this.load.image('mission2', 'assets/mission2.png');

        this.load.image('hudLamp', 'assets/lampKey.png');
        this.load.image('hudCrowbar', 'assets/crowbarKey.png');
        this.load.image('closedDoorMessage', 'assets/messages/closedDoor.png');

        this.load.image('crowbarNeeded', 'assets/messages/crowbarNeeded.png');

        this.load.image('congratulations', 'assets/messages/congratulations.png');

        this.load.image('cmd', 'assets/messages/cmd.png');

        // Backup affichage radar

        this.load.image('radar0', 'assets/radar/0.png');

        this.load.image('radar1', 'assets/radar/1.png');
        this.load.image('radar2', 'assets/radar/2.png');
        this.load.image('radar3', 'assets/radar/3.png');
        this.load.image('radar4', 'assets/radar/4.png');
        this.load.image('radar5', 'assets/radar/5.png');
        this.load.image('radar6', 'assets/radar/6.png');
        this.load.image('radar7', 'assets/radar/7.png');
    }
    create() {

       

        // reset du début de jeu
        if (this.gameStart != 1){

            this.gameStart = 0;

        
        }

        //Définir une seule fois les variables 

        if (this.gameStart == 0){

            this.playerSpawnX = 1500;
            this.playerSpawnY = 1200;
            

            this.health = 100;

            this.battery = 100;

            this.gold = 20;

            this.crowbarObtained = false;

            this.gameStart = 1;

            // trigger 1 fois la musique

            this.village_theme = this.sound.add('village');


            this.village_ambiance = this.sound.add('villageAmbiance');


            this.village_theme.loop = true;


            this.village_ambiance.loop = true;

            

            this.cmdDisplay = this.add.image(1470, 680, 'cmd').setScale(0.8).setScrollFactor(0).setVisible(true);

            this.village_ambiance.play();

            this.village_theme.play();


            

        }
        
        // Création du décor

        this.colliders = this.physics.add.staticGroup();
        
        this.add.image(1500, 1000, 'bg').setScale(1);

        this.planks = this.add.image(195, 310, 'planks_barriere').setScale(1).setVisible(true);
        this.add.image(1500, 200, 'barriere').setScale(1);

        
        this.add.image(630, 270, 'atelier').setScale(0.6);
        this.add.image(2700, 950, 'bar').setScale(0.6);
        this.colliders.create(250, 1000, 'building1').setScale(0.6).setSize(380, 250).setOffset(155, 160);
        this.colliders.create(480, 1650, 'building2').setScale(0.6).setSize(380, 250).setOffset(155, 160);
        this.add.image(1300, 500, 'antenna').setScale(1);
        this.add.image(1800, 220, 'building3').setScale(0.6);
        this.add.image(1500, 1650, 'building4').setScale(0.6);
        this.add.image(2350, 300, 'building2').setScale(0.6);

        this.add.image(480, 1650, 'building2').setScale(0.6);

        this.keyE = this.add.image(0, 0, 'keyE').setScale(0.4).setVisible(false);

        
        // Création des touches
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('e');

        
        this.player = this.physics.add.sprite(this.playerSpawnX, this.playerSpawnY, 'perso').setScale(1).setSize(70, 120).setOffset(25, 10);

        this.add.image(1580, 930, 'shadows').setScale(1);




        if (this.lampObtained != true && this.lookingForLamp == true){

            this.lampObtained = false;
            this.lampItem = this.physics.add.image(370, 370, 'lamp').setScale(0.6).setVisible(true);

        }

       // Animations player

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:4}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'downIdle',
            frames: this.anims.generateFrameNumbers('perso', {start:2,end:2}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:9}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'upIdle',
            frames: this.anims.generateFrameNumbers('perso', {start:7,end:7}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:10,end:14}),
            frameRate: 8,
            repeat: -1
        });


        this.anims.create({
            key: 'rightIdle',
            frames: this.anims.generateFrameNumbers('perso', {start:12,end:12}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:15,end:19}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'leftIdle',
            frames: this.anims.generateFrameNumbers('perso', {start:17,end:17}),
            frameRate: 8,
            repeat: -1
        });


        



        //Victoire 

        this.win = false;

        //Manette

        this.isConnected = true;
        this.gamepad;
        

        
        //Collectibles 

        this.goldPickUp = this.physics.add.staticGroup();
        this.goldPickUp.create(1800, 1200, 'goldPickUp').setScale(1).refreshBody();

        this.batteryPickUp = this.physics.add.staticGroup();
        this.batteryPickUp.create(800, 875, 'batteryPickUp').setScale(1).refreshBody().setVisible(false);


        this.lightLamp = this.physics.add.image(this.player.x, this.player.y, 'light').setScale(1).setVisible(false);
        
        

        this.cameras.main.setBounds(0, 0, 3000, 2000);
        
        this.cameras.main.startFollow(this.player);

        //Autre sprites pour simuler l'axe z

        this.add.image(1283, 265, 'antennaFront').setScale(1);

        this.add.image(2700, 950, 'barBehind').setScale(0.6);
        this.add.image(250, 1000, 'building1Behind').setScale(0.6);
        this.add.image(480, 1650, 'building2Behind').setScale(0.6);
    
        this.add.image(1800, 220, 'building3Behind').setScale(0.6);
        this.add.image(1500, 1650, 'building4Behind').setScale(0.6);
        this.add.image(2350, 300, 'building2Behind').setScale(0.6);

        this.add.image(480, 1650, 'building2Behind').setScale(0.6);

        //HUD
        
        // this.playerXtext = this.add.text(300, 400, this.player.x).setScrollFactor(0);

        // this.playerYtext = this.add.text(300, 500, this.player.y).setScrollFactor(0);

        
        this.healthHUD = this.add.image(960, 540, 'healthHUD').setScale(1).setScrollFactor(0).setVisible(true);

        //Affichage des missions

        this.mission1 = this.add.image(1720, 350, 'mission1').setScale(0.8).setScrollFactor(0).setAlpha(0.7).setVisible(true);

        this.mission2 = this.add.image(1720, 300, 'mission2').setScale(0.8).setScrollFactor(0).setAlpha(0.7).setVisible(false);

        this.hudLamp = this.add.image(1800, 900, 'hudLamp').setScale(0.8).setScrollFactor(0).setAlpha(0.8).setVisible(false);
        this.hudCrowbar = this.add.image(1815, 750, 'hudCrowbar').setScale(0.8).setScrollFactor(0).setAlpha(0.8).setVisible(false);


        this.healthText = this.add.text(150, 130, this.health + '%', { font: '45px Courier'}).setScrollFactor(0);
        this.goldText = this.add.text(65, 850, this.gold + 'G'  ,{ font: '45px Courier'}).setScrollFactor(0).setVisible(true);
        this.batteryText = this.add.text(65, 760, this.battery  + '%', { font: '45px Courier'}).setScrollFactor(0).setVisible(false);

        this.goldHUD = this.add.image(30, 875, 'goldHUD').setScale(1).setScrollFactor(0).setVisible(true);
        this.batteryHUD = this.add.image(30, 785, 'batteryHUD').setScale(1).setScrollFactor(0).setVisible(false);

        // Création des frames du radar ( backup )

        this.radar0 = this.add.sprite(1750, 110, 'radar0').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar1 = this.add.sprite(1750, 110, 'radar1').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar2 = this.add.sprite(1750, 110, 'radar2').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar3 = this.add.sprite(1750, 110, 'radar3').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar4 = this.add.sprite(1750, 110, 'radar4').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar5 = this.add.sprite(1750, 110, 'radar5').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar6 = this.add.sprite(1750, 110, 'radar6').setScale(0.6).setScrollFactor(0).setVisible(false);
        this.radar7 = this.add.sprite(1750, 110, 'radar7').setScale(0.6).setScrollFactor(0).setVisible(false);


        this.doorClosed = this.add.image(1470, 680, 'closedDoorMessage').setScale(0.8).setVisible(false);

        this.crowbarNeeded = this.add.image(1470, 680, 'crowbarNeeded').setScale(0.8).setVisible(false).setScrollFactor(0);

        this.congratulations = this.add.image(1470, 680, 'congratulations').setScale(0.8).setVisible(false).setScrollFactor(0);







        //Colliders & Conséquences
        
        this.physics.add.collider(this.player, this.lampItem, this.getLamp,null,this);

        this.physics.add.collider(this.player, this.goldPickUp, this.getGold,null,this);

        this.physics.add.collider(this.player, this.batteryPickUp, this.getBattery,null,this);


        this.timer = 0;  

        

    }

    
    update(time,delta) {
        playerControls(this.player,this.cursors);
        //playerControlsGamepad(this.player,this.gamepad);

        this.radarDisplay(this.radar);

        this.goldText.setText(this.gold); 

        if (this.cmdDisplay.visible == true){
                
            setTimeout(() => {

                this.cmdDisplay.setVisible(false);
            

            }, 6000);
        }

        


        this.input.gamepad.once('connected', function (pad) {

            this.gamepad = pad;
            this.isConnected = true;

        });

        if ( this.lampObtained == true) {

            this.hudLamp.setVisible(true);

        }
        

        if ( this.crowbarObtained == true && this.player.x >= 160 && this.player.x <= 275 &&  this.player.y < 400) {

            this.hudCrowbar.setVisible(true);

        }

        if ( this.player.x >= 160 && this.player.x <= 275 &&  this.player.y < 400 && this.cursors2.e.isDown && this.crowbarObtained == false) {

            this.crowbarNeeded.setVisible(true);

            console.log('test');


            setTimeout(() => {

                this.crowbarNeeded.setVisible(false);
            

            }, 3000);

        }

        // Afficher touche E quand interaction possible 

        if ( this.player.x >= 160 && this.player.x <= 275 &&  this.player.y < 400 ) {

            this.keyDisplay(this.keyE, this.player)


            setTimeout(() => {

                this.keyE.setVisible(false);
            

            }, 3000);

        }

        // Validation de la fin du niveau en retirant les planches du mur 


        if ( this.player.x >= 160 && this.player.x <= 275 &&  this.player.y < 400 && this.cursors2.e.isDown && this.crowbarObtained == true) {

            this.planks.setVisible(false);
            this.congratulations.setVisible(true);

            setTimeout(() => {

                this.win = true;

                if(this.win == true) {

                    this.scene.scene.start("main_menu");
                }

            }, 3000);

        }

        // changement scène vers le bar


        if (this.player.x >= 2630 && this.player.x <= 2750 && this.player.y >= 1160 && this.player.y <= 1200) {

            this.keyDisplay(this.keyE, this.player)


            setTimeout(() => {

                this.keyE.setVisible(false);
            

            }, 3000);

        }
        
        if (this.player.x >= 2630 && this.player.x <= 2750 && this.player.y >= 1160 && this.player.y <= 1200 && this.cursors2.e.isDown){

            this.playerSpawnX = 500;

            this.playerSpawnY = 500;

            this.scene.start("bar", {health : this.health, battery : this.battery, gold : this.gold, spawnX : this.playerSpawnX, spawnY : this.playerSpawnY, gameStart : this.gameStart, lamp : this.lampObtained, crowbar : this.crowbarObtained});

        }

        if (this.lampObtained == true){

            this.batteryText.setVisible(true);
            this.batteryHUD.setVisible(true);
            this.batteryText.setText(this.battery + '%');            

        }


        

        // this.playerXtext.setText(this.player.x);

        // this.playerYtext.setText(this.player.y);
        
        //lampe torche keyboard

        if (this.cursors.shift.isUp){

            this.lightLamp.setVisible(false);
            
            this.lampUsed = false;
            
        }

        // Déplacement et rotation du sprite de lumière dans les 4 directions

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


        // Diminution progressive de la batterie de la lampe torche 

        this.timer += delta;     
        if (this.lampObtained == true && this.lampUsed == true && this.timer > Phaser.Math.Between(800, 3000)) {

            
            this.battery -= 1;

            this.batteryText.setText(this.battery  + '%', { font: '45px Courier'});

            this.timer = 0;
        
        
        }
    

        //Batteries collectibles

        if (this.lampObtained == false) {

            this.batteryPickUp.setVisible(false)
            

        }

        if (this.lampObtained == true) {

            this.batteryPickUp.setVisible(true)


        }

        // Cacher les objectifs après quelques secondes

        if ( this.mission1.visible == true){

            setTimeout(() => {

                this.mission1.setVisible(false);
                
    
    
    
            }, 10000);


        }


    }

    // Fonction d'interactions entre les éléments


    getLamp(player, lampItem){

        if (lampItem.visible == true){

            this.lampObtained = true;

            lampItem.destroy();

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

    radarDisplay(radar){

        // Radar locations : affichage des placements du joueur ( backup )
        if (this.player.x >= 0 && this.player.x < 400 && this.player.y > 0 && this.player.y < 500 ) {

            this.radar0.setVisible(true);
            this.radar1.setVisible(false);
            this.radar2.setVisible(false);
            this.radar3.setVisible(false);
            this.radar4.setVisible(false);
            this.radar5.setVisible(false);
            this.radar6.setVisible(false);
            this.radar7.setVisible(false);
            


        }

        if (this.player.x > 400 && this.player.x < 1000 && this.player.y > 0 && this.player.y < 700 ) {

            this.radar0.setVisible(false);

            this.radar1.setVisible(true);
            this.radar2.setVisible(false);
            this.radar3.setVisible(false);
            this.radar4.setVisible(false);
            this.radar5.setVisible(false);
            this.radar6.setVisible(false);
            this.radar7.setVisible(false);
            


        }

        if (this.player.x >= 1000 && this.player.y > 0 && this.player.y > 0 && this.player.y < 1000 ) {

            this.radar0.setVisible(false);

            this.radar1.setVisible(false);
            this.radar2.setVisible(true);
            this.radar3.setVisible(false);
            this.radar4.setVisible(false);
            this.radar5.setVisible(false);
            this.radar6.setVisible(false);
            this.radar7.setVisible(false);
            


        }

        if (this.player.x >= 2100 && this.player.y >= 1100) {

            this.radar1.setVisible(false);
            this.radar2.setVisible(false);
            this.radar3.setVisible(true);
            this.radar4.setVisible(false);
            this.radar5.setVisible(false);
            this.radar6.setVisible(false);
            this.radar7.setVisible(false);
            this.radar0.setVisible(false);

            


        }

        if (this.player.x < 2100 && this.player.y >= 1100) {

            this.radar1.setVisible(false);
            this.radar2.setVisible(false);
            this.radar3.setVisible(false);
            this.radar4.setVisible(true);
            this.radar5.setVisible(false);
            this.radar6.setVisible(false);
            this.radar7.setVisible(false);
            this.radar0.setVisible(false);

            


        }

        if (this.player.x < 1000 && this.player.y >= 1100) {

            this.radar1.setVisible(false);
            this.radar2.setVisible(false);
            this.radar3.setVisible(false);
            this.radar4.setVisible(false);
            this.radar5.setVisible(true);
            this.radar6.setVisible(false);
            this.radar7.setVisible(false);
            this.radar0.setVisible(false);

        

        }

        


        if (this.player.x > 0 && this.player.x < 1000 && this.player.y >= 700  && this.player.y < 1250 ) {

            this.radar1.setVisible(false);
            this.radar2.setVisible(false);
            this.radar3.setVisible(false);
            this.radar4.setVisible(false);
            this.radar5.setVisible(false);
            this.radar6.setVisible(true);
            this.radar7.setVisible(false);
            this.radar0.setVisible(false);



        }




    }

    
};