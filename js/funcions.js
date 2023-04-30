const aMatrixTable = document.querySelector(".matrix-body");
const bMatrixTable = document.querySelector(".bMatrix");
let numColumns = aMatrixTable.querySelector("tr").childElementCount;
let rows = aMatrixTable.querySelectorAll("tr");

let addColumnButton = document.querySelector(".n-add");

addColumnButton.addEventListener('click', () => {
    rows = aMatrixTable.querySelectorAll("tr");
    numColumns++;
    if (numColumns < 13) {
        for (let i = 0; i < rows.length; i++) {
            let newCell = document.createElement("td");
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.name = "arrA";
            newInput.value = "0";
            newInput.className = "cell";
            newCell.appendChild(newInput);
            rows[i].appendChild(newCell);
        }
    }
});

//numColumns - количество колонок
//rows.length - количество строк

// Добавляем строку
let addRowButton = document.querySelector(".m-add");
addRowButton.addEventListener('click', () => {
    let aNewRow = document.createElement("tr");
    let bNewRow = document.createElement("tr");

    numColumns = aMatrixTable.querySelector("tr").childElementCount;
    rows = aMatrixTable.querySelectorAll("tr");


    for (let i = 0; i < numColumns; i++) {
        let newCell = document.createElement("td");
        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "arrA";
        newInput.value = "0";
        newInput.className = "cell";
        newCell.appendChild(newInput);
        aNewRow.appendChild(newCell);
    }
    // Добавляем новую строку в таблицу
    aMatrixTable.appendChild(aNewRow);

    //Добавляем новую строку в матрицу b
    let newCell = document.createElement("td");
    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "arrB";
    newInput.value = "0";
    newInput.className = "cell";
    newCell.appendChild(newInput);
    bNewRow.appendChild(newCell);
    bMatrixTable.appendChild(bNewRow);

});
//////////////////////json
const saveButton = document.querySelector('.saveButton');
const form = document.querySelector('.form');

const section_2 = document.querySelector('.section_2');
const table_1 = document.querySelector('.step_1');
const table_2 = document.querySelector('.step_2');
const table_3 = document.querySelector('.step_3');
const table_4 = document.querySelector('.step_4');
const table_5 = document.querySelector('.step_5');
const table_6 = document.querySelector('.step_6');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Получаем матрицу A из таблицы
    let aMatrix = [];
    let rows = document.querySelectorAll(".matrix-body tr");
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll(".matrix-body td input");
        let row = [];
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].value);
        }
        aMatrix.push(row);
    }

    let bMatrix = [];
    rows = document.querySelectorAll(".bMatrix tr");
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll(".bMatrix td input");
        let row = [];
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].value);
        }
        bMatrix.push(row);
    }

    // Отправляем матрицу на сервер с помощью AJAX
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/cgi-bin/slau.py', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);

            clearMatrix(table_1);
            printMatrix(table_1, res.result.AT);
            printMatrix(table_2, res.result.ATA);
            printMatrix(table_3, res.result.ATA_1);
            printMatrix(table_4, res.result.ATb);
            printMatrix(table_5, res.result.X);

            section_2.classList.remove('hiden');


            //Check response
            console.log("Response: ", xhr.responseText);
            /////////
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error("Ошибка: ", xhr.statusText);
        }
    };
    xhr.send(JSON.stringify({
        aMatrix: aMatrix,
        bMatrix: bMatrix
    }));

});

function printMatrix(table, jsonVar) { //Выводим матрицу в <table>. arg:(куда выводить, что выводить)
    let matrix = jsonVar.matrix;
    let label = jsonVar.label;
    let tab = table.querySelector('table');

    table.querySelector('p').innerHTML = label

    if (matrix.length === undefined) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let cellText = document.createTextNode(matrix);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tab.appendChild(row);
    }

    for (let i = 0; i < matrix.length; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < matrix[i].length; j++) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(matrix[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tab.appendChild(row);
    }
}

function clearMatrix(table) { //Очистка матрицы. arg:(какой <table> чистим)
    let tab = table.querySelector('table');

    while (tab.firstChild) {
        tab.removeChild(tab.firstChild);
    }
}