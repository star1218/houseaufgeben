const birthYear = prompt("Введіть рік народження");
const city = prompt("В якому місті Ви живете?");
const sport = prompt("Ваш улюблений вид спорту?");

let message = "";

if (birthYear === null) {
    message += "Шкода, що Ви не захотіли ввести дату народження\n";
} else {
    const age = new Date().getFullYear() - birthYear;
    message += Ваш вік: ${age}\n;
}

if (city === null) {
    message += "Шкода, що Ви не захотіли ввести своє місто\n";
} else if (city === "Київ") {
    message += "Ти живеш у столиці України\n";
} else if (city === "Вашингтон") {
    message += "Ти живеш у столиці США\n";
} else if (city === "Лондон") {
    message += "Ти живеш у столиці Великої Британії\n";
} else {
    message += Ти живеш у місті ${city}\n;
}

if (sport === null) {
    message += "Шкода, що Ви не захотіли ввести свій вид спорту\n";
} else if (sport === "Футбол") {
    message += "Круто! Хочеш стати Ліонелем Мессі?\n";
} else if (sport === "Баскетбол") {
    message += "Круто! Хочеш стати Майклом Джорданом?\n";
} else if (sport === "Теніс") {
    message += "Круто! Хочеш стати Новаком Джоковичем?\n";
}

alert(message);