const container = document.getElementById('buttons-container');

container.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        alert('Клікнуто на кнопці: ' + event.target.textContent);
    }
});