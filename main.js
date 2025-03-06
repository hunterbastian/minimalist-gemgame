// Game state
const gameState = {
    minerals: 0,
    mineralsPerClick: 1,
    autoMiners: 0,
    autoMinerRate: 1, // minerals per auto miner per interval
    autoMinerInterval: 5000, // 5 seconds
    gemChance: 0.1, // 10% chance of finding a gem when clicking
    upgradesCost: {
        pickaxe: 10,
        autoMiner: 50
    },
    upgradeCostMultiplier: 1.5 // Cost increases by 50% with each purchase
};

// DOM elements
const rockElement = document.getElementById('rock');
const mineralCountElement = document.getElementById('mineral-count');
const buyPickaxeButton = document.getElementById('buy-pickaxe');
const buyAutoMinerButton = document.getElementById('buy-auto-miner');
const pickaxeCostElement = document.getElementById('pickaxe-cost');
const autoMinerCostElement = document.getElementById('auto-miner-cost');

// Initialize game
function initGame() {
    updateUI();
    setupEventListeners();
    startAutoMining();
}

// Event listeners
function setupEventListeners() {
    // Click on rock to mine
    rockElement.addEventListener('click', handleRockClick);
    
    // Buy upgrades
    buyPickaxeButton.addEventListener('click', buyPickaxeUpgrade);
    buyAutoMinerButton.addEventListener('click', buyAutoMinerUpgrade);
}

// Handle rock clicking
function handleRockClick() {
    // Add minerals based on current click power
    addMinerals(gameState.mineralsPerClick);
    
    // Animate rock on click
    rockElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        rockElement.style.transform = 'scale(1)';
    }, 100);
    
    // Create floating text for minerals gained
    createFloatingText(`+${gameState.mineralsPerClick}`);
    
    // Check for gem
    checkForGem();
}

// Add minerals to the player's total
function addMinerals(amount) {
    gameState.minerals += amount;
    updateUI();
}

// Create floating text effect
function createFloatingText(text) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.position = 'absolute';
    floatingText.style.color = 'white';
    floatingText.style.fontSize = '1.2rem';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.animation = 'mineral-gain 1s forwards';
    
    // Random position around the rock
    const randomX = Math.random() * 60 - 30;
    floatingText.style.left = `calc(50% + ${randomX}px)`;
    floatingText.style.top = '40%';
    
    rockElement.appendChild(floatingText);
    
    // Remove the element after animation
    setTimeout(() => {
        floatingText.remove();
    }, 1000);
}

// Check if player found a gem
function checkForGem() {
    if (Math.random() < gameState.gemChance) {
        // Player found a gem!
        const gemBonus = 5 * gameState.mineralsPerClick;
        addMinerals(gemBonus);
        
        // Create gem visual effect
        showGem(gemBonus);
    }
}

// Show gem visual effect
function showGem(bonus) {
    const gem = document.createElement('div');
    gem.className = 'gem';
    rockElement.appendChild(gem);
    
    // Create floating text for gem bonus
    createFloatingText(`Gem! +${bonus}`);
    
    // Remove gem after animation
    setTimeout(() => {
        gem.remove();
    }, 1000);
}

// Buy pickaxe upgrade
function buyPickaxeUpgrade() {
    const cost = gameState.upgradesCost.pickaxe;
    
    if (gameState.minerals >= cost) {
        // Subtract cost
        gameState.minerals -= cost;
        
        // Improve click power
        gameState.mineralsPerClick += 1;
        
        // Increase future cost
        gameState.upgradesCost.pickaxe = Math.floor(cost * gameState.upgradeCostMultiplier);
        
        updateUI();
    }
}

// Buy auto miner upgrade
function buyAutoMinerUpgrade() {
    const cost = gameState.upgradesCost.autoMiner;
    
    if (gameState.minerals >= cost) {
        // Subtract cost
        gameState.minerals -= cost;
        
        // Add auto miner
        gameState.autoMiners += 1;
        
        // Increase future cost
        gameState.upgradesCost.autoMiner = Math.floor(cost * gameState.upgradeCostMultiplier);
        
        updateUI();
    }
}

// Start auto mining process
function startAutoMining() {
    setInterval(() => {
        if (gameState.autoMiners > 0) {
            const mineralsGained = gameState.autoMiners * gameState.autoMinerRate;
            addMinerals(mineralsGained);
        }
    }, gameState.autoMinerInterval);
}

// Update UI elements
function updateUI() {
    // Update mineral count
    mineralCountElement.textContent = gameState.minerals;
    
    // Update upgrade costs
    pickaxeCostElement.textContent = gameState.upgradesCost.pickaxe;
    autoMinerCostElement.textContent = gameState.upgradesCost.autoMiner;
    
    // Disable/enable buttons based on affordability
    buyPickaxeButton.disabled = gameState.minerals < gameState.upgradesCost.pickaxe;
    buyAutoMinerButton.disabled = gameState.minerals < gameState.upgradesCost.autoMiner;
}

// Initialize the game when page loads
window.addEventListener('load', initGame); 