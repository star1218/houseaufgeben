function name() {

    let number;

    for (let i=0; i <= 10;i++) {

        number = Number(prompt("ведите число"));

        if (number > 100) {
            break;
        }

    }

    console.log(number);
}

name();