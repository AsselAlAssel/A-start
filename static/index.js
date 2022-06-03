const table = document.querySelector('#grid-container');
const car = document.querySelector('#car');
const generateButton = document.querySelector(".generate");
const SolveButton = document.querySelector(".solve");
const rotations = {
    top: 'rotate(90deg)',
    bottom: 'rotate(-90deg)',
    left: 'rotate(180deg)',
    right: 'rotate(0deg)'
}
var start, finish = 0;
var startElement, finishElement = null;
var isClickedHerPushed = false;
var solution;
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

const dontHaveSolution = () => {
    start = 0;
    finish = 0;
    startElement.classList.remove("start");
    finishElement.classList.remove("finish");
    startElement = null;
    finishElement = null;
    isClickedHerPushed = false;
    car.classList.add('hidden');
    alert("can't find solution because the way is blocked")
}
const haveSolution = (solution) => {
    generateButton.classList.add("stopWork");
    SolveButton.classList.add("stopWork");
    printPath(solution);
}

// const tempGame = game;
const solve = () => {
    if (start != 0 && finish != 0) {
        isClickedHerPushed = true;
        try {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                const solutionArray = this.responseText;
                solution = JSON.parse(solutionArray);
                if (solution.length === 0) {
                    dontHaveSolution();
                    return;
                }
                haveSolution(solution);
            }
            xhttp.open("POST", "/solve");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`game=${JSON.stringify(game)}&&start=${JSON.stringify(start)}&&goal=${JSON.stringify(finish)}`);
        } catch (error) {
            console.log(error.message())

        }
    } else {
        alert("please choose a start node and finish node");
    }

}


const timer = ms => new Promise(res => setTimeout(res, ms))
const printPath = async solution => {
    console.log(solution);
    car.classList.remove('hidden');
    for (index in solution) {
        const xPos = parseInt(car.style.left.replace('px', ''));
        const yPos = parseInt(car.style.top.replace('px', ''));
        console.log(xPos, yPos);
        const yIndex = solution[index][0] * 32;
        const xIndex = solution[index][1] * 32;
        console.log(xIndex, yIndex);
        const diffY = -(yPos - yIndex) / 32;
        const diffX = -(xPos - xIndex) / 32;
        switch (diffY) {
            case -1:
                car.style.transform = rotations.bottom;
                break;
            case 1:
                car.style.transform = rotations.top;
                break;
            default:
                break;
        }
        switch (diffX) {
            case -1:
                car.style.transform = rotations.left;
                break;
            case 1:
                car.style.transform = rotations.right;
                break;
            default:
                break;
        }
        car.style.left = xIndex + 'px';
        car.style.top = yIndex + 'px';

        await timer(500);
    }
    start = finish;
    startElement.classList.remove("start");
    finishElement.classList.remove("finish");
    startElement = finishElement
    startElement.classList.add("start");
    isClickedHerPushed = false;
    finish = 0;
    finishElement = null;

    generateButton.classList.remove("stopWork");
    SolveButton.classList.remove("stopWork");

}

const Generate = () => {
    // console.log(tempGame);
    car.classList.add('hidden');


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
    console.log(game);
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
            cell.dataset.type = row[element];
            cell.id = game.indexOf(row) + ' ' + element;
            table_row.appendChild(cell);
        }
        table.appendChild(table_row);
    })
}
const getLocation = currLocation => [+currLocation[0], +currLocation[1]];

const Selection = (event) => {
    const targeted = event.target.closest("td");
    let currLocation = targeted.id.split(' ');
    const type = targeted.dataset.type;
    if (type == 0) {
        if (!startElement) {
            start = getLocation(currLocation);
            startElement = targeted;
            targeted.classList.add("start");
            return;

        }
        if (!finishElement) {
            console.log(2);
            finish = getLocation(currLocation);
            finishElement = targeted;
            targeted.classList.add("finish");
            return;
        }

        if (!isClickedHerPushed) {
            console.log(1);
            finishElement.classList.remove("finish")
            finish = getLocation(currLocation);
            finishElement = targeted;
            targeted.classList.add("finish");
            return;
        }

    } else {
        alert("pleas click on available box")
    }



}