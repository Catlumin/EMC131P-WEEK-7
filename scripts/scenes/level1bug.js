var player;
var enemy;
var cursors;
//var shoot;
var score = 0;
var scoreText;
var playerTime = 0;
var minutes = 0;
var seconds = 0;
var playerTimeText;
//var bullets;
//var lastFired = 0;
var clickSoundEffect;
//var bulletCooldown = 200;
var bulletSound;
var enemies;
var enemyHitSFX;
var gameBGM;
var playerHealth = 3;
var platforms;
class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }


preload ()
{
    //L-O-A-D A-S-S-E-T-S
    //change Everything about this
    this.load.image('bg', 'assets/background/game_background_4.png');
    this.load.image('frog', 'assets/enemy/frog-x4.gif');
    this.load.image('bullet', 'assets/misc/fire-ball.gif');
    this.load.image('ground', 'assets/misc/platform.png');
    //change alr
    this.load.spritesheet('wizard', 'assets/spritesheet/AnimationSheet_Character.png', { frameWidth: 32, frameHeight: 32 });
    this.load.audio('pop', 'assets/sounds/Fire_AttackF1.wav');
    this.load.audio('gameSFX', 'assets/sounds/game.wav');
    this.load.audio('hitSFX', 'assets/sounds/Splat3.wav');
}

create ()
{

    //P-L-A-T-F-O-R-M-S

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    // S-O-U-N-D-S
    bulletSound = this.sound.add('pop');

    gameBGM = this.sound.add('gameSFX');
    gameBGM.loop = true;
    gameBGM.play();

    enemyHitSFX = this.sound.add('hitSFX');

    // I-M-A-G-E-S
    this.add.image(400, 300, 'bg');

    
    // P-L-A-Y-E-R 
    player = this.physics.add.sprite(400, 680, 'wizard');
    player.setCollideWorldBounds(true);
    player.setGravity(0,0);
    player.setBounce(0.2);

    this.anims.create({
        key: 'stable',
        frames: [ { key: 'wizard', frame: 0 } ],
        frameRate: 10,
        repeat: -1
    });
    // C-O-N-T-R-O-L-S
    cursors = this.input.keyboard.createCursorKeys();

    // T-E-X-T
    scoreText = this.add.text(30, 50, 'Score: 0', { fontSize: '32px', fill: '#fff' }); 
    playerTimeText = this.add.text(550, 50, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }); 






/*
    // E-N-E-M-Y S-P-A-W-N
      enemy = this.physics.add.group({
        defaultKey: {key: 'frog'},
        maxSize: 2000,
        allowGravity: true,
        runChildUpdate: true,
        worldBounds: true,
        debug: true  
    });

    enemy.createMultiple({
        key: 'frog',
        repeat: 5,
        setXY: {
            x: 100,
            y: 0,
            stepX: 100
        },
        
    })

    enemy.children.iterate(function(child) {
        child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(200, 400)).setScale(0.5);;
    });
*/
    // C-O-L-L-I-D-E-R
    //this.physics.add.overlap(bullets, enemy, onHit, null, this);
    //this.physics.add.overlap(player, enemy, collideEnemyAndBullet, null, this);
    //this.physics.add.overlap(player, bullets, collideEnemyAndBullet, null, this);
}



update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    timer();
}
}

