const table = document.getElementById("table");

for (let i = 1; i <= 10; i++) {

    const row = document.createElement("tr");

    for (let j = 1; j <= 10; j++) {

        const cell = document.createElement("td");

        cell.textContent = i * j;

        row.appendChild(cell);
    }

    table.appendChild(row);
}