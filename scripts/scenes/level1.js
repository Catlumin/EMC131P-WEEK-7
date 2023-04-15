var player;
var enemy;
var flag;
var score = 0;
var scoreText;
var playerTime = 0;
var minutes = 0;
var seconds = 0;
var playerTimeText;
var gameBGM;
var platforms;
var cursors;
var playerHP = 3;
var playerTextHP;
var xEnemyPos = [548,958,1234,1594,261,1955];
var yEnemyPos = [760,605,760,760,760,599];
var goal;
var coin;
var coinPosX = [1047,405,1770];
var coinPosY = [760,760,760];
var splatEnemy;
var gameBGM;
var playerIsHit;
var crateCollideSFX;
class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }

    preload (){
        this.load.image('bg', 'assets/background/background_cave.png');
        this.load.image('frog', 'assets/enemy/frog-x4.gif');
        this.load.image('bullet', 'assets/misc/fire-ball.gif');
        this.load.image('platform', 'assets/misc/platform.png')
        this.load.image('flag', 'assets/misc/red_barrel.png');
        this.load.image('coins', 'assets/misc/crate.png');
        this.load.spritesheet('wizard', 'assets/spritesheet/AnimationSheet_Character.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('splat', 'assets/sounds/Splat3.wav');
        this.load.audio('levelBGM', 'assets/sounds/in-the-wreckage.wav');
        this.load.audio('hit', 'assets/sounds/03_Step_grass_03.wav');
        this.load.audio('crateSFX', 'assets/sounds/03_crate_open_1.wav');
        
    }
    create(){
    //BACKGROUND
    this.add.image(400, 300, 'bg').setScale(5).setScrollFactor(0);

    //PLATFORM
    platforms = this.physics.add.staticGroup();
    platforms.create(100, 800, 'platform').setScale(1);
    platforms.create(500, 800, 'platform').setScale(1);
    platforms.create(1200, 800, 'platform').setScale(1);
    platforms.create(1000, 650, 'platform').setScale(1);
    platforms.create(1600, 800, 'platform').setScale(1);
    platforms.create(2000, 650, 'platform').setScale(1);

    //SOUND
    splatEnemy = this.sound.add('splat');
    playerIsHit = this.sound.add('hit');
    gameBGM  = this.sound.add('levelBGM');
    gameBGM.play({
        loop: true
    });
    playerIsHit = this.sound.add('hit');
    crateCollideSFX = this.sound.add('crateSFX');
    //GOAL
    goal = this.physics.add.group({
        key: 'flag',
        repeat: 0,
        setXY:  {x:2130,y:550, stepX: 0}
    });
  
    //PLAYER
    player = this.physics.add.sprite(100, 740, 'wizard');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.world.setBoundsCollision(true, false, false, true);

    //CAMERA
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2.5);
    this.cameras.main.setLerp(0.1, 0.1);
    this.cameras.main.setBounds(0,0, this.widthInPixels, this.heightInPixels);
      //COIN
      coin = this.physics.add.group({
        key: 'coins',
        repeat: 2,
        setXY:  {x: 0,
                 y: 0,
                 stepX: 40 }
    })
    coin.children.iterate(function (child, index){
        child.x = coinPosX[index];
        child.y = coinPosY[index];
        child.setScale(1);
        child.setGravity(0);
    });
    //ENEMY
    enemy = this.physics.add.group({
        key: 'frog',
        repeat: 5,
        setXY: { x: 0, 
                 y: 0, 
                 stepX: 40 }
    });
    enemy.children.iterate(function (child, index) {
        child.x = xEnemyPos[index];
        child.y = yEnemyPos[index];
        child.setScale(.8);
    });

  

    //SCORE TEXT & GAME TIME
    scoreText = this.add.text(250, 380, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setScale(.5);
    playerTimeText = this.add.text(450, 380, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }).setScale(.5);
    playerTextHP = this.add.text(250, 400, 'Health Left : 3', { fontSize: '32px', fill: '#fff' }).setScale(.5);
    scoreText.setScrollFactor(0);
    playerTimeText.setScrollFactor(0);
    playerTextHP.setScrollFactor(0);

    //KEYS
    cursors = this.input.keyboard.createCursorKeys();
    //COLLIDER
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(goal, platforms);
    this.physics.add.collider(coin, platforms);
    this.physics.add.overlap(player,enemy, collideEnemies,null, this);
    this.physics.add.overlap(player,goal,getFlag,null,this);
    this.physics.add.overlap(player,coin,getCoin,null,this);
    }
    update(){
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.flipX = true;
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.flipX = false;
        }
        else
        {
            player.setVelocityX(0);
        }
    
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
            
        }
        //TIMER
        timer();
        console.log('Player X: ' + player.x + ' Plyer Y: ' + player.y)
        //Check if player on Void
        playerOnVoid(this);
    }
}