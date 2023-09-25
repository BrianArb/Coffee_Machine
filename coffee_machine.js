const input = require('sync-input');

const inventory = [
    { name: "water", qty: 0, prompt: "Write how many ml of water the coffee machine has:\n"},
    { name: "milk", qty: 0, prompt: "Write how many ml of milk the coffee machine has:\n"},
    { name: "beans", qty: 0, prompt: "Write how many grams of coffee beans the coffee machine has:\n"},
];

const ingredients = {
    water: 200,
    milk: 50,
    beans: 15
};

function userPrompt(prompt) {
    console.log("");
    let usersReponse = Number(input(prompt));
    return usersReponse;
}

function addToInventory() {
    for (let index in inventory) {
        let qty = Number(input(inventory[index].prompt));
        inventory[index].qty += qty;
    }
};

function checkInventory() {
    let cupsOfCoffee = [];
    for (let index in inventory) {
        let amount = ingredients[inventory[index].name];
        let numberOfCups = inventory[index].qty / amount;
        cupsOfCoffee.push(numberOfCups);
    }
    let capacity = Math.min.apply(Math, cupsOfCoffee);
    return Math.floor(capacity);
};

function main() {
    addToInventory();
    let capacity = checkInventory();
    console.log(`DEBUG: capacity = ${capacity}`);
    console.log("Write how many cups of coffee you will need:");
    let cupsOfCoffee = Number(input());
    let remainder = capacity - cupsOfCoffee;
    if (capacity === cupsOfCoffee) {
        console.log("Yes, I can make that amount of coffee");
    } else if (capacity < cupsOfCoffee) {
        console.log(`No, I can make only ${capacity} cups of coffee`);
    } else if (capacity > cupsOfCoffee) {
        console.log(`Yes, I can make that amount of coffee (and even ${remainder} more than that)`);
    }
}

main();


