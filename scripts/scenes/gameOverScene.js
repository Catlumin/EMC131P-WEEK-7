class gameOverScene extends Phaser.Scene{
    constructor(){
        super("endScene");

    }
    preload(){
     
        this.load.image('reset','assets/misc/retryButton.jpg');
        this.load.image('return','assets/misc/ExitButton.jpg');
        this.load.image('gameOverBg', 'assets/background/game_background_3.1.png');
        
    }
    create() {

        // S-C-O-R-E-B-O-A-R-D
        const playerScore = score;
        const playerMinutes = minutes;
        const playerSeconds = seconds.toString().padStart(2, '0');

        this.add.image(400, 300, 'gameOverBg');
        const gameOverText = this.add.text(400, 300, 'Game Over!\nScore: '+ playerScore + '\nTime Survived: '+ playerMinutes +':'+ playerSeconds , {
            fontFamily: 'Arial',
            fontSize: '32px',
            fill: '#fff'
        });
        gameOverText.setOrigin(0.5);
        
        // B-U-T-T-O-N-S
        const resetButton = this.add.image(300,500,'reset').setScale(.4);
        resetButton.setInteractive();
        resetButton.on('pointerdown', () => {this.scene.start('level1');
        score = 0;
        playerTime = 0;
        });
        const returnMainMenu = this.add.image(500,500,'return').setScale(.4);
        returnMainMenu.setInteractive();
        returnMainMenu.on('pointerdown', () => {this.scene.start('menuScene')});
    }
    update(){
        
    }
}
