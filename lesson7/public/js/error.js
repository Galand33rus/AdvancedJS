Vue.component('error', {
	props: ['error'],
	template: `<div v-show="error" class="error">
								Отсутствует соединение с сервером
							</div>`
});