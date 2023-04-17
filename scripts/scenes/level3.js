var player;
var enemy;
var flagThird;
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
var xEnemyPosThird = [244,407,331,535,680,944];
var yEnemyPosThird = [219,219,165,165,273,255];
var coin;
var coinPosXThird = [411,133,539,775,805];
var coinPosYThird = [219,219,200,292,273];
var splatEnemy;
var playerIsHit;
var crateCollideSFX;
var worldLayerThird;
var acidLayerThird;
var goalThird;
var chestSmashed = 0;
var chestCollectedText;
class level3 extends Phaser.Scene{
    constructor(){
        super('level3');
        
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
        this.load.tilemapTiledJSON('map3', 'assets/maps/map3.json');
    }
    create(){
    //BACKGROUND
    let bg = this.add.image(400, 300, 'bg');
    bg.setScrollFactor(0);

    //MAP
    const map = this.make.tilemap({key : 'map3'});
    const tileSet = map.addTilesetImage('tilemap_packed', 'tiles');
    worldLayerThird =  map.createLayer('groundLayerThird', tileSet);
    worldLayerThird.setCollisionByExclusion([-1]);
    acidLayerThird = map.createLayer('acidLayerThird', tileSet);
    acidLayerThird.setCollisionByExclusion([-1]);
    map.createLayer('backGroundThird', tileSet);
    flagThird = map.createLayer('flagThird', tileSet);
    flagThird.setCollisionByExclusion([-1]);
   
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
    goalThird = this.physics.add.group({
        key: 'flag',
        repeat: 0,
        setXY:  {x:1067,y:235, stepX: 0}
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
        child.x = coinPosXThird[index];
        child.y = coinPosYThird[index];
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
        child.x = xEnemyPosThird[index];
        child.y = yEnemyPosThird[index];
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
    cursors = this.input.keyboard.createCursorKeys();
    //COLLIDER
    this.physics.add.collider(player, worldLayerThird);
    this.physics.add.collider(enemy, worldLayerThird);
    this.physics.add.collider(goalThird, worldLayerThird);
    this.physics.add.collider(coin, worldLayerThird);
    this.physics.add.collider(player,enemy,collideEnemies,null, this);
    this.physics.add.overlap(player,goalThird,this.collectFlag,null,this);
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
        this.scene.start('winScene',score,minutes,seconds,chestSmashed,gameBGM.stop());
      }
}