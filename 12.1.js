let link = "";

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

btn1.addEventListener("click", function () {
    link = prompt("Введіть посилання:");
});

btn2.addEventListener("click", function () {

    if (link !== "") {
        window.location.href = link;
    } else {
        alert("Спочатку введіть посилання!");
    }

});