const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const log = console.log;

const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		cartUrl: '/getBasket.json',
		imgCatalog: 'https://via.placeholder.com/200x150',
		products: [],
		filtered: [],
		cartItem: [],
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
			this.getJson(`${API}/addToBasket.json`)
				.then(data => {
					if (data.result === 1) {
						let find = this.cartItem.find(el => el.id_product === product.id_product);
						if (find) {
							find.quantity++;
						} else {
							const prod = Object.assign({ quantity: 1 }, product);
							this.cartItem.push(prod)
						}
					}
				})
		},

		remove(item) {
			this.getJson(`${API}/addToBasket.json`)
				.then(data => {
					if (data.result === 1) {
						if (item.quantity > 1) {
							item.quantity--;
						} else {
							this.cartItem.splice(this.cartItem.indexOf(item), 1);
						}
					}
				})
		},
	},

	mounted() {
		this.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
					this.filtered.push(el);
				}
			});

		this.getJson(`${API + this.cartUrl}`)
			.then(data => {
				for (let el of data.contents) {
					this.cartItem.push(el);
				}
			});

		// this.getJson(`getProducts.json`)
		// 	.then(data => {
		// 		for (let el of data) {
		// 			this.products.push(el);
		//			this.filtered.push(el);
		// 		}
		// 	})
	}
})
