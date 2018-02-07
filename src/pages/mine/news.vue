<template>
	<div>
		<header-bar title="消息" :showback="true" @back="back"></header-bar>	
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	export default {
		components: {
			HeaderBar
		},
		methods: {
			back () {
		      this.$router.push({
		        path: '/mine'
		      })
		    }
		}
	}
</script>	

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
</style>	