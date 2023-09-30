const input = require('sync-input');

const inventory = [
    { name: "water", qty: 400,
      prompt: "Write how many ml of water you want to add:\n",
      repr() { return `${this.qty} ml of ${this.name}` }
    },
    { name: "milk", qty: 540,
      prompt: "Write how many ml of milk you want to add:\n",
      repr() { return `${this.qty} ml of ${this.name}` }
    },
    { name: "beans", qty: 120, 
      prompt: "Write how many grams of coffee beans you want to add:\n",
      repr() { return `${this.qty} g of coffee ${this.name}` }
    },
    { name: "cups", qty: 9, 
      prompt: "Write how many disposable cups you want to add:\n",
      repr() { return `${this.qty} disposable ${this.name}` }
    }
];

const products = [
    { name: "espresso", cost: 4,  ingredients: { cups: 1, water: 250, beans: 16 }},
    { name: "latte", cost: 7,  ingredients: { cups: 1, water: 350, beans: 20, milk: 75 }},
    { name: "cappuccino", cost: 6,  ingredients: { cups: 1, water: 200, beans: 12, milk: 100 }},
];

let cash = 550;

function printInventory() {
    console.log("The coffee machine has:");
    for (let stock of inventory) {
        console.log(stock.repr());
    };
    console.log(`$${cash} of money\n`);
}

function addToInventory() {
    for (let index in inventory) {
        let qty = Number(input(inventory[index].prompt));
        if (isNaN(qty)) {
            inventory[index].qty += 0;
        } else {
            inventory[index].qty += qty;
        }
    }
}

function checkInventory(drink, numberOfCupsOrdered) {
    for (const [key, value] of Object.entries(drink.ingredients)) {
        let stock = inventory.find(e => e.name === key);
        if (stock) {
            let numberOfCups = stock.qty / (value * numberOfCupsOrdered);
            if (numberOfCups < 1) {
                console.log(`Sorry, not enough ${key}!\n`);
                return Boolean(false);
            } 
        }
    }
    return Boolean(true);
}

function purchase() {
    let choice = Number(input("What do you want to buy? " +
        "1 - espresso, 2 - latte, 3 - cappuccino:\n")) - 1;
    if ( isNaN(choice)) {
        return Boolean(false);
    }
    let drink = products[choice];
    if (drink === undefined) {
        console.log("Choose a product from the menu.");
        purchase();
    }
    let numberOfCupsOrdered = Number(input(`How many cups of ${drink.name}` +
        " do you want to purchase?\n"));
    let capacity = checkInventory(drink, numberOfCupsOrdered);
    if (capacity) {
        if (numberOfCupsOrdered === 1) {
            console.log(`I have enough resources, making you a ${drink.name}!`);
        } else {
            console.log("I have enough resources, making you " +
                `${numberOfCupsOrdered} ${drink.name} drinks!`);
        }
        
        console.log();
        for (const [key, value] of Object.entries(drink.ingredients)) {
            let stock = inventory.find(e => e.name === key);
            if (stock) {
                stock.qty -= (value * numberOfCupsOrdered);
            }
        }
        cash += drink.cost;
    }
}

function main() {
    let runApp = new Boolean(true);
    while (runApp) {
        let action = input("Write action (buy, fill, take, remaining, exit):\n");
        switch (action) {
            case "buy":
                console.log();
                purchase();
                break;
            case "fill":
                console.log();
                addToInventory();
                break;
            case "take":
                console.log(`I gave you $${cash}\n`);
                cash = 0;
                break;
            case "remaining":
                console.log();
                printInventory();
                break;
            case "exit":
                runApp = Boolean(false);
                break;
            default:
                break;
        }
    }
}

main();
