let time = 90;

const timer = document.getElementById('timer');

function showTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

showTime();

const countdown = setInterval(function() {
    time--;

    showTime();

    if (time <= 0) {
        clearInterval(countdown);
    }
}, 1000);