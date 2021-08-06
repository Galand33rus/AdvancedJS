Vue.component('cart', {
	props: ['items', 'img', 'visibility'],
	template: `
			<div v-show="visibility" class="cart__body">
					<cart-item class="cart-item" v-for="product of items" :data-id="product.id_product"
					:img="img" 
					:key="product.id_product"
					:cart-item="product">
					</cart-item>
					<div v-if="!$root.$data.cartItem.length" class="goods-list">
							<p>Ваша корзина пуста</p>
					</div>					
			</div>
			
	`
});

Vue.component('cart-item', {
	props: ['img', 'cartItem'],
	template: `
	<div class="cart-item">
		<img class="cart-item__img" :src="img" :alt="cartItem.product_name">
		<div class="cart-item__wrapper">
			<p class="cart-item__title">{{ cartItem.product_name }}</p>
			<p class="cart-item__price">{{ cartItem.price * cartItem.quantity }} &#8381;</p>
			<p class="cart-item__count">{{ cartItem.quantity }} шт.</p>
			<p class="cart-item__price-each">Цена за 1 шт. {{ cartItem.price }} &#8381;</p>
			<button class="cart-item__btn button" @click="$parent.$emit('remove', cartItem)">Удалить</button>
		</div>
	</div>
	`
})