var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backgroundImg
var girl, bkgrnd, bomb , boom, coin, gameover , restart

var girl_running 

var score = 0
var ground, groundImage;
var coinsGroup, bombsGroup

function preload(){
  
  groundImage  = loadImage("ground.png")
  backgroundImg  = loadImage("backgroundImg.png")
girl_running  = loadAnimation("ry.png")



 coinimg = loadImage("bomb.png")
 gameoverimg = loadImage ("game over.png")
 restartimg = loadImage("restart .jpg")
}

function setup() {
 
  createCanvas(windowWidth, windowHeight);

 
  
trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", girl_running);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.4 
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground ",groundImage);
  ground.velocityX = -(6 + 3*score/100);
ground.x = width/2
 
   gameOver = createSprite(400,200);
  gameOver.addImage(gameoverimg);
  
  restart = createSprite(400,400);
  restart.addImage(restartimg);
  
  gameOver.scale = 0.2;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false
  
  coinsGroup = new Group();
  
  score = 0;
}

function draw() {

  camera.x = trex.x;

  gameOver.position.x = restart.position.x = camera.x


  
  if(keyIsDown(UP_ARROW)){
    trex.velocityX = 0
    trex.velocityY = -2
  }
  
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  textSize(20)
  fill("red")
  text("-Press UpArrowKey To escape The bombs",400,70)

  textSize(20)
  fill("red")
  text("-Press SpaceButton To Restart The Game ", 430, 99)
  

  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   ground .velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      trex.velocityY = -10;
       touches = [];
    }
    coinimg.visible = true;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  trex.collide(invisibleGround);
    coins();

  if(coinsGroup.isTouching(trex)){
        gameState = END;
    
    }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    coins.visible = false;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    coinsGroup.setVelocityXEach(0);
    
    coinsGroup.destroyEach();
    
    
    
    
    
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
 drawSprites(); 
  

}



function coins() {
  if(frameCount % 60 === 0) {
    var coin  = createSprite(600,height-95,20,30);
    coin.scale = 0.3
    coin.setCollider('circle',0,0,45)
    // coin.debug = true
  
    coin.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: coin.addImage(coinimg );
              break;
      default: break;
    }
    
    
    
    coin .depth = trex.depth;
    trex.depth +=1;
      
    coinsGroup.add(coin);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  coinsGroup.destroyEach();

  
  
  
  
  
  score = 0;
  
}
