const table = document.querySelector('#grid-container');
const car = document.querySelector('#car');
var start, finish = 0;
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

// const tempGame = game;
const solve = () => {
    try {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            const z = this.responseText;
            console.log(z)
            // console.log(JSON.parse(z));
            solution = JSON.parse(z);
            sol = solution;
            printPath(solution);
        }
        xhttp.open("POST", "/solve");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`game=${JSON.stringify(game)}&&start=${JSON.stringify(start)}&&goal=${JSON.stringify(finish)}`);
    } catch (error) {
        console.log(error.message())

    }

}


const timer = ms => new Promise(res => setTimeout(res, ms))
const printPath = async solution => {
    console.log(solution);
    car.classList.remove('hidden');
    for (index in solution) {
 
        console.log(index);

        const yIndex = solution[index][0] * 32;
        const xIndex = solution[index][1] * 32;
        car.style.left = xIndex + 'px';
        car.style.top = yIndex + 'px';

        console.log(xIndex, yIndex);
        await timer(1000);
    }
    start = 0;
}

const Generate = () => {
    // console.log(tempGame);

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
            cell.id = game.indexOf(row) + ' ' + element;
            table_row.appendChild(cell);
        }
        table.appendChild(table_row);
    })
}

const Selection = (event) => {
    let currLocation = event.target.id.split(' ');
    // if(solution && finish){
        
    //     start = finish;
    //     let cell = document.querySelector(".colored2");
    //     cell.classList.add('available');
    //     cell.classList.remove('colored1');
    //     event.target.classList.add('colored1');
    //     event.target.classList.remove('available');
    // }
    if (!start) {
        let s = document.querySelector('.start');
        s?.classList.remove('start');
        s?.classList.add('available');
        if(finish){
            start = finish;
            let s = document.querySelector('.finish');
            s?.classList.remove('finish');
            s?.classList.add('start');
            finish = [parseInt(currLocation[0]), parseInt(currLocation[1])];
            event.target.classList.remove('available');
            event.target.classList.add('finish');
        }else{
            start = [parseInt(currLocation[0]), parseInt(currLocation[1])];
            event.target.classList.remove('available');
            event.target.classList.add('start');
        }
        
    } 
    else {
        finish = [parseInt(currLocation[0]), parseInt(currLocation[1])];
        let cell = document.querySelector(".finish");
        cell?.classList.add('available');
        cell?.classList.remove('finish');
        event.target.classList.remove('available');
        event.target.classList.add('finish');
    }
    
    
    console.log('start ', start);
    console.log('finish ', finish);


}