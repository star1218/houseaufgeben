const images=[
    "images/7.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/0.jpg",
    "images/1.jpg",
    "images/2.jpg",
];

function randomImages() {
    const randomIndex=Math.floor(Math.random() * images.length);
    document.getElementById("photo").src = images[randomIndex];
}