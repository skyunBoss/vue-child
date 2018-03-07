<!-- 顶部栏 组件 -->
<template>
	<mt-header :title="title">
		<div slot="left">
			<mt-button icon="back" @click="back" v-show="showback">{{backTitle}}</mt-button>
		</div>
		<div slot="right" v-show="showButton" @click="submit" :style="{ opacity: length==0 ? '0.5' : '1' }">提交</div>
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
			backTitle: {
				type: String,
				default: ''
			},
			showback: {
				type: Boolean,
				default: false
			},
			showButton: {
				type: Boolean,
				default: false
			},
			length: {
				type: Number,
				default: 1
			}
		},
		methods: {
			back(){
				this.$emit('back')
			},
			submit(){
				this.$emit('submit')				
			}
		},
		watch: {

		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>
	.unchecked{
		opacity: 0.5;
	}
</style>