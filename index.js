function createBoard() {
    const gridContainer = document.querySelector(".grid");
    for (let i = 0; i < 16; i++){
        let tile = document.createElement('div');
        tile.setAttribute('id', `id_${i}`);
        tile.textContent = 0;
        gridContainer.appendChild(tile);
    }
}
createBoard();
function generate(){
    let numArray = [2,2,2,2,2,2,2,2,2,4];
    let num = numArray[Math.floor(Math.random()*numArray.length)]
    let allBlocks = document.querySelectorAll('.grid>div');
    let filteredBlocks = [...allBlocks].filter((a) => a.textContent == 0);
    if (filteredBlocks == 0){
        return;
    }
    let finalBlock = filteredBlocks[Math.floor(Math.random()*filteredBlocks.length)]
    finalBlock.textContent = num;
}
generate()
function shiftArrayLeft(values){
    let finalArray = values.filter((a) => a != 0)
    let index = finalArray.length;
    while (index < 4){
        finalArray.push(0);
        index++;
    }
    return finalArray;
}
function combineArrayLeft(values){
    let index = 1;
    while (index < 4){
        if (values[index-1] == values[index]){
            values[index-1] *= 2;
            updateScore(values[index-1])
            values[index] = 0;
        }
        index++;
    }
    return values;
}
function shiftArrayRight(values){
    let finalArray = values.filter((a) => a != 0)
    let index = finalArray.length;
    while (index < 4){
        finalArray.unshift(0);
        index++;
    }
    return finalArray;
}
function combineArrayRight(values){
    let index = values.length-1;
    while (index > 0){
        if (values[index] == values[index-1]){
            values[index] *= 2;
            updateScore(values[index])
            values[index-1] = 0;
        }
        index--;
    }
    return values;
}
function shiftRow(rowNumber, direction){
    let rowValues = [];
    for (let i = 4*(rowNumber-1); i < 4*rowNumber; i++){
        rowValues.push(document.querySelector(`#id_${i}`).textContent)
    }
    if (direction == "L"){
        rowValues = shiftArrayLeft(rowValues);
        rowValues = combineArrayLeft(rowValues);
        rowValues = shiftArrayLeft(rowValues);
    }
    else if (direction == "R"){
        rowValues = shiftArrayRight(rowValues);
        rowValues = combineArrayRight(rowValues);
        rowValues = shiftArrayRight(rowValues);
    }
    for (let i = 4*(rowNumber-1); i < 4*rowNumber; i++){
        document.querySelector(`#id_${i}`).textContent = rowValues[i%4];
    }
}
function shiftLeft(){
    shiftRow(1, "L");
    shiftRow(2, "L");
    shiftRow(3, "L");
    shiftRow(4, "L");
}
function shiftRight(){
    shiftRow(1, "R");
    shiftRow(2, "R");
    shiftRow(3, "R");
    shiftRow(4, "R");
}
function shiftColumn(columnNumber, direction){
    let columnValues = [];
    for (let i = (columnNumber-1); i < 16; i+= 4){
        columnValues.push(document.querySelector(`#id_${i}`).textContent)
    }
    if (direction == "U"){
        columnValues = shiftArrayLeft(columnValues);
        columnValues = combineArrayLeft(columnValues);
        columnValues = shiftArrayLeft(columnValues);
    }
    else if (direction == "D"){
        columnValues = shiftArrayRight(columnValues);
        columnValues = combineArrayRight(columnValues);
        columnValues = shiftArrayRight(columnValues);
    }
    let counter = 0;
    for (let i = (columnNumber-1); i < 16; i+= 4){
        document.querySelector(`#id_${i}`).textContent = columnValues[counter];
        counter++;
    }
}
function shiftUp(){
    shiftColumn(1, "U");
    shiftColumn(2, "U");
    shiftColumn(3, "U");
    shiftColumn(4, "U");
}
function shiftDown(){
    shiftColumn(1, "D");
    shiftColumn(2, "D");
    shiftColumn(3, "D");
    shiftColumn(4, "D");
}
function isGameOver(){
    for (let i = 0; i < 16; i++){
        let currentTile = parseInt(document.querySelector(`#id_${i}`).textContent);
        if (currentTile === 0){
            return false;
        }
        else if (i % 4 !== 3 && currentTile === parseInt(document.querySelector(`#id_${i+1}`).textContent)){
            return false;
        }
        else if (i < 12 && currentTile === parseInt(document.querySelector(`#id_${i+4}`).textContent)){
            return false;
        }
    }
    return true;
}
function checkForWin(){
    const allTiles = document.querySelectorAll('.grid > div');
    for (let tile of allTiles){
        if (tile.textContent == "2048"){
            document.getElementById('result').textContent = "YOU WIN";
            return true;
        }
    }
    return false;
}
let score = 0;
function restartGame(){
    const allTiles = document.querySelectorAll('.grid > div');
    allTiles.forEach(tile => tile.textContent = 0);
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('result').textContent = "Join the numbers and get to the 2048 tile!";
    generate();
    generate();
    document.body.addEventListener('keyup', keyUpHandle);
}
document.getElementById('restart-button').addEventListener('click', restartGame);
function updateScore(tileValue){
    let currentScore = parseInt(document.getElementById('score').textContent);
    document.getElementById('score').textContent = currentScore + tileValue;
}
function keyUpHandle(event){
        switch (event.keyCode){
            case 37:
                shiftLeft();
                break;
            case 38:
                shiftUp();
                break;
            case 39:
                shiftRight();
                break;
            case 40:
                shiftDown();
                break;
        }
    generate();
    if (isGameOver()){
        document.getElementById('result').textContent= "Game Over!";
        document.body.removeEventListener('keyup', keyUpHandle);
    }
    if (checkForWin()){
        document.body.removeEventListener('keyup', keyUpHandle);
    }
}
document.body.addEventListener('keyup', keyUpHandle)