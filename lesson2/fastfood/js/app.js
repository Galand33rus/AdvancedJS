'use strict';
//const log = console.log;

let submit = document.querySelector('form');
submit.addEventListener('submit', getFormValue);

function getFormValue(event) {
	event.preventDefault();
	const form = event.target;


	const burgers = form.querySelectorAll('input[type = "radio"]');

	let price;
	let calories;
	for (let item of burgers) {
		if (item.checked) {
			price = item.dataset.price;
			calories = item.dataset.cal;
		}
	}


	const cheese = form.querySelector('[name="cheese"]'),
		salad = form.querySelector('[name="salad"]'),
		potato = form.querySelector('[name="potato"]'),
		spice = form.querySelector('[name="spice"]'),
		mayonnaise = form.querySelector('[name="mayonnaise"]');

	const data = [
		{
			checked: true,
			price: price,
			calories: calories,
		},
		{
			checked: cheese.checked,
			price: cheese.dataset.price,
			calories: cheese.dataset.cal,
		},
		{
			checked: salad.checked,
			price: salad.dataset.price,
			calories: salad.dataset.cal,
		},
		{
			checked: potato.checked,
			price: potato.dataset.price,
			calories: potato.dataset.cal,
		},
		{
			checked: spice.checked,
			price: spice.dataset.price,
			calories: spice.dataset.cal,

		},
		{
			checked: mayonnaise.checked,
			price: mayonnaise.dataset.price,
			calories: mayonnaise.dataset.cal,
		}
	]

	let sum = 0;
	let cal = 0
	for (let item of data) {
		if (item.checked) {
			sum += Number(item.price);
			cal += Number(item.calories);
		}
	}
	let total = new Calculation;
	total.renderResult(sum, cal);
}

class Calculation {

	renderResult(sum, cal) {
		const block = document.querySelector('.result');
		const item = new renderTotal;
		block.innerHTML = item.render(sum, cal);

	}
}

class renderTotal {
	render(sum, cal) {
		return `<p>Общая сумма:${sum}. Калорийность: ${cal}</p>`
	}
}



class Hamburger {
	constructor() {

		this.goods = [];
		this.stuffing = [];
		this._fetchProducts();
		this._fetchStuff();
		this.renderHamburger();
		this.renderStuff();

	}

	_fetchProducts() {
		this.goods = [
			{
				name: 'small',
				size: 'Маленький',
				price: 50,
				calories: 20,
				type: 'radio',
				radioName: 'size',
			},

			{
				name: 'big',
				size: 'Большой',
				price: 100,
				calories: 40,
				type: 'radio',
				radioName: 'size',
			},
		];
	}

	_fetchStuff() {
		this.stuffing = [
			{
				name: 'cheese',
				size: 'С сыром',
				price: 10,
				calories: 20,
				type: 'checkbox',
			},

			{
				name: 'salad',
				size: 'С салатом',
				price: 20,
				calories: 5,
				type: 'checkbox',
			},

			{
				name: 'potato',
				size: 'С картофелем',
				price: 15,
				calories: 10,
				type: 'checkbox',
			},

			{
				name: 'spice',
				size: 'Посыпать приправой',
				price: 15,
				calories: 0,
				type: 'checkbox',
			},

			{
				name: 'mayonnaise',
				size: 'Полить майонезом',
				price: 20,
				calories: 5,
				type: 'checkbox',
			},
		];
	}

	renderHamburger() {
		const block = document.querySelector('.select-size');
		for (let product of this.goods) {
			const item = new ProductItem(product);
			block.insertAdjacentHTML("beforeend", item.renderGoods());
		}
	}

	renderStuff() {
		const block = document.querySelector('.select-stuff');
		for (let product of this.stuffing) {
			const item = new ProductItem(product);
			block.insertAdjacentHTML("beforeend", item.renderStuff());
		}
	}

}



class ProductItem {
	constructor(product) {
		this.name = product.name;
		this.size = product.size;
		this.price = product.price;
		this.calories = product.calories;
		this.type = product.type;
		this.radioName = product.radioName;
	}
	renderGoods() {
		return `<label for="${this.name}">
							<input type="${this.type}" name="${this.radioName}" id="${this.name}" data-size="${this.name}" data-price="${this.price}" data-cal="${this.calories}">
							${this.size} (${this.price} рублей, ${this.calories} калорий)
						</label><br>`
	}
	renderStuff() {
		return `<label for="${this.name}">
							<input type="${this.type}" name="${this.name}" id="${this.name}" data-size="${this.name}" data-price="${this.price}" data-cal="${this.calories}">
							${this.size} (${this.price} рублей, ${this.calories} калорий)
						</label><br>`
	}


}



let burger = new Hamburger();