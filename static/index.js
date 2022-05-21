var table = document.querySelector('#game-container'), rowIndex, colIndex;
var start, finish = 0;
const game = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2],
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2],
    [2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2],
    [2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2],
    [2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 2],
    [2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2],
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2],
    [2, 0, 0, 0, 0, 2, 0, 2, 1, 1, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 1, 2, 0, 0, 2],
    [2, 0, 2, 2, 0, 2, 0, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2],
    [2, 0, 2, 2, 0, 2, 0, 2, 1, 1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2],
    [2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2],
    [2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]];
const solve = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const z = this.responseText;
        console.log(z)
        console.log(JSON.parse(z));
    }
    xhttp.open("POST", "/solve");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`game=${JSON.stringify(game)}`);
}

const Generate = () => {

    for (let i = 0; i < game.length; i++) {
        for (let j = 1; j < game[i].length - 1; j++) {
            if (i === 0 || i === game.length - 1 || j === 0 || j === game[i].length - 1) {
                game[i][j] = 2;
                continue;
            }
            let current = Math.random() * 1;
            if (current < 0.4) {
                game[i][j] = 2;
                continue;
            }
            game[i][j] = 0;

        }
    }
    table.innerHTML = '';
    game.map(row => {
        let table_row = document.createElement("tr");
        // console.log(row)
        for (element in row) {
            let cell = document.createElement('td')
            // console.log(typeof (element))
            if (row[element] === 2 || row[element] === 1) {
                cell.classList.add('occupied');

            }
            else if (row[element] === 0) {
                cell.classList.add("available");
            }
            cell.addEventListener('click', Selection);
            cell.id = game.indexOf(row) + ' ' + element;
            table_row.appendChild(cell);
        }
        table.appendChild(table_row);
    })
}

const Selection = (event) => {
    let currLocation = event.target.id.split(' ');
    if (!start) {
        start = [parseInt(currLocation[0]), parseInt(currLocation[1])];
    } else {
        finish = [parseInt(currLocation[0]), parseInt(currLocation[1])];
    }
    console.log('start ', start);
    console.log('finish ', finish);


}