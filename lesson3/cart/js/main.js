'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
	constructor(container = '.products') {
		this.container = container;
		this.goods = [];
		this._getProducts()
			.then(data => {
				this.goods = [...data];
				this.render();
			});
	}

	_getProducts() {
		return fetch(`${API}/catalogData.json`)
			.then(result => result.json())
			.catch(error => {
				console.log(error);
			})
	}

	render() {
		const block = document.querySelector(this.container);
		for (let product of this.goods) {
			const item = new ProductItem(product);
			block.insertAdjacentHTML("beforeend", item.render());
		}

		let button = document.querySelectorAll('.product-item__button');
		button.forEach(item => {
			item.addEventListener('click', () => {
				const productId = item.parentNode.dataset.id;
				const cartBody = document.querySelector('.cart__body');
				const cartAvailability = cartBody.querySelector(`.cart-item[data-id="${productId}"`);
				if (cartAvailability) {
					let itemPrice = cartAvailability.querySelector('.cart-item__price');
					let price = parseInt(itemPrice.textContent);

					let itemCount = cartAvailability.querySelector('.cart-item__count');
					let count = itemCount.childNodes[1];

					let itemData = this.goods.find(item => item.id_product == productId);

					let totalPrice = cartBody.querySelector('.cart__total-count');
					let totalPriceNumber = Number(totalPrice.textContent.split(" ")[1]);


					itemPrice.innerHTML = `${price + itemData.price}&#8381;`;
					count.textContent = `${parseInt(count.textContent) + 1}`;
					totalPrice.innerHTML = `ИТОГО: ${totalPriceNumber + itemData.price} &#8381;`
				}
			});
		});
	}


}

class ProductItem {
	constructor(product, img = 'https://via.placeholder.com/200x150') {
		this.title = product.product_name;
		this.id = product.id_product;
		this.price = product.price;
		this.img = img;
	}
	render() {
		return `<div class="product-item" data-id="${this.id}">
			 				<img src="${this.img}" alt="${this.title}">
		 					<h3 class="product-item__title">${this.title}</h3>
							<p class="product-item__price">${this.price}&#8381;</p>
							<button class="product-item__button button">Купить</button>
		 				</div>`
	}



}

let list = new ProductList();

class Cart {
	constructor(container = '.cart__total') {
		this.container = container;
		this.cartGoods = [];
		this.goods = {};
		this._getProducts()
			.then(data => {
				this.goods = data;
				this.cartGoods = [...data.contents];
				this.renderItem();
			});
		this.clearCart();
	}

	_getProducts() {
		return fetch(`${API}/getBasket.json`)
			.then(result => result.json())
			.catch(error => {
				console.log(error);
			})
	}

	renderItem() {
		const block = document.querySelector(this.container);
		for (let product of this.cartGoods) {
			const item = new CartItem(product);
			block.insertAdjacentHTML("beforebegin", item.render());
		}

		let totalPrice = block.querySelector('.cart__total-count');
		totalPrice.innerHTML = `ИТОГО: ${this.goods.amount} &#8381;`;


		document.querySelectorAll('.cart-item__btn').forEach(item => {
			item.addEventListener('click', e => {
				e.target.closest('.cart-item').remove();
				let sumItem = parseInt(e.target.parentNode.querySelector('.cart-item__price').textContent);
				let totalPriceNew = block.querySelector('.cart__total-count');
				let totalPriceNumber = Number(totalPriceNew.textContent.split(" ")[1]);
				totalPrice.innerHTML = `ИТОГО: ${totalPriceNumber - sumItem} &#8381;`;
			})
		})
	}

	removeItem() {
	}

	totalPrice() {
		let sum = 0;
		this.cartGoods.forEach(item => {
			sum += item.price;
		});
		console.log(sum);
	}

	clearCart() {

		document.querySelector('.cart__total-btn').addEventListener('click', () => {
			document.querySelectorAll('.cart-item').forEach(item => {
				item.remove()
				document.querySelector('.cart__total-count').textContent = 'ИТОГО: 0';
			})
		})
	}
}

class CartItem {
	constructor(product, img = 'https://via.placeholder.com/200x150') {
		this.title = product.product_name;
		this.id = product.id_product;
		this.price = product.price;
		this.img = img;
	}

	render() {
		return `<div class="cart-item" data-id="${this.id}">
								<img class="cart-item__img" src="${this.img}" alt=""${this.title}">
								<div class="cart-item__wrapper">
									<p class="cart-item__title">${this.title}</p>
									<p class="cart-item__price">${this.price}&#8381;</p>
									<p class="cart-item__count">
										<span>1</span>
										<span>шт.</span>
									</p>
									<button class="cart-item__btn button">Удалить</button>
								</div>
							</div>`
	}
}

let cart = new Cart();


