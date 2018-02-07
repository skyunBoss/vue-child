<template>
	<div class="home">
		<header-bar title="成长盾" :showback="false"></header-bar>	
		<div class="content">
			<img src="../../assets/images/time.png" alt="">
			<p>时间银行余额：40min</p>
			<router-link to="/timeshop" tag="button">
				时间商城
			</router-link>
		</div>
		<tab-bar></tab-bar>	
	</div>
</template>

<script>
	import TabBar from '@/components/tab-bar/tab-bar'
	import HeaderBar from '@/components/header-bar/header-bar'
	export default {
		components: {
			TabBar,
			HeaderBar
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		height: 100%;
		background: linear-gradient(to bottom, #43D7ff , #3486fb);
		.content{
			width: 100%;
			padding: 100px 0 20px 0;
			overflow: hidden;
			text-align: center;
			img{
				width: 563px;
				height: 558px;
			}
			p{
				font-size: 28px;
				color: #fff;
				margin: 40px 0 0 0;
			}
			.time{
				font-size: 40px;
				color: #fff;
				margin: 40px 0 0 0;
			}
			button{
				width: 148px;
				height: 63px;
				line-height: 63px;
				background-color: #fff;
				border-radius: 30px;
				border: none;
				margin: 40px 0 0 0;
				color: #3485fb;
				font-size: 26px;
				box-shadow: 0 0 10px 10px rgba(41,124,254,0.5);  
			}
		}
	}
</style>