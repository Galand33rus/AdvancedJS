'use strict';

document.querySelector('.btn').addEventListener('click', (event) => {
    event.preventDefault();
    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let mail = document.querySelector('#mail');
    let text = document.querySelector('#textarea');
    let nameError = document.querySelector('#name-error');
    let phoneError = document.querySelector('#phone-error');
    let mailError = document.querySelector('#mail-error');
    let textError = document.querySelector('#textarea-error');

    if(!name.value.match(/[a-zа-я]/i)){
        name.style.borderColor = 'red';
        nameError.style.display = 'block';
    } else {
        name.style.borderColor = '#000';
        nameError.style.display = 'none';
    }

    if(!phone.value.match(/\+7\(\d{3}\)\d{3}-\d{4}/)){
        phone.style.borderColor = 'red';
        phoneError.style.display = 'block';
    } else {
        phone.style.borderColor = '#000';
        phoneError.style.display = 'none';
    }

    if(!mail.value.match(/[a-z0-9._-]+@[a-z0-9-_]+\.[a-z]{2,4}/i)){
        mail.style.borderColor = 'red';
        mailError.style.display = 'block';
    } else {
        mail.style.borderColor = '#000';
        mailError.style.display = 'none';
    }

    if(!text.value.match(/[a-zа-я0-9]/i)){
        text.style.borderColor = 'red';
        textError.style.display = 'block';
    } else {
        text.style.borderColor = '#000';
        textError.style.display = 'none';
    }
})

