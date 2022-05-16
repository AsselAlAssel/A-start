// for the button

const solve = () => {
    const arr = [1, 2, 3];
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("demo").innerHTML = this.responseText;
    }
    xhttp.open("POST", "/solve");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`arr=${JSON.stringify(arr)}`);
}