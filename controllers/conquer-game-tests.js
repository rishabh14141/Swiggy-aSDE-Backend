// Import the functions to be tested
const { playGameRV, playRoundAndGetHtml } = require('./conquer-game.js');

// Define a function to test playGameRV function
function testPlayGameRV() {
    // Test case 1: Valid input
    let body = {
        PlayerA: { health: 100, attack: 10, strength: 5 },
        PlayerB: { health: 100, attack: 8, strength: 6 }
    };
    let expectedResult = { success: true };
    let result = playGameRV(body);
    if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
        console.error("Test case 1 failed");
    }

    // Test case 2: Less than 2 players
    body = {};
    expectedResult = { success: false, message: "Please provide two players attributes to start arena game" };
    result = playGameRV(body);
    if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
        console.error("Test case 2 failed");
    }

    // Test case 3: Invalid health attribute
    body = {
        PlayerA: { health: 0, attack: 10, strength: 5 },
        PlayerB: { health: 100, attack: 8, strength: 6 }
    };
    expectedResult = { success: false, message: "Player: PlayerA, Invalid Health Attribute" };
    result = playGameRV(body);
    if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
        console.error("Test case 3 failed");
    }

    // Test case 4: Invalid attack attribute
    body = {
        PlayerA: { health: 100, attack: -5, strength: 5 },
        PlayerB: { health: 100, attack: 8, strength: 6 }
    };
    expectedResult = { success: false, message: "Player: PlayerA, Invalid Attack Attribute" };
    result = playGameRV(body);
    if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
        console.error("Test case 4 failed");
    }

    // Test case 5: Invalid strength attribute
    body = {
        PlayerA: { health: 100, attack: 10, strength: 0 },
        PlayerB: { health: 100, attack: 8, strength: 6 }
    };
    expectedResult = { success: false, message: "Player: PlayerA, Invalid Strength Attribute" };
    result = playGameRV(body);
    if (JSON.stringify(result) !== JSON.stringify(expectedResult)) {
        console.error("Test case 5 failed");
    }
}

// Define a function to test playRoundAndGetHtml function
function testPlayRoundAndGetHtml() {
    // Test case: Check if the returned HTML content contains the expected elements
    const paramsObj = {
        attacker: { name: 'PlayerA', health: 100, attack: 10, strength: 5 },
        defender: { name: 'PlayerB', health: 100, attack: 8, strength: 6 },
        Round: 1,
        htmlContent: ''
    };
    const result = playRoundAndGetHtml(paramsObj);
    // Test if the returned result contains the expected HTML content
    if (!result.includes(`<h1>Round 1</h1>`) ||
        !result.includes(`Player PlayerA attacks and rolls die.`) ||
        !result.includes(`Player PlayerB defends and rolls die.`) ||
        !result.includes(`Attack damage is`) ||
        !result.includes(`Defending strength is`) ||
        !result.includes(`Player PlayerB  New Health =`)) {
        console.error("Test case failed");
    }
}

// Run the test functions
testPlayGameRV();
testPlayRoundAndGetHtml();
