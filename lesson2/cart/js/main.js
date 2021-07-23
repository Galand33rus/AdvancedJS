'use strict';

class ProductList {
	constructor(container = '.products') {
		this.container = container;
		this.goods = [];
		this._fetchProducts();
		this.render();//вывод товаров на страницу
		this.totalSum();
	}
	_fetchProducts() {
		this.goods = [
			{
				id: 1,
				title: 'Notebook',
				price: 2000,
				img: 'img/notebook.jpg'
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
	}


	totalSum() {
		let sum = 0;
		this.goods.forEach(item => {
			sum += item.price;
		});
		console.log(sum);
	}

	render() {
		const block = document.querySelector(this.container);
		for (let product of this.goods) {
			const item = new ProductItem(product);
			block.insertAdjacentHTML("beforeend", item.render());
		}
	}
}

class ProductItem {
	constructor(product) {
		this.title = product.title;
		this.id = product.id;
		this.price = product.price;
		this.img = product.img;
	}
	render() {
		return `<div class="product-item">
			 				<img src="${this.img}" alt="${this.title}">
		 					<h3 class="product-item__title">${this.title}</h3>
							<p class="product-item__price">${this.price}$</p>
							<button class="buy-btn">Купить</button>
		 				</div>`
	}
}

let list = new ProductList();

class Cart {

	renderItem() {
		//добавления товара
	}

	removeItem() {
		//удаление товара
	}

	totalPrice() {
		//общая сумма товаров в корзине
	}

	clearCart() {
		//удаление всех товаров из корзины
	}
}

class CartItem {
	render() {
		//шаблон товара для добавления в корзину
	}
}
