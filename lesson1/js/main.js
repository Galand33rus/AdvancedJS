const products = [
    {
        id: 1,
        title: 'Notebook',
        price: 2000,
        img: 'img/nout.jpg'
    },
    {
        id: 2,
        title: 'Mouse',
        price: 20,
        img: 'img/mouse.jpg'
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 200,
        img: 'img/keyboard.jpg'
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 50,
        img: 'img/gamepad.jpg'
    },
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {

    return `<div class="product-item">
                <img src="${item.img}" alt="${item.title}">
                <h3 class="product-item__title">${item.title}</h3>
                <p class="product-item__price">${item.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`

};


//запятая выводилась потому, что мы выводили массив целиком, а он выводится с запятыми
const renderPage = list => {

    const productsList = list.map(item => renderProduct(item));
    productsList.forEach(item => document.querySelector('.products').insertAdjacentHTML('beforeend', item));

};

renderPage(products);
