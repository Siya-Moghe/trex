var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudgroup, cloudImage;
var obstaclegroup, ob1, ob2, ob3, ob4, ob5, ob6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover,restart;
var count=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1= loadImage("obstacle1.png");
  ob2= loadImage("obstacle2.png");
  ob3= loadImage("obstacle3.png");
  ob4= loadImage("obstacle4.png");
  ob5= loadImage("obstacle5.png");
  ob6= loadImage("obstacle6.png");
  
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudgroup = new Group();
  obstaclegroup = new Group();
  
  gameover = createSprite(300,100);
  gameover.addImage("gameover",gameoverimg);
  gameover.visible = false;
  restart = createSprite(300,150);
  restart.addImage("restart",restartimg);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() {
  background("white");
  
  text("Score:"+count,450,50);
  
  if(gameState===PLAY){
    
    count = count + Math.round(getFrameRate()/60);
    
  if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -4;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    if(obstaclegroup.isTouching(trex)){
      gameState = END;
  }
  }
  else if(gameState===END){
      gameover.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
  
    trex.changeAnimation("collided",trex_collided);
   
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,20,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -8;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
}  
  
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,20,30);
    obstacle.velocityX = -7
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1);
        break;
      case 2: obstacle.addImage(ob2);
        break;
      case 3: obstacle.addImage(ob3);
        break;
      case 4: obstacle.addImage(ob4);
        break;
      case 5: obstacle.addImage(ob5);
        break;
      case 6: obstacle.addImage(ob6);
        break;
      default:break;
    }
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    obstaclegroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}

