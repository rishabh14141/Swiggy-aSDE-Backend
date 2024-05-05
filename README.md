# Swiggy-aSDE-Backend


### Use 'node app' to start server 
---------------------------------
### Use 'node controllers/conquer-game-tests.js' for unit testing
---------------------------------




### Endpoint

<details>

<summary>

Swiggy Conquer Game Routes

</summary>



<details>

<summary>
Swiggy Conquer Game(POST) : http://localhost:3000/swiggy/play-conquer
</summary>

<details>

<summary> Request </summary>
Body
    
    {
        `player1Name`: {
            "health": "Positive integer value",
            "attack": "Positive integer value",
            "strength": "Positive integer value",
        },                     
        `player2Name`: {
            "health": "Positive integer value",
            "attack": "Positive integer value",
            "strength": "Positive integer value",       
        }
    }                   


</details>

<details>

<summary> Example cUrl </summary>

curl --location 'localhost:3000/swiggy/play-conquer' \
--header 'Content-Type: application/json' \
--data '{
    "A": {
        "health" : 40,
        "attack" : 50,
        "strength" : 56
    },
    "B": {
        "health" : 10,
        "attack" : 30,
        "strength": 40
    }
}'


</details>
</details>
</details>


---------------------------------
### Example  Output

![Alt text](./swiggy-conquer-game.png?raw=true "Optional Title")