function average(arr) {
    let sum = 0;
    let count = 0;

    for (const item of arr) {
        if (typeof item === "number") {
            sum = sum + item;
            count++;
        }
    }

    return sum / count;
}

console.log(average([1, 2, 3, true])); // 2