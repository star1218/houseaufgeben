const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg'
];

let currentSlide = 0;

const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

images.forEach((image, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    dot.addEventListener('click', function () {
        currentSlide = index;
        showSlide();
    });

    dotsContainer.appendChild(dot);
});

function showSlide() {
    sliderImage.src = images[currentSlide];

    const dots = document.querySelectorAll('.dot');

    dots.forEach(function (dot) {
        dot.classList.remove('active');
    });

    dots[currentSlide].classList.add('active');

    if (currentSlide === 0) {
        prevBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
    }

    if (currentSlide === images.length - 1) {
        nextBtn.style.visibility = 'hidden';
    } else {
        nextBtn.style.visibility = 'visible';
    }
}

nextBtn.addEventListener('click', function () {
    if (currentSlide < images.length - 1) {
        currentSlide++;
        showSlide();
    }
});

prevBtn.addEventListener('click', function () {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide();
    }
});

showSlide();