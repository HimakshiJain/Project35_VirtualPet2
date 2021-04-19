class Food{

    constructor(){

        this.foodStock = 20;
        this.lastFed;
        this.image = loadImage("Milk.png");

    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFeedTime(lastFed){
        this.lastFed = lastFed;
    }
    
    deductFood(){
        if(this.foodStock > 0){
            this.foosStock = this.foodStock - 1;
        }
        return this.foodStock;
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image, 720,220,70,70);

        if(this.foodStock != 0 ){
            for(var i = 0; i < this.foodStock; i = i + 1){
                if(i%10 === 0){
                    x = x + 30;
                    y = 200;
                }
                image(this.image,x,y,50,50);
            }
        }

    }
}


