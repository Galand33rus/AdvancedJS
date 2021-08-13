const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/api/products',
		cartUrl: '/api/cart',
		products: [],
		filtered: [],
		cartItem: [],
		cartItemCount: 0,
		show: false,
		isVisibleCart: false,
		error: false
	},
	methods: {

		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => { this.error = true; })
		},

		addProduct(product) {
			let find = this.cartItem.find(el => el.id_product === product.id_product);
			if (find) {
				find.quantity++;
				this.cartItemCount++;
			} else {
				const prod = Object.assign({ quantity: 1 }, product);
				this.cartItem.push(prod);
				this.cartItemCount++;
			}
		},

		remove(item) {
			if (item.quantity > 1) {
				item.quantity--;
				this.cartItemCount--;
			} else {
				this.cartItem.splice(this.cartItem.indexOf(item), 1);
				this.cartItemCount--;
			}
		},
	},

	mounted() {
		this.getJson(`${this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
					this.filtered.push(el);
				}
			});

		this.getJson(`${this.cartUrl}`)
			.then(data => {
				for (let el of data.contents) {
					this.cartItem.push(el);
					this.cartItemCount += el.quantity;
				}

			});

	}
})
