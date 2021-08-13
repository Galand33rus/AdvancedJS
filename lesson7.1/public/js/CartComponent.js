Vue.component('cart', {
    props: ['items'],
    template: `
        <div class="basket__menu">
        <cart-item class="cart-item" v-for="product of items" :data-id="product.id_product"
					:key="product.id_product"
					:cart-item="product">
					</cart-item>
			<div v-if="!$root.$data.cartItem.length" class="basket__empty">
				<p>your shopping cart is empty</p>
			</div>	
            <a href="checkout.html" class="basket__check">checkout</a>
            <a href="cart.html" class="basket__cart">go to cart</a>
        </div>
	`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="basket__card">
            <a href="single.html" class="basket__link"></a>
            <div class="basket__box">
                <div class="basket__img">
                    <img :src="cartItem.img" :alt="cartItem.product_name">
                </div>
                <div class="basket__info">
                    <h4>{{ cartItem.product_name }}</h4>
                    <p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i
                                                            class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i
                                                            class="fa fa-star-half-o" aria-hidden="true"></i></p>
                    <p class="basket__info-price"">{{ cartItem.quantity }} x <span>{{ cartItem.price }}</span><span>$</span></p>
                    <p class="basket__info-price basket__info-price-total">Итого: {{ cartItem.price * cartItem.quantity }}<span> $</span></p>
                </div>
            </div>
            <div class="basket__close">
                <p class="basket__close-link" @click="$parent.$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></p>
            </div>
        </div>
	`
})