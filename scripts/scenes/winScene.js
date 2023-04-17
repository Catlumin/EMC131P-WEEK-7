class winScene extends Phaser.Scene{
    constructor(){
        super("winScene");

    }
    preload(){
     
        this.load.image('resetWin','assets/misc/retryButton.jpg');
        this.load.image('returnMain','assets/misc/ExitButton.jpg');
        this.load.image('winBg', 'assets/background/game_background_4.png');
        
    }
    create() {

        //SCOREBOARD
        const playerScore = score;
        const playerMinutes = minutes;
        const playerSeconds = seconds.toString().padStart(2, '0');
        const playerChestScore = chestSmashed;
        this.add.image(400, 300, 'winBg').setScale(1.5);
        const gameOverText = this.add.text(400, 300, 'You Won!\nScore: '+ playerScore + '\nTime Survived: '+ playerMinutes +':'+ playerSeconds +'\nChest Smashed: ' + playerChestScore , {
            fontFamily: 'Arial',
            fontSize: '32px',
            fill: '#fff'
        });
        gameOverText.setOrigin(0.5);
        
        //BUTTONS
        const resetButton = this.add.image(300,500,'resetWin').setScale(.4);
        resetButton.setInteractive();
        resetButton.on('pointerdown', () => {this.scene.start('level1');
        score = 0;
        playerTime = 0;
        chestSmashed = 0;
        });
        const returnMainMenu = this.add.image(500,500,'returnMain').setScale(.4);
        returnMainMenu.setInteractive();
        returnMainMenu.on('pointerdown', () => {this.scene.start('menuScene')});
    }
    update(){
        
    }
}