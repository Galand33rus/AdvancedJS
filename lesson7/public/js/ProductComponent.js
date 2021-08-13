Vue.component('products', {
	props: ['products'],
	template: `<div class="products">
							 <product v-for="item of products" 
							 :key="item.id_product" 
							 :product="item"></product>
							</div>`
});
Vue.component('product', {
	props: ['product'],
	template: `
					 <div class="product-item">
							 <img :src="product.img" :alt="product.product_name">
							 <h3 class="product-item__title">{{ product.product_name }}</h3>
							 <p class="product-item__price">{{ product.price }} &#8381;</p>
							<button class="product-item__button button" @click="$parent.$emit('add-product', product)">Купить</button>
					 </div>
	 `
})