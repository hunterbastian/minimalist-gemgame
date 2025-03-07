// Game state
const gameState = {
    minerals: 0,
    mineralsPerClick: 1,
    initialized: false // Track if game has been initialized
};

// DOM elements
const rockElement = document.getElementById('rock');
const mineralCountElement = document.getElementById('mineral-count');

// Initialize game
function initGame() {
    // Prevent multiple initializations
    if (gameState.initialized) return;
    
    updateUI();
    setupEventListeners();
    
    // Mark as initialized
    gameState.initialized = true;
    
    console.log('Game initialized');
}

// Event listeners
function setupEventListeners() {
    // Remove any existing listeners first to prevent duplicates
    rockElement.removeEventListener('click', handleRockClick);
    
    // Add click listener
    rockElement.addEventListener('click', handleRockClick);
}

// Handle rock clicking
function handleRockClick(event) {
    // Prevent event from potentially firing multiple times
    event.preventDefault();
    
    // Add minerals based on current click power
    addMinerals(gameState.mineralsPerClick);
    
    // Animate rock on click
    rockElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        rockElement.style.transform = 'scale(1)';
    }, 100);
    
    // Create floating text for minerals gained
    createFloatingText(`+${gameState.mineralsPerClick}`);
}

// Add minerals to the player's total
function addMinerals(amount) {
    gameState.minerals += amount;
    updateUI();
}

// Create floating text effect
function createFloatingText(text) {
    // Use a span instead of a div
    const floatingText = document.createElement('span');
    floatingText.textContent = text;
    
    // Apply direct styles to avoid CSS class issues
    floatingText.style.position = 'absolute';
    floatingText.style.color = 'white';
    floatingText.style.fontSize = '1.2rem';
    floatingText.style.fontWeight = '400';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.textShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
    floatingText.style.backgroundColor = 'transparent';
    floatingText.style.background = 'none';
    floatingText.style.boxShadow = 'none';
    floatingText.style.border = 'none';
    floatingText.style.outline = 'none';
    floatingText.style.zIndex = '100';
    
    // Position
    const randomX = Math.random() * 60 - 30;
    floatingText.style.left = `calc(50% + ${randomX}px)`;
    floatingText.style.top = '40%';
    
    // Add to DOM
    rockElement.appendChild(floatingText);
    
    // Animate manually with JavaScript instead of CSS animations
    let opacity = 1;
    let yPos = 0;
    const startTime = Date.now();
    const duration = 1000; // 1 second
    
    const animate = function() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        opacity = 1 - progress;
        yPos = -20 * progress;
        
        floatingText.style.opacity = opacity;
        floatingText.style.transform = `translateY(${yPos}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            floatingText.remove();
        }
    };
    
    requestAnimationFrame(animate);
}

// Update UI elements
function updateUI() {
    // Update mineral count
    mineralCountElement.textContent = gameState.minerals;
}

// Initialize the game when page loads
window.addEventListener('load', initGame); 