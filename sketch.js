var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, playerImg, back, backImg, invG, policeImg, robberImg, soldierImg, police, robber, soldier, knife, knifeImg;
var score, life, lifeImg, knifeC, lifeC;
var policeG, robberG, soldierG, knifeG, lifeG,GO;
function preload(){
  playerImg=loadImage('player.png');
  policeImg=loadImage('police.png');
  robberImg=loadImage('robber.png');
  soldierImg=loadImage('solder.png');
  backImg=loadImage('ground-5.jpg');
  knifeImg=loadImage('knife.png');
  lifeImg=loadImage('life.png');
  GO=loadImage('gameOver.png');
}

function setup() {
  createCanvas(1000, 700);
 
  back=createSprite(500,350,1000,700);
  back.addImage(backImg);
  back.velocityX=-2
  
  invG=createSprite(500,600,1000,40);

  player = createSprite(50,180,20,50);
  player.addImage(playerImg);
  player.scale=0.4;
  
  score=0;
  knifeC=3;
  lifeC=3;

  policeG=new Group();
  robberG=new Group();
  soldierG= new Group();
  lifeG= new Group();
  knifeG= new Group();
}


function draw() {
  
  background(180);
  if (gameState===PLAY){
    if (back.x<0) {
       back.x=500;
    }
    player.velocityY=player.velocityY=32
    player.collide(invG)
    if (keyDown("space")) {
      player.velocityY=-12;
    }
    createPolice();
    createSoldier();
    createRobber();
    createKnife();
    createLife();
    drawSprites();
    fill(69, 75, 27);
    textSize(35);
    text("Score ="+score,800,100);
    text("Knife ="+knifeC,100,100);
    text("Life ="+lifeC,500,100)
    if (lifeC<=0) {
      gameState=END;
    }
    if(player.isTouching(robberG)) {
      if(knifeC>0) {
        robberG.destroyEach();
        knifeC-=1;
        score+=50;
      }
      else {
        lifeC-=1
        robberG.destroyEach();
      }
    }

    if(player.isTouching(soldierG)) {
      if(knifeC>0) {
        soldierG.destroyEach();
        knifeC-=1;
        score+=150;
        
      }
      else {
        lifeC-=1
        soldierG.destroyEach();
      }
    }

    if(player.isTouching(policeG)) {
      if(knifeC>0) {
        policeG.destroyEach();
        knifeC-=1;
        score+=100;

      }
      else {
        lifeC-=1
        policeG.destroyEach();
      }
    }
   
    if(player.isTouching(knifeG)) {
      knifeG.destroyEach();
      knifeC+=1;

    }
    
    if(player.isTouching(lifeG)) {
      lifeG.destroyEach();
      lifeC+=1;

    }
  }
  if (gameState===END) {
    textSize(40);
    fill("black")
    background("gray")
    textFont('Courier New')
    
    text("Score = "+ score,300,500);
    image(GO,250,100)

  }
}

function createPolice() {
  if (frameCount%800===0) {
   police=createSprite(1000,520);
    police.addImage(policeImg);
    police.scale=0.3;
    policeG.add(police)
    police.velocityX=-3;
  }
}

function createRobber() {
  if (frameCount%500===0) {
    robber=createSprite(1000,520);
    robber.addImage(robberImg);
    robber.scale=0.3;
    robber.velocityX=-5;
    robberG.add(robber);
  }
}

function createSoldier() {
  if (frameCount%1400===0) {
    soldier=createSprite(1000,520);
    soldier.addImage(soldierImg);
    soldier.scale=0.3;
    soldier.velocityX=-3;
    soldierG.add(soldier);
  }
}

function createKnife() {
  if (frameCount%700===0) {
     knife=createSprite(1000,Math.round(random(200,400)));
     knife.addImage(knifeImg);
     knife.scale=0.4;
     knife.velocityX=-3;
     knifeG.add(knife);
}
}

function createLife() {
  if (frameCount%1000===0) {
     life=createSprite(1000,Math.round(random(200,400)));
     life.addImage(lifeImg);
     life.scale=0.2;
     life.velocityX=-3;
     lifeG.add(life);
}
}