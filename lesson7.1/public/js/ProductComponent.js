Vue.component('products', {
	props: ['products'],
	template: `<div class="items__wrapper-vue">
							 <product v-for="item of products" 
							 :key="item.id_product"
							 :product="item"></product>
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
			<a href="javascript:void(0);" class="items__link" @click="$parent.$emit('add-product', product)"> <img src="img/basket_w.png" alt="basket" class="items__infoimg"> Add to Cart</a>
			<a href="javascript:void(0);" class="items__link items__link-rt"><i class="fa fa-retweet" aria-hidden="true"></i></a>
			<a href="javascript:void(0);" class="items__link items__link-favorites"><i class="fa fa-heart-o" aria-hidden="true"></i></a>
		</div>
	</div>
	 `
})