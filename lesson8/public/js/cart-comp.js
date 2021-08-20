Vue.component('CartComp', {
	data() {
		return {
			cartUrl: `/api/cart`,
			cartItems: [],
			cartObj: [],
			cartItemCount: 0,
		}
	},
	methods: {
		addProduct(product) {
			let find = this.cartItems.find(el => el.id_product === product.id_product);
			if (find) {
				this.$parent.putJson(`${this.cartUrl}/${product.id_product}/${product.product_name}`, { quantity: 1 })
					.then(data => {
						if (data.result) {
							find.quantity++;
							this.cartObj.countGoods++;
						}
					})
			} else {
				let prod = Object.assign({ quantity: 1 }, product);
				this.$parent.postJson(`${this.cartUrl}/${product.id_product}/${product.product_name}`, prod)
					.then(data => {
						if (data.result) {
							this.cartItems.push(prod);
						}
					})
			}
		},
		remove(product) {
			if (product.quantity > 1) {
				this.$parent.putJson(`${this.cartUrl}/${product.id_product}/${product.product_name}`, { quantity: -1 })
					.then(data => {
						if (data.result) {
							product.quantity--;
						}
					})
			} else {
				this.$parent.delJson(`${this.cartUrl}/${product.id_product}/${product.product_name}`, product)
					.then(data => {
						if (data.result) {
							this.cartItems.splice(this.cartItems.indexOf(product), 1);
						} else {
							console.log('error');
						}
					})
			}
		},
	},
	mounted() {
		this.$parent.getJson(`${this.cartUrl}`)
			.then(data => {
				for (let el of data.contents) {
					this.cartItems.push(el)
				}
				this.cartObj = data;
				this.cartItemCount = data.countGoods;
			});
	},
	template: `
			<div class="basket">
<!--				<div class="basket__count">{{ cartItemCount }}</div>-->
				<div class="basket__title">
				<img src="img/basket.png" alt="basket">
				</div>
        <div class="basket__menu">
        <cart-item class="cart-item" v-for="product of cartItems" 
        	:data-id="product.id_product"
					:key="product.id_product"
					:cart-item="product"
					@remove="remove">
					</cart-item>
					<div v-if="!cartItems.length" class="basket__empty">
						<p>your shopping cart is empty</p>
					</div>	
            <a href="checkout.html" class="basket__check">checkout</a>
            <a href="cart.html" class="basket__cart">go to cart</a>
        </div>
       </div>
	`
});

Vue.component('cartItem', {
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
                <p class="basket__close-link" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></p>
            </div>
        </div>
	`
})