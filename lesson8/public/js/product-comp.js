Vue.component('ProductComp', {
	data() {
		return {
			catalogUrl: `/api/products`,
			products: [],
			filtered: [],
		}
	},
	methods: {
		filter(value) {
			let regexp = new RegExp(value, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.product_name));
		}
	},
	mounted() {
		this.$parent.getJson(`${this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
					this.filtered.push(el);

				}
			});
	},
	template: `<div class="items__wrapper-vue">
							 <product v-for="product of filtered" 
							 :key="product.id_product"
							 :product="product"></product>
							</div>`
});

Vue.component('product', {
	props: ['product'],
	template: `
	<div class="items__card">
		<a href="single.html" class="items__info-link" target="_blank">
			<img :src="product.img" :alt="product.product_name" class="items__img">
			<span class="items__name" :id="product.id_product">{{ product.product_name }}</span><br>
			<span class="items__price">{{ product.price }} $</span>
		</a>
		<div class="items__info">
			<a href="javascript:void(0);" class="items__link" @click="$root.$refs.cart.addProduct(product)"> <img src="img/basket_w.png" alt="basket" class="items__infoimg"> Add to Cart</a>
			<a href="javascript:void(0);" class="items__link items__link-rt"><i class="fa fa-retweet" aria-hidden="true"></i></a>
			<a href="javascript:void(0);" class="items__link items__link-favorites"><i class="fa fa-heart-o" aria-hidden="true"></i></a>
		</div>
	</div>
	 `
})