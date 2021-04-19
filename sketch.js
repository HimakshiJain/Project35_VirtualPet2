var dog, dogImg, dogHappyImg;
var database;
var foodS, foodStock;

var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
	dogImg = loadImage("dogImg.png");
  dogHappyImg = loadImage("dogHappyImg.png");
}

function setup() {
	createCanvas(1000,500);

  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(800,215,20,20); 
  dog.addImage(dogImg);
  dog.scale = 0.1;

  feedPet = createButton("Feed the Dog");
  feedPet.position(360,50);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(465,50);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() { 

  background(46, 139, 87);
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill("white");
  textSize(25);
  if(lastFed >= 12){
    text("Last Fed: " + lastFed/12 + "PM", 350,30);
  } else if(lastFed === 0){
    text("Last Fed: 12 AM",350,30);
  } else {
    text("Last Fed: " + lastFed + "AM",350,30);
  }

  foodObj.display();

  drawSprites();
  
  text("Food: " + foodS,20,50);

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  dog.addImage(dogHappyImg);

  if(foodS >= 1){foodObj.updateFoodStock(foodObj.getFoodStock() - 1);}
  if(foodS < 1){
    dog.addImage(dogImg);
  }
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime: hour()
  })
}



