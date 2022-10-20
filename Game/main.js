// select game screens
const gameStart = document.getElementById(`start`);
const newGame = document.getElementById(`new-game`);
const gameArea = document.getElementById(`game-area`);
const gameOver = document.getElementById(`game-over`);
const gameScore = document.getElementById(`game-score`);
const gamePoints = document.getElementById(`points`);
const gameLives = document.getElementById(`lives`);
const characters = document.getElementsByClassName(`character`);

console.log(characters);

//game start listener
gameStart.addEventListener(`click`, onGameStart);

newGame.addEventListener(`click`, newGameFunc);

function newGameFunc(){
    location.reload();
}

//global key listeners
document.addEventListener(`keydown`, onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};

let player = {
    x: 150,
    y: 100,
    width: 0,
    height: 0,
    lastTimeAttack: 0
};

let game = {
    speed: 2,
    movingMultiplier: 4,
    attackMultiplier: 5,
    enemyMultiplier:1.2,
    fireInterval: 800,
    convertInterval: 200,
    cloudSpawnInterval: 3000,
    enemySpawnInterval: 3000,
    enemyKillBonus: 50
};

let scene = {
    score: 0,
    lives: 3,
    lastCloudSpawn: 0,
    lastEnemySpawn: 0,
    isActiveGame: true
}


// key handlers
function onKeyDown(event) {
    keys[event.code] = true;
    // console.log(keys);
}
function onKeyUp(event) {
    keys[event.code] = false;
    // console.log(keys);
}

// Game start function
function onGameStart() {
    
    gameStart.parentElement.classList.add(`hide`);
    
    //render character
    const character = document.createElement(`div`);
    character.classList.add(`character`);
    character.style.top = `200px`;
    character.style.left = `200px`;
    gameArea.appendChild(character);
    
    player.width = character.offsetWidth;
    player.height = character.offsetHeight;
    
    // game infinite loop
    window.requestAnimationFrame(gameAction);
}

let counter = 0;
let isPlayerAttacked =false;

// Game Over
function gameOverAction(){
    scene.isActiveGame =false;
    gameOver.classList.remove(`hide`);
    gameStart.parentElement.classList.add(`hide`);
    gameArea.classList.add(`hide`);
}
// Game loop function
function gameAction(timestamp) {
    const character = document.querySelector(`.character`);
    
    counter++;
    
    // Add enemies
    if(timestamp - scene.lastEnemySpawn>game.enemySpawnInterval + 5000* Math.random()){
        let enemy = document.createElement(`div`);
        enemy.classList.add(`enemy`);
        enemy.x = gameArea.offsetWidth-100;
        enemy.style.left = enemy.x + `px`;
        enemy.style.top = (gameArea.offsetHeight-100)*Math.random()+`px`;
        gameArea.appendChild(enemy);
        scene.lastEnemySpawn=timestamp;
    };
    
    // Modify enemy position
    let enemies = document.querySelectorAll(`.enemy`);
    enemies.forEach(enemy => {
        enemy.x -= game.speed*game.enemyMultiplier;
        enemy.style.left = enemy.x + `px`;
        
        if(enemy.x+enemy.offsetWidth <= 0){
            enemy.parentElement.removeChild(enemy);
            scene.lives--;
            
            if(gameLives.children.length > scene.lives){
                let img = gameLives.children[0];
        
                gameLives.removeChild(img);
            }
            if(scene.lives===0){
                gameLives.innerHTML=`<img class="live" src="./images/dead.png" alt="X">`;
                gameOverAction();
            }
        }
    });
    
    // Add clouds
    if(timestamp - scene.lastCloudSpawn>game.cloudSpawnInterval + 2000* Math.random()){
        let cloud = document.createElement(`div`);
    cloud.classList.add(`cloud`);
    cloud.x = gameArea.offsetWidth-200;
    cloud.style.left = cloud.x + `px`;
    cloud.style.top = (gameArea.offsetHeight-200)*Math.random()+`px`;
    gameArea.appendChild(cloud);
    scene.lastCloudSpawn=timestamp;
    };

    // Modify cloud position
    let clouds = document.querySelectorAll(`.cloud`);
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + `px`;

        if(cloud.x + clouds.offsetWidth <= 0){
            cloud.parentElement.removeChild(cloud);
        }
    });

    // Modify attack position
    let attacks = document.querySelectorAll(`.attack`);
    attacks.forEach(attack => {
        attack.x += game.speed * game.attackMultiplier;
        attack.style.left = attack.x + `px`;

        if (attack.x + attack.offsetWidth > gameArea.offsetWidth) {
            attack.parentElement.removeChild(attack);
        }
    });

    // Apply gravitation
    let isInAir = (player.y + player.height) <= gameArea.offsetHeight;

    if (isInAir) {
        player.y += game.speed;
    }

    // Register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowDown && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.ArrowLeft & player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }
    if (keys.Space && timestamp - player.lastTimeAttack > game.fireInterval) {
        character.classList.add(`character-fire`);
        isPlayerAttacked=true;
        player.lastTimeAttack = timestamp;
        player.lastTimeConvert =timestamp;

        isCollision(character,character);
    } 
    else if(timestamp-player.lastTimeAttack>game.convertInterval) {
        character.classList.remove(`character-fire`);
        if(isPlayerAttacked){
            attack(player);
            isPlayerAttacked=false;
        }

    }

    // Define Attack
    function attack(player) {
        let attack = document.createElement(`div`);

        attack.classList.add(`attack`);
        attack.style.top = (player.y + player.height / 3 - 5) + `px`;
        attack.x = player.x + player.width;
        attack.style.left = attack.x + `px`;
        gameArea.appendChild(attack);
    }

    // Apply movement
    character.style.top = player.y + `px`;
    character.style.left = player.x + `px`;

    // Apply score
    if (counter % 50 == 0) {
        counter = 0;
        scene.score++;
        gamePoints.textContent = scene.score;
    }

    // Collision detection
    enemies.forEach(enemy =>{
        if(isCollision(character, enemy)){
            gameOverAction();
        };

        attacks.forEach(attack =>{
            if(isCollision(attack, enemy)){
                scene.score += game.enemyKillBonus;
                enemy.parentElement.removeChild(enemy);
                attack.parentElement.removeChild(attack);
            }
        });
    })

    if(scene.isActiveGame){
        window.requestAnimationFrame(gameAction);
    }
}

// Add Collision
function isCollision(firstElement, secondElement){
    let firstRect= firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();
    
    return !(firstRect.top > secondRect.bottom
        ||firstRect.bottom<secondRect.top
        ||firstRect.right < secondRect.left
        ||firstRect.left > secondRect.right);
}