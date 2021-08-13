Vue.component('filterform', {
	data() {
		return {
			searchLine: '',
		}
	},
	template: `
	<form action="#" class="search-form" @submit.prevent="filtergoods()">
		<input type="text" class="search-field" v-model="searchLine">
		<button class="btn-search" type="submit">
		<span class="material-icons-outlined">search</span>
		</button>
	</form>
		`,
	methods: {
		filtergoods() {
			let regexp = new RegExp(this.searchLine, 'i');
			this.$root.$data.filtered = this.$root.$data.products.filter(el => regexp.test(el.product_name));
		}
	}
});