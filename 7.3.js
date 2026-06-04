const array = ["ihor", 16, "Daniil", 21];

function removeElement(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            array.splice(i, 1);
            break;
        }
    }
}

removeElement(array, "Daniil");

console.log(array);