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
var xEnemyPos = [206,494,323,172,489,144];
var yEnemyPos = [720,648,498,498,348,148];
var goal;
var coin;
var coinPosX = [620,81,752];
var coinPosY = [668,518,188];
class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }

    preload (){
        this.load.image('bg', 'assets/background/background_cave.png');
        this.load.image('frog', 'assets/enemy/frog-x4.gif');
        this.load.image('bullet', 'assets/misc/fire-ball.gif');
        this.load.image('ground', 'assets/misc/platform.png');
        this.load.image('flag', 'assets/misc/red_barrel.png');
        this.load.image('coins', 'assets/misc/crate.png');
        this.load.spritesheet('wizard', 'assets/spritesheet/AnimationSheet_Character.png', { frameWidth: 32, frameHeight: 32 });
        
    }
    create(){
    //BACKGROUND
    this.add.image(400, 300, 'bg').setScale(5);


    platforms = this.physics.add.staticGroup();

    platforms.create(100, 790, 'ground');
    platforms.create(600, 400, 'ground');
    platforms.create(50, 200, 'ground');
    platforms.create(750, 220, 'ground');
    platforms.create(200,550, 'ground');
    platforms.create(550,700, 'ground');
    platforms.setTint(0x0f137d);
    //GOAL
    goal = this.physics.add.group({
        key: 'flag',
        repeat: 0,
        setXY:  {x:0,y:168, stepX: 10}
    });
  
    //PLAYER
    player = this.physics.add.sprite(100, 740, 'wizard');
    player.setBounce(0.2);
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2.5);
    this.cameras.main.setLerp(0.1, 0.1);
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
    this.physics.add.overlap(player, enemy, collideEnemies, null, this);
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
        timer();
        console.log('player X '+ player.x + 'player Y ' + player.y);
        playerOnVoid(this);
    }
}