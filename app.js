let matrix = [];
let size = 5;

function createMatrix() {
    size = parseInt(document.getElementById('size').value);
    document.getElementById('matrix').innerHTML = '';

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        let row = document.createElement('tr');

        for (let j = 0; j < size + 1; j++) {
            let cell = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.style.width = '50px';
            matrix[i][j] = input;
            cell.appendChild(input);

            if (j < size - 1) {
                cell.appendChild(document.createTextNode(' '));
            }

            let label = document.createElement('span');
            label.innerHTML = `x<sub>${j + 1}</sub>`;
            cell.appendChild(label);

            if (j === size - 1) {
                cell.appendChild(document.createTextNode(' = '));
            }

            row.appendChild(cell);
        }

        document.getElementById('matrix').appendChild(row);
    }
}

function solve() {
    let a = [], x = [];

    for (let i = 0; i < size; i++) {
        a[i] = [];

        for (let j = 0; j < size + 1; j++) {
            a[i][j] = matrix[i][j].value ? parseFloat(matrix[i][j].value) : 1;

            if (isNaN(a[i][j])) {
                alert("Будь ласка, введіть числове значення для всіх коефіцієнтів та вільних членів.");
                return;
            }
        }
    }

    for (let i = 0; i < size; i++) {
        let maxEl = Math.abs(a[i][i]);
        let maxRow = i;

        for (let k = i + 1; k < size; k++) {
            if (Math.abs(a[k][i]) > maxEl) {
                maxEl = Math.abs(a[k][i]);
                maxRow = k;
            }
        }

        for (let k = i; k < size + 1; k++) {
            let tmp = a[maxRow][k];
            a[maxRow][k] = a[i][k];
            a[i][k] = tmp;
        }

        for (let k = i + 1; k < size; k++) {
            let c = -a[k][i] / a[i][i];

            for (let j = i; j < size + 1; j++) {
                if (i === j) {
                    a[k][j] = 0;
                } else {
                    a[k][j] += c * a[i][j];
                }
            }
        }
    }

    for (let i = size - 1; i >= 0; i--) {
        x[i] = a[i][size] / a[i][i];

        for (let k = i - 1; k >= 0; k--) {
            a[k][size] -= a[k][i] * x[i];
        }
    }

    document.getElementById('result').innerHTML = '';

    for (let i = 0; i < size; i++) {
        let formattedNumber = Number.isInteger(x[i]) ? x[i] : x[i].toFixed(6);
        document.getElementById('result').innerHTML += `x<sub>${i + 1}</sub> = ${formattedNumber}<br>`;
    }
}

createMatrix();
