var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var background,backgroundImage;
var gameOver,gameOverImage;

function preload(){
  backroundImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}

function setup() {

  background=createSprite(0,0,800,400);
  background.addImage(backroundImage);
  background.scale=1.5;
  background.x=background.width/2;
  background.velocityX=-4;

  monkey=createSprite(60,height-75,10,10);  
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.150;
  
  ground = createSprite(400,360,900,5);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  invisibleGround = createSprite(497,367,990,5);
  invisibleGround.visible = false;
  
  obstaclesGroup =  new Group();
  bananasGroup = new Group();
  
  score = 0;
  survialTime = 0;
}

function draw() {
  createCanvas(400,400);

   if (gameState===PLAY){
   ground.velocityX = -4;
  }
  if(background.x<100){
    background.x=background.width/2;
  }
  if(keyDown("space")&&monkey.y>300){
    monkey.velocityY = -20;
  }
  
       monkey.velocityY = monkey.velocityY + 0.8;
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     monkey.collide(ground);
  
if(monkey.isTouching(bananasGroup)){
  bananasGroup.destroyEach();
  score = score+2;
  monkey.scale=0.25;
}
    
if(obstaclesGroup.isTouching(monkey)){
  gameState=END;
}  
    spawnBananas();
    spawnObstacles();

  fill("white");
  stroke("red");
  textSize(15);
  survialTime = Math.ceil(frameCount/frameRate());
  text("Score: "+ score, 500,50);
  
  fill("white");
  stroke("red");
  textSize(15);
//score = score + Math.round(getFrameRate()/61);
  text("Score: " + score, 300, 20);

  if (gameState===END){
    background.velocityY=0;
    monkey.visible=false;
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();


    textSize(30);
    fill("white");
    text("Game Over!!",200,200);
    }

  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 80 === 0) {
   var obstacle = createSprite(597,328,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -8
   obstacle.scale = 0.3;
   fill("red")
   obstaclesGroup.add(obstacle);  
  }
}

function spawnBananas(){
  if (frameCount % 40 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.lifetime = 200;
    banana.scale = 0.1;
    banana.velocityX = -10;
    bananasGroup.add(banana);  
  }
}