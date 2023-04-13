class menuScene extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }

    preload(){
        
        this.load.image('play','assets/misc/playButton.jpg');
        this.load.image('creditsButton','assets/misc/creditsButton.jpg');
        this.load.image('menuBackground', 'assets/background/game_background_1.png');
        this.load.image('exitMain', 'assets/misc/ExitButton.jpg');
      

    }

    create(){
    
        this.add.image(400, 300, 'menuBackground').setScale(1);
        const playButton = this.add.image(400,250,'play').setScale(0.7);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {this.scene.start('level1');
        score = 0;
        playerTime = 0 ;
        });
        
        const creditButton = this.add.image(400,350,'creditsButton').setScale(0.45);
        creditButton.setInteractive();
        creditButton.on('pointerdown', () => {this.scene.start('credits')});
        
        const exitGame = this.add.image(400,450,'exitMain').setScale(.6);
        exitGame.setInteractive();
        exitGame.on('pointerdown', () => {alert('Game Exited')});

       
    }

    update(){
    }
}