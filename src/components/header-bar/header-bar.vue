<!-- 顶部栏 组件 -->
<template>
	<mt-header :title="title">
		<div slot="left">
			<mt-button icon="back" @click="back" v-show="showback"></mt-button>
		</div>
	</mt-header>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			showback: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			back(){
				this.$emit('back')
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>

</style>