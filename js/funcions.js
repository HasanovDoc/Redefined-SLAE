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
const saveButton = document.querySelector('.saveButton')
const form = document.querySelector('.form');

const section_2 = document.querySelector('.section_2')
const table_1 = document.querySelector('.step_1 table')
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


            let ATALabel = res.ATA.label;
            let ATAMatrix = res.ATA.matrix;

            clearMatrix(table_1);
            printMatrix(table_1, ATAMatrix);
            document.querySelector('.step_1 p').innerHTML = ATALabel;

            section_2.classList.remove('hiden');


            //Check response
            console.log("Response: ", xhr.responseText);
            //console.log('ATA: ', res.ATA.matrix);
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

function printMatrix(table, matrix) {
    //let table = document.querySelector('.step_1 table');

    for (let i = 0; i < matrix.length; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < matrix[i].length; j++) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(matrix[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

function clearMatrix(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}