const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    const nameError = document.getElementById('nameError');
    const messageError = document.getElementById('messageError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');

    // Очищаємо попередні помилки
    nameError.textContent = '';
    messageError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';

    let isValid = true;

    // Регулярні вирази
    const nameRegex = /^.{1,}$/;
    const messageRegex = /^.{5,}$/;
    const phoneRegex = /^\+380\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Перевірка імені
    if (!nameRegex.test(name)) {
        nameError.textContent = "Введіть ім'я";
        isValid = false;
    }

    // Перевірка повідомлення
    if (!messageRegex.test(message)) {
        messageError.textContent =
            'Повідомлення повинно містити мінімум 5 символів';
        isValid = false;
    }

    // Перевірка телефону
    if (!phoneRegex.test(phone)) {
        phoneError.textContent =
            'Номер повинен починатися з +380 та містити 9 цифр';
        isValid = false;
    }

    // Перевірка Email
    if (!emailRegex.test(email)) {
        emailError.textContent =
            'Введіть правильний Email';
        isValid = false;
    }

    // Якщо все правильно
    if (isValid) {
        console.log('Дані користувача:');
        console.log('Name:', name);
        console.log('Message:', message);
        console.log('Phone:', phone);
        console.log('Email:', email);

        alert('Повідомлення успішно відправлено!');

        form.reset();
    }
});