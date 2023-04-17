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
var cursors;
var playerHP = 3;
var playerTextHP;
var xEnemyPos = [172,314,263,535,609,871];
var yEnemyPos = [238,274,203,165,257,255];
var coin;
var coinPosX = [180,273,444,775,951];
var coinPosY = [147,274,237,292,309];
var splatEnemy;
var playerIsHit;
var crateCollideSFX;
var worldLayer;
var acidLayer;
var goal;
var chestSmashed = 0;
var chestCollectedText;
var currentStage = 0; 
class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
        
    }

    preload (){
        this.load.image('bg', 'assets/background/Flat Night 2 BG.png');
        this.load.image('frog', 'assets/enemy/frog-x4.gif');
        this.load.image('bullet', 'assets/misc/fire-ball.gif');
        this.load.image('platform', 'assets/misc/platform.png')
        this.load.image('flag', 'assets/misc/red_barrel.png');
        this.load.image('coins', 'assets/misc/tile_0061.png');
        this.load.spritesheet('wizard', 'assets/spritesheet/AnimationSheet_Character.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('splat', 'assets/sounds/Splat3.wav');
        this.load.audio('levelBGM', 'assets/sounds/in-the-wreckage.wav');
        this.load.audio('hit', 'assets/sounds/03_Step_grass_03.wav');
        this.load.audio('crateSFX', 'assets/sounds/03_crate_open_1.wav');
        this.load.image('tiles', 'assets/spritesheet/tilemap_packed.png');
        this.load.tilemapTiledJSON('map1', 'assets/maps/map1.json');
    }
    create(){
    //BACKGROUND
    let bg = this.add.image(400, 300, 'bg');
    bg.setScrollFactor(0);
    //MAP
    const map = this.make.tilemap({key : 'map1'});
    const tileSet = map.addTilesetImage('mapcompact', 'tiles');
    worldLayer =  map.createLayer('worldLayer', tileSet);
    worldLayer.setCollisionByExclusion([-1]);
    acidLayer = map.createLayer('acidLayer', tileSet);
    acidLayer.setCollisionByExclusion([-1]);
    map.createLayer('backGroundObject', tileSet);
    flag = map.createLayer('flag', tileSet);
    flag.setCollisionByExclusion([-1]);
   
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
        setXY:  {x:887,y:167, stepX: 0}
    });
  
    //PLAYER
    player = this.physics.add.sprite(0, 237, 'wizard');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setGravity(0,0);
    player.setScale(0.8);
    this.physics.world.setBoundsCollision(true, false, false, false);

    //CAMERA
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2.5);
    this.cameras.main.setLerp(0.1, 0.1);
    this.cameras.main.setBounds(0,0, this.widthInPixels, this.heightInPixels);
    //COIN
    coin = this.physics.add.group({
        key: 'coins',
        repeat: 4,
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
        child.setScale(.2);
        child.flipX = true;
        child.body.immovable = true;
    });

    //SCORE TEXT & GAME TIME
    scoreText = this.add.text(250,190, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setScale(.3);
    chestCollectedText = this.add.text(250, 200, 'Chest Smashed: 0', { fontSize: '32px', fill: '#fff' }).setScale(.3);
    playerTimeText = this.add.text(250, 220, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }).setScale(.3);
    playerTextHP = this.add.text(250, 210, 'Health Left : 3', { fontSize: '32px', fill: '#fff' }).setScale(.3);
    scoreText.setScrollFactor(0);
    playerTimeText.setScrollFactor(0);
    playerTextHP.setScrollFactor(0);
    chestCollectedText.setScrollFactor(0);

    //KEYS
    
    //COLLIDER*/
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(enemy, worldLayer);
    this.physics.add.collider(goal, worldLayer);
    this.physics.add.collider(coin, worldLayer);
    this.physics.add.collider(player,enemy,collideEnemies,null, this);
    this.physics.add.overlap(player,goal,this.collectFlag,null,this);
    this.physics.add.overlap(player,coin,getCoin,null,this);
    cursors = this.input.keyboard.createCursorKeys();
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
    
        if (cursors.up.isDown && player.body.onFloor())
        {
            player.setVelocityY(-200);
            
        }
        //TIMER
        timer();
        
        //Check if player on Void
        playerOnVoid(this);
    }
    collectFlag(player, goal) {
        this.physics.pause();
        player.disableBody(true,true);
        goal.destroy();
        this.scene.start('level2',score = 0 , playerTime = 0,chestSmashed = 0, gameBGM.stop(),playerHP = 3);
      }
}