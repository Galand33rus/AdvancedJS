'use strict';

const log = console.log;

//слушатель на кнопку добавления в корзину
let addButton = document.querySelectorAll('.items__link');
addButton.forEach((el) => {
	el.addEventListener('click', addToBasket);
});


//добавление в корзину
function addToBasket(event) {

	let basketMenu = document.querySelector('.basket__price');//сюда добавляется новая карточка
	let card = getProductCard(event.currentTarget);//данные карточки
	let cardAvailability = document.querySelector(`.basket__card[data-price="price${card.id}"]`);//смотрим наличие карточки в коризине

	if (cardAvailability) {
		productCount(card);//если есть, меняем количества товара и цену в самой карточке
	} else {
		basketMenu.insertAdjacentHTML('beforebegin', (getProductMarkup(card)));//если нет, добавляем новую
	}

	countPlus();//увеличиваем значение товара в корзине
	totalPricePlus(event.currentTarget);// увеличивем общую сумму

	//слушатель на кнопку удаления
	let basketCloseButton = document.querySelectorAll('.basket__close');
	basketCloseButton.forEach(closeBtn => {
		closeBtn.addEventListener('click', removeFromBasket);
	});

}

//количества товара если он уже добавлен
function productCount(element) {

	let countNumber = document.querySelector(`.basket__info-price[data-price="price${element.id}"]`);//текущее значение количества товара и цены товара
	let arr = countNumber.innerText.split(" ");//массив из количества товара и цены
	let count = Number(arr[0]) + 1;//общее количество товара
	countNumber.innerHTML = `${count} x <span data-price="price${element.id}">${element.price}</span><span>$</span>`;

	let totalPriceCard = countNumber.parentNode.children[3];//текущее значение общей суммы карточки
	let totalPriceCardNumber = Number(totalPriceCard.innerText.split(" ")[1]);//значение в число
	totalPriceCard.innerHTML = `Итого: ${totalPriceCardNumber += element.price}<span> $</span>`;

}

//получение данных карты товара
function getProductCard(element) {

	let cardInfo = {
		img: '',
		name: '',
		price: '',
		id: '',
	};

	// значения карточки со страницы
	let productCard = element.closest('.items__card');
	let productCardInfo = productCard.querySelector('.items__info-link');
	let productCardImage = productCardInfo.querySelector('.items__img');
	let productCardName = productCardInfo.querySelector('.items__name');
	let productCardPrice = productCard.querySelector('.items__price');

	cardInfo.img = productCardImage.getAttribute('src');
	cardInfo.name = productCardName.textContent;
	cardInfo.price = Number(productCardPrice.textContent.substr(1));
	cardInfo.id = productCardName.id;
	console.log(cardInfo);
	return cardInfo;

}


//удаление товара из корзины
function removeFromBasket() {

	let dataAttr = this.getAttribute('data-price');//id удяляемой карточки
	let priceInfo = document.querySelector(`p[data-price="${dataAttr}"]`).innerText;//текущее значение количества товара и цены в этой карточке

	let priceCardTotal = document.querySelector(`p[data-price="${dataAttr}"]`).parentNode;
	let priceCardTotalText = priceCardTotal.querySelector('.basket__info-price-total').innerText;//текукщее значение общей цены карточки
	countMinus(priceInfo);//уменьшение счетчика корзины
	totalPriceMinus(priceCardTotalText);//уменьшение общай суммы

	this.parentNode.remove();//удаление карточки товара

}


//счётчик корзины
//плюс
function countPlus() {

	let count = document.querySelector('.basket__count');//текущее значение счётчика корзины
	let countNumber = Number(count.innerText);// значение к числу

	count.textContent = `${countNumber + 1}`;// к текущему значению додабляется 1

}
//минус
function countMinus(element) {

	let basketArr = element.split(" ");//массив из количества товара и цены
	let basketCountNumber = Number(basketArr[0]);//количество товара в число
	let basketCount = document.querySelector('.basket__count');//сюда записывается счётчик корзины
	let count = Number(basketCount.innerText);//текущее значение счетчика корзины, кторое будем уменьшать

	basketCount.textContent = `${count - basketCountNumber}`;//пишем значение

}


//общая цена 

//плюс
function totalPricePlus(element) {

	let priceProduct = getProductCard(element);//карточка элемента который добавился
	let totalPrice = document.querySelector('#total_price');//ссылка на общюю сумму
	let totalPriceNumber = Number(totalPrice.textContent);//сумма в число

	totalPrice.textContent = `${totalPriceNumber + priceProduct.price}`;//к текущему значению добавляем цену товара из карточки

}
//минус
function totalPriceMinus(element) {

	let priceCount = element.split(" ");//массив из общей цены карточки и текста
	let priceCountNumber = Number(priceCount[1]);//количество цены в число
	let totalPrice = document.querySelector('#total_price');//ссылка на общюю сумму
	let totalPriceNumber = Number(totalPrice.textContent);//сумма в число

	totalPrice.textContent = `${totalPriceNumber - priceCountNumber}`;//записываем новае значение суммы
}


//шаблон карточки в корзине
function getProductMarkup(product) {
	return `
			<div class="basket__card" data-price="price${product.id}">
					<a href="single.html" class="basket__link"></a>
					<div class="basket__box">
							<div class="basket__img">
									<img src="${product.img}" alt="basket1">
							</div>
							<div class="basket__info">
									<h4>${product.name}</h4>
									<p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i
													class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i
													class="fa fa-star-half-o" aria-hidden="true"></i></p>
									<p class="basket__info-price" data-price="price${product.id}">1 x <span data-price="price${product.id}">${product.price}</span><span>$</span></p>
									<p class="basket__info-price basket__info-price-total">Итого: ${product.price}<span> $</span></p>
							</div>
					</div>

					<div class="basket__close" data-price="price${product.id}">
							<p class="basket__close-link"><i class="fa fa-times-circle" aria-hidden="true"></i></p>
					</div>
			</div>
	`;
}