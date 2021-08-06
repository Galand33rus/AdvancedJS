Vue.component('products', {
	props: ['products', 'img'],
	template: `<div class="products">
							 <product v-for="item of products" 
							 :key="item.id_product" 
							 :img="img"
							 :product="item"></product>
							</div>`
});
Vue.component('product', {
	props: ['product', 'img'],
	template: `
					 <div class="product-item">
							 <img :src="img" :alt="product.product_name">
							 <h3 class="product-item__title">{{ product.product_name }}</h3>
							 <p class="product-item__price">{{ product.price }} &#8381;</p>
							<button class="product-item__button button" @click="$parent.$emit('add-product', product)">Купить</button>
					 </div>
	 `
})