var PlayerCar,PlayerCarImage;
var trackBackground, trackBackgroundImage;

var obstacle, obstacleImage, obstaclesGroup;
var building, buildingImage, buildingsGroup;
var dealership, dealershipImage;
var PLAY =1;
var END =0;
var gameState=PLAY;

function preload()
{
  //load all images 
  PlayerCarImage = loadImage ("PlayerCar.png");
  trackBackgroundImage = loadImage ("track1.png");
}

function setup(){
  createCanvas (400,400);
  //add all images here
  trackBackground = createSprite(400,400)
  trackBackground.addImage("trackBackground", trackBackgroundImage)
  trackBackground.scale = 1.5;
  trackBackground.velocityY = 1;
  
  PlayerCar = createSprite(200,200,10,10);
  PlayerCar.addImage("PlayerCar", PlayerCarImage)
  PlayerCar.scale = 0.4;

  restart = createSprite(300,300,50,50);
  restart.shapeColor = "red"; 
  obstaclesGroup = new Group();

  buildingsGroup = new Group();
  
 
  Count = 0;

}

function draw() {
 background("grey");
 console.log(trackBackground.y);

 if(gameState === PLAY){
  restart .visible = false;
  if(trackBackground.y>100){
    trackBackground.y = -50;
    }

    if (keyDown("UP_ARROW")){
      PlayerCar.y=PlayerCar.y -2;
      }
      if (keyDown("LEFT_ARROW")){
       PlayerCar.x=PlayerCar.x -2;
       }
       if (keyDown("RIGHT_ARROW")){
         PlayerCar.x=PlayerCar.x +2;
         }
         
         camera.position.y = PlayerCar.y;
         camera.position.x = width/2;

        
  spawnBuildings();
 spawnObstacles();

 if(PlayerCar.isTouching(obstaclesGroup)){
  gameState = END;
}


 }
 else if(gameState === END){
  //gameOver.visible = true;
  restart.visible = true;
  restart.y = PlayerCar.y + 100;
  
  //set velcity of each game object to 0
  trackBackground.velocityY = 0;
  PlayerCar.velocityY = 0;
  obstaclesGroup.setVelocityYEach(0);
  buildingsGroup.setVelocityYEach(0);
  
  //change the trex animation
  
  
  //set lifetime of the game objects so that they are never destroyed
  //obstaclesGroup.setLifetimeEach(-1);
  //cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
  }
 }
 
 drawSprites();
  
 }

function reset() {
  console.log("HAI AEDAN");
  restart.visible = false;
  gameState = PLAY;
  //gameOver.visible = false;
 
  obstaclesGroup.destroyEach();
  buildingssGroup.destroyEach();
}


function spawnBuildings() {
  //write code here to spawn the buildings
  if (frameCount % 200 === 0) {
    var building = createSprite(50,390,20,20);
    building.shapeColor = "white";
    //building.y = Math.round(random(100,300));
   // building.addImage(buildingImage);
   // building.scale = 0.5;
    building.velocityY = -1;
    
     //assign lifetime to the variable
     //building.lifetime = 200;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
   // add each cloud to the group
    buildingsGroup.add(building);
  }
  
}





function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(50,50,40,40);
    obstacle.shapeColor = "green";
    //obstacle.debug = true;
    obstacle.velocityY= 1;
    obstacle.x = Math.round(random(50,350));
    obstacle.y = PlayerCar.y-150;

    obstacle.depth=PlayerCar.depth;
    PlayerCar.depth+=1;
    
    //generate random obstacles
    /*var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      
      default: break;
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    */
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}
