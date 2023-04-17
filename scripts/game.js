var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [menuScene,level1,creditScene,gameOverScene,winScene]
};
var game = new Phaser.Game(config);

function timer(){
    minutes = Math.floor(playerTime / 60);
    seconds = Math.floor(playerTime % 60);
    playerTimeText.setText('Time: ' + minutes + ':' + seconds.toString().padStart(2, '0'));
    playerTime+= 0.01;
}

function playerOnVoid(game){
    if(player.y >= 320){
        game.scene.start('endScene',score,minutes,seconds,chestSmashed);
        gameBGM.stop();
    }
}

function getFlag(player, goal){
    this.physics.pause();
    player.disableBody(true,true);
    this.scene.start('winScene',score,minutes,seconds,chestSmashed,gameBGM.stop());
}
function collideEnemies(player,enemy){
   if(player.y + player.height >= enemy.y){ 
    enemy.destroy();
    splatEnemy.play();
   }else{
    playerHP -= 1;
    player.x = 15;
    player.y = 238;
    playerTextHP.setText('Health Left : ' + playerHP);
    playerIsHit.play();
    console.log(playerHP);
    console.log(enemy.y);
   }
    if(playerHP <= 0){
    this.physics.pause();
    player.disableBody(true,true);
    playerHP = 3;
    this.scene.start('endScene',score,minutes,seconds,chestSmashed,gameBGM.stop());}
   
}
function getCoin(player,coin){
    chestSmashed += 1;
    score += 10;
    crateCollideSFX.play();
    coin.destroy();
    scoreText.setText('Score: ' + score);
    chestCollectedText.setText('Chest Smashed: ' + chestSmashed);
}
