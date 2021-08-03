const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const log = console.log;

const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		cartUrl: '/getBasket.json',
		products: [],
		productsSearch: [],
		cartItem: [],
		imgCatalog: 'https://via.placeholder.com/200x150',
		searchLine: '',
		show: false,
		isVisibleCart: false,
		isCartFull: true,
	},
	methods: {

		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				})
		},

		addProduct(product) {
			console.log(product.id_product);
		},

		filterGoods(value) {
			const regexp = new RegExp(value, 'i');
			this.productsSearch = this.products.filter(product => regexp.test(product.product_name));
			this.products.forEach(el => {
				const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
				if (!this.productsSearch.includes(el)) {
					block.classList.add('invisible');
				} else {
					block.classList.remove('invisible');
				}
			})
		},

		default() {
			document.querySelector('.search-form').addEventListener('submit', e => {
				e.preventDefault();
			});
		}
	},

	mounted() {
		this.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
				}
			});
		// this.getJson(`getProducts.json`)
		// 	.then(data => {
		// 		for (let el of data) {
		// 			this.products.push(el);
		// 		}
		// 	})
		this.getJson(`${API + this.cartUrl}`)
			.then(data => {
				for (let el of data.contents) {
					this.cartItem.push(el);
				}
			});

		this.default();
	}
})
