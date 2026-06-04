function changeColor() {
    const element = document.getElementById("text");

    if (element.style.color === "red") {
        element.style.color = "yellow";
    } else {
        element.style.color = "red";
    }
}