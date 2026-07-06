function createCounter() {

    let count = 0;

    return function (number) {
        count += number;
        return count;
    };

}

const counter = createCounter();

console.log(counter(4));   // 4
console.log(counter(6));   // 10
console.log(counter(10));  // 20
console.log(counter(7));   // 27