Vue.component('filterform', {
	data() {
		return {
			userSearch: '',
		}
	},
	template: `
		<form action="#" class="search" @submit.prevent="$root.$refs.products.filter(userSearch)">
				<input class="search__input" type="search" placeholder="Search for Item..." v-model="userSearch" @input="$root.$refs.products.filter(userSearch)">
				<button class="search__btn" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
		</form>
		`,
	// methods: {
	// 	filtergoods() {
	// 		let regexp = new RegExp(this.searchLine, 'i');
	// 		this.$root.$data.filtered = this.$root.$data.products.filter(el => regexp.test(el.product_name));
	// 	}
	// }
});