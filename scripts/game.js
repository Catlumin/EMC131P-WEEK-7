var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 1200,
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
    if(player.y >= 784){
        game.scene.start('endScene',score,minutes,seconds);
    }
}

function getFlag(player, goal){
    this.physics.pause();
    player.disableBody(true,true);
    this.scene.start('winScene',score,minutes,seconds);
}
function collideEnemies(player,enemy){
   if(player.y + player.height <= enemy.y){ 
    enemy.destroy();
   }else{
    playerHP -= 1;
    player.x = 100;
    player.y = 740;
    playerTextHP.setText('Health Left : ' + playerHP);
    console.log(playerHP);
   }
    if(playerHP <= 0){
    this.physics.pause();
    player.disableBody(true,true);
    playerHP = 3;
    this.scene.start('endScene',score,minutes,seconds);}
}

function getCoin(player,coin){
    score += 1;
    coin.destroy();
    scoreText.setText('Score: ' + score);
}