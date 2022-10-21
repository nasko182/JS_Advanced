class CarDealership {
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar = function (model, horsepower, price, mileage) {
        if (typeof (model) !== `string` || model === ``
            || horsepower < 0 
            || price < 0
            || mileage < 0) {
            throw new Error("Invalid input!");
        }

        this.availableCars.push({
            model,
            horsepower,
            price,
            mileage
        });
        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`
    }

    sellCar = function (model, desiredMileage) {
        if (this.availableCars.find(c => c.model === model) === undefined) {
            throw new Error(`${model} was not found!`)
        }
        let currCar = this.availableCars.find(c => c.model === model);
        if (currCar.mileage <= desiredMileage) {

        }
        else if (currCar.mileage - desiredMileage <= 40000) {
            currCar.price = currCar.price * 0.95;
        }
        else {
            currCar.price = currCar.price * 0.9;
        }
        let car={
            model: currCar.model,
            horsepower: currCar.horsepower,
            soldPrice: Number(currCar.price.toFixed(2))
        }
        this.soldCars.push(car);
        const index = this.availableCars.indexOf(currCar);
        if (index > -1) { 
            this.availableCars.splice(index, 1); 
        }
        this.totalIncome+=Number(car.soldPrice);

        return `${car.model} was sold for ${car.soldPrice.toFixed(2)}$`

    }

    currentCar = function(){
        if(this.availableCars.length===0){
            return `There are no available cars`;
        }
        let result = `-Available cars:\n`;
        for (const car of this.availableCars) {
            result+=`---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$\n`
        }
        return result.trimEnd(`\n`);
    }

    salesReport = function(criteria){
        let result =``;
        let sorted = [];
        if(criteria===`horsepower`){
            sorted= this.soldCars.sort((a,b)=>b[`horsepower`]-a[`horsepower`]);
        }
        else if(criteria===`model`){
            sorted= this.soldCars.sort((a,b)=>a[`model`].localeCompare(b[`model`]));
        }
        else{
            return "Invalid criteria!";
        }

        result+=`-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$\n`;
        result+=`-${this.soldCars.length} cars sold:\n`;
        for (const car of sorted) {
            result+=`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$\n`
        }
        return result.trimEnd(`\n`);
    }
}


try{
    let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
console.log(dealership.sellCar('Toyota Corolla', 230000));
console.log(dealership.sellCar('Mercedes C63', 110000));
  
}
catch(e){
    console.log(e.message);
}