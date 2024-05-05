module.exports = {
    playGame,
    playRoundAndGetHtml,
    playGameRV, 
    rollDice
}


function playGame (body, res) {
    let bodyValidatorResponse = playGameRV(body);
    if (!bodyValidatorResponse.success) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(bodyValidatorResponse.message);
    }

    let htmlContent = `<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>`;

    let playerNames = Object.keys(body);
    let playerA = playerNames[0];
    let playerB = playerNames[1];

    let atttributesPlayerA = body[playerA];
    let atttributesPlayerB = body[playerB];

    atttributesPlayerA.name = playerA;
    atttributesPlayerB.name = playerB;

    let isGameStart = true;

    // If both players have same health then Player 1 will start game
    let attackTurn = 'PlayerA';

    let Round = 1;
    while (atttributesPlayerA.health > 0 && atttributesPlayerB.health > 0) {
        if (isGameStart) {
            if (atttributesPlayerA.health > atttributesPlayerB.health) {
                attackTurn = 'PlayerB';
            }
            isGameStart = false;
        }

        if (attackTurn == 'PlayerA') {
            htmlContent = playRoundAndGetHtml({ attacker: atttributesPlayerA, defender: atttributesPlayerB, Round, htmlContent });
            attackTurn = 'PlayerB';
        }
        else {
            htmlContent = playRoundAndGetHtml({ attacker: atttributesPlayerB, defender: atttributesPlayerA, Round, htmlContent });
            attackTurn = 'PlayerA';
        }
        Round++;
    }
    
    if(attackTurn == 'PlayerA') {
        htmlContent += `<span><h2 style='color: green'>Player ${playerB} Wins</h2></span>`;
    }
    else {
        htmlContent += `<span><h2 style='color: green'>Player ${playerA} Wins</h2></span>`;
    }
    
    htmlContent += `</body></html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
}


function playRoundAndGetHtml(paramsObj) {
    let { attacker, defender, Round, htmlContent } = paramsObj;
    let attackerDiceNumber = rollDice();
    let attack = attacker.attack * attackerDiceNumber;

    let defenderDiceNumber = rollDice();
    let strength = defender.strength * defenderDiceNumber;

    let healthDamage = attack - strength;

    if (healthDamage > 0) {
        defender.health = Math.max(defender.health - healthDamage, 0);
    }

    htmlContent += `<h1>Round ${Round}</h1>`;
    htmlContent += `Player ${attacker.name} attacks and rolls die. Die roll : ${attackerDiceNumber} <br>`;
    htmlContent += `Player ${defender.name} defends and rolls die. Die roll : ${defenderDiceNumber} <br>`;
    htmlContent += `Attack damage is ${attackerDiceNumber} * ${attacker.attack} = ${attack} <br>`;
    htmlContent += `Defending strength is ${defenderDiceNumber} * ${defender.strength} = ${strength}<br>`;
    htmlContent += `Player ${defender.name}  New Health = ${defender.health}<br>`;

    return htmlContent;
}


function rollDice() {
    // Generate a random number between 1 and 6
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    return diceNumber;
}


function playGameRV(body) {
    let objLen = Object.keys(body).length;

    if (objLen != 2) {
        return {
            success: false,
            message: "Please provide two players attributes to start arena game"
        }
    }

    for (let playerName in body) {
        if (body[playerName]?.['health'] <= 0 || [null, undefined].includes(body[playerName]?.['health'])) {
            return {
                success: false,
                message: `Player: ${playerName}, Invalid Health Attribute`
            };
        }

        if (body[playerName]?.['attack'] <= 0 || [null, undefined].includes(body[playerName]?.['attack'])) {
            return {
                success: false,
                message: `Player: ${playerName}, Invalid Attack Attribute`
            };
        }

        if (body[playerName]?.['strength'] <= 0 || [null, undefined].includes(body[playerName]?.['strength'])) {
            return {
                success: false,
                message: `Player: ${playerName}, Invalid Strength Attribute`
            };
        }
    }

    return {
        success: true
    };
}