
// Fishing Game JavaScript Code
// This code handles the fishing game logic, including catching fish, managing gold, and upgrading fishing gear.

//this is const section

const myButton = document.getElementById("myButton");
const fishCount = document.getElementById("fishCount");
const fishPhoto = document.getElementById("fishPhoto");
const fishRodButton = document.getElementById("fishRodButton")
const goldCount = document.getElementById("goldCount");
const catchPowerCount = document.getElementById("catchPower");
const fishHookButton = document.getElementById("fishHookButton");
const fishBaitButton = document.getElementById("fishBaitButton");
const fishNetButton = document.getElementById("fishNetButton");
const fishSpeciesButton = document.getElementById("fishSpeciesButton");
const fishSellButton = document.getElementById("fishSellButton");
const automatCount = document.getElementById("automatCount");
const catchFishName = document.getElementById("fishName");
const fishLeft = document.getElementById("fishLeft");
const fishLureButton = document.getElementById("fishLureButton");
const fishUseLureButton = document.getElementById("fishUseLureButton");

//this is variable section

let fish = 0;
let gold = 0;
let catchPower = 100000;
let fishNumber = 0;
let fishSell = 0;
let automaticCatchPower = 0;

// Variables for fishing rod
let rod = {name: "", price: 0, catchPower: 0, unlock: 0, powerCount: 0};

// Variables for fishing hook
let hook = {name: "", price: 0, catchPower: 0, unlock: 0, powerCount: 0};

// Variables for bait
let bait = {name: "", price: 0, catchPower: 0, unlock: 0, powerCount: 0};

//Variables for fish net
let net = {price: 10, netNumber: 0, netPower: 1};


//variables for fish species
let fishSpecies = {name: "", price: 0, unlock: 0, powerCount: 0, fishImage: "", fishSell: 0};
let fishImage = ["fish/bleak.png"];
let fishSellPrice = [1];
let fishNameList = ["Roach (0 gold)"];

let fishLure = {price: 100, lureNumber: 0, lurePower: 10};
let fishLureBuy = false;
let fishUseLureCooldown = 0;
let fishUseLureWait = 10000


// Initial setup
updateUI();
newRod()();
newHook()();
newBait()();
newFish()();
newFishNet()();
chooseFishImage();


setTimeout(() => {
    alert("Welcome to the Fishing Game! Click the fish to catch fish and earn gold. Upgrade your fishing gear to catch more fish and unlock new species!");
}, 1000); // Show welcome message after 1 second
setTimeout(() => {
    alert("On left side you can buy your fishing gear witch upgrade your catch power. You can also buy new fish species to catch. Each fish has a different selling price.");
}, 2000); // Show automatic catch message after 2 seconds
setTimeout(() => {
    alert("You can also buy a fish net, which will automatically catch fish for you every second. The more you upgrade it, the more fish it catches per second.");
}, 3000); // Show automatic catch message after 3 seconds
setTimeout(() => {
    alert("Some upgrades require a certain amount of fish and gold to unlock. Keep catching fish and earning gold to unlock better gear and new fish species!");
}, 4000); // Show automatic catch message after 4 seconds

// Event listener for the button to catch fish

myButton.onclick = function(){
    fish += catchPower;
    gold += catchPower*fishSell;
    fishNumber -= 1;
    console.log(fishSell);
    console.log(fishSellPrice);
    updateUI();
    if (fishNumber <= 0) {
        fishNumber = 0;
        chooseFishImage();
    }
}

// Function to choose a random fish to catch 
function chooseFishImage(){
    const randomIndex = Math.floor(Math.random() * fishImage.length);
    const selectedImage = fishImage[randomIndex];
    const selectedFishName = fishNameList[randomIndex] || "Unknown Fish";
    fishPhoto.src = selectedImage;
    fishPhoto.alt = `Image of ${selectedFishName}`;
    catchFishName.textContent = selectedFishName.substring(0, selectedFishName.lastIndexOf("(")) + `for ${fishSellPrice[randomIndex]} gold`;
    fishSell = fishSellPrice[randomIndex];
    fishNumber = 30
    updateUI();
}

// Function to simulate frame updates for automatic fish catching and gold earning
setInterval(() => {
    fish += automaticCatchPower;
    gold += automaticCatchPower;
    fishUseLureCooldown -= 1;
    updateUI();
}, 1000); // Every 1 seconds, add fish and gold based on net number

// Function to update the UI with current values
function updateUI() {
    fishCount.textContent = `You catch: ${fish} fish`;
    goldCount.textContent = `You have: ${gold} gold`;
    catchPowerCount.textContent = `You catch power is: ${catchPower}`;
    automatCount.textContent = `You catch ${automaticCatchPower} fish per second`;
    fishLeft.textContent = `You have ${fishNumber} fish left to catch`;
    if(fish >= rod.unlock && gold >= rod.price && rod.price !== -1){
        fishRodButton.disabled = false;
    }
    else{
        fishRodButton.disabled = true;
    }
    if(fish >= hook.unlock && gold >= hook.price && hook.price !== -1){
        fishHookButton.disabled = false;
    }
    else{
        fishHookButton.disabled = true;
    }
    if(fish >= bait.unlock && gold >= bait.price && bait.price !== -1){
        fishBaitButton.disabled = false;
    }
    else{
        fishBaitButton.disabled = true;
    }
    if(gold >= net.price){
        fishNetButton.disabled = false;
    }
    else{
        fishNetButton.disabled = true;
    }
    if(fish >= fishSpecies.unlock && gold >= fishSpecies.price && fishSpecies.price !== -1){
        fishSpeciesButton.disabled = false;
    }
    else{
        fishSpeciesButton.disabled = true;
    }
    if (gold >= fishLure.price) {
        fishLureButton.disabled = false;
    }
    else {
        fishLureButton.disabled = true;
    }
    if (fishUseLureButton.disabled == true && fishLureBuy == true) {
        fishUseLureButton.textContent = `Lure Cooldown is ${fishUseLureCooldown} seconds`;
    }
}

// Event listeners for buttons
fishRodButton.onclick = makeRodClickHandler();
fishHookButton.onclick = makeHookClickHandler();
fishBaitButton.onclick = makeBaitClickHandler();
fishNetButton.onclick = makeNetClickHandler();
fishSpeciesButton.onclick = makeFishClickHandler();
fishLureButton.onclick = makeLureClickHandler();
fishUseLureButton.onclick = makeUseLureClickHandler();

// Function to handle the fishing rod click event
function makeRodClickHandler(){

    return function(){
        if (gold >= rod.price) {
        gold -= rod.price;
        catchPower += rod.catchPower;
        newRod()();    
        }
    };
}

// Function to create a new fishing rod to buy
function newRod(){
    return function(){
    fetch('rods.json')
    .then(response => response.json())
    .then(data =>{
        const item = data[rod.powerCount];
        rod.name = item.name;
        rod.price = item.price;
        rod.catchPower = item.power;
        rod.unlock = item.unlock;

    })
    .then(() => {
        fishRodButton.textContent = rod.name;
        fishRodButton.disabled = true;
        rod.powerCount++;
        updateUI();;
    })
    .catch(error => {
        fishRodButton.textContent = "No more rods available";
        fishRodButton.disabled = true;
        fishRodButton.style.opacity = 1;
        rod.price = -1;
    });

};

}

// Function to handle the fishing hook click event
function makeHookClickHandler(){

    return function(){
        if (gold >= hook.price) {
        gold -= hook.price;
        catchPower += hook.catchPower;
        newHook()();
        }
    };
}

// Function to create a new fishing hook to buy
function newHook(){ 
    return function(){
    fetch('hook.json')
    .then(response => response.json())
    .then(data =>{
        const item = data[hook.powerCount];
        hook.name = item.name;
        hook.price = item.price;
        hook.catchPower = item.power;
        hook.unlock = item.unlock;
    })
    .then(() => {
        fishHookButton.textContent = hook.name;
        fishHookButton.disabled = true;
        hook.powerCount++;
        updateUI();
    })
    .catch(error => {
        fishHookButton.textContent = "No more hooks available";
        fishHookButton.disabled = true;
        fishHookButton.style.opacity = 1;
        hook.price = -1;
    });

};
}

// Function to handle the bait click event
function makeBaitClickHandler(){

    return function(){
        if (gold >= bait.price) {
        gold -= bait.price;
        catchPower += bait.catchPower;
        newBait()();
        }
    };
}

// Function to create a new bait to buy
function newBait(){ 
    return function(){
    fetch('bait.json')
    .then(response => response.json())
    .then(data =>{
        const item = data[bait.powerCount];
        bait.name = item.name;
        bait.price = item.price;
        bait.catchPower = item.power;
        bait.unlock = item.unlock;

    })
    .then(() => {
        fishBaitButton.textContent = bait.name;
        fishBaitButton.disabled = true;
        bait.powerCount++;
        updateUI();;
    })
    .catch(error => {
        fishBaitButton.textContent = "No more bait available";
        fishBaitButton.disabled = true;
        fishBaitButton.style.opacity = 1;
        bait.price = -1;
    });

};
}

// Function to handle the fish net click event
function makeNetClickHandler(){

    return function(){
        if (gold >= net.price) {
        gold -= net.price;
        net.netNumber += net.netPower;
        automaticCatchPower += net.netPower*5;
        newFishNet()();
        updateUI();;
        }
    };
}

// Function to create a new fish net to buy
function newFishNet(){
    return function(){
        if (net.price >= 5000){
        net.price += net.netNumber *8;
        }  
        else if(net.price >= 1000){
            net.price += net.netNumber *3;
        }
        else if (net.price >= 500){
            net.price += net.netNumber * 2;
        }
        else{
        net.price += net.netNumber;
        }
        fishNetButton.textContent = `Fish Net: ${net.price} gold`;
        fishNetButton.disabled = true;
    };
}

// Function to handle the fish species click event
function makeFishClickHandler(){

    return function(){
        if (gold >= fishSpecies.price) {
        gold -= fishSpecies.price;
        fishImage.push(fishSpecies.fishImage);
        fishSellPrice.push(fishSpecies.fishSell);
        fishNameList.push(fishSpecies.name);
        newFish()();
        }
    };
}

// Function to create a new fish species to buy
function newFish(){ 
    return function(){
    fetch('fish.json')
    .then(response => response.json())
    .then(data =>{
        const item = data[fishSpecies.powerCount];
        fishSpecies.name = item.name;
        fishSpecies.price = item.price;
        fishSpecies.unlock = item.unlock;
        fishSpecies.fishImage = item.fishImage;
        fishSpecies.fishSell = item.fishSell;
    })
    .then(() => {
        fishSpeciesButton.textContent = `New Fish ${fishSpecies.name}, sell for ${fishSpecies.fishSell} gold`;
        fishSpeciesButton.disabled = true;
        fishSpecies.powerCount++;
        updateUI();
    })
   .catch(error => {
        fishSpeciesButton.textContent = "No more fish available";
        fishSpeciesButton.disabled = true;
        fishSpeciesButton.style.opacity = 1;
        fishSpecies.price = -1
    });

};
}

function makeLureClickHandler(){
    return function(){
        if (gold >= fishLure.price) {
            gold -= fishLure.price;
            if (!fishLureBuy) {
                fishLureBuy = true;
                fishUseLureButton.disabled = false;
                newLure()();
                updateUI();
            }
            else{
                fishLure.lureNumber += 1;
                fishLure.lurePower += 2;
                newLure()();
                updateUI();
            }
        }
    };
}

function newLure(){
    return function(){
        if (fishLure.lureNumber >= 10) {
            fishLure.price += fishLure.lureNumber + 100 * 20;
        }
        else if (fishLure.lureNumber >= 5) {
            fishLure.price += fishLure.lureNumber + 50 * 10;
        }
        else {
            fishLure.price += fishLure.lureNumber+ 30 * 5;
        }
        fishLureButton.textContent = `Upgrade Lure ${fishLure.price} gold`;
    };
}

function makeUseLureClickHandler(){
    return function(){
        if (fishLureBuy){
            fishUseLureButton.disabled = true;
            fishNumber += fishLure.lurePower;
            useLure()();
            fishUseLureCooldown = fishUseLureWait / 1000; // Reset cooldown to 10 seconds
            updateUI();
        }
    }
}

function useLure(){
    return function(){
        setTimeout(() => {
            fishUseLureButton.disabled = false;
            fishUseLureButton.textContent = `Use Lure`;
            updateUI();
        }, fishUseLureWait); // Lure can be used every 10 seconds
    }
}