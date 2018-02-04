<template>
	<div class="home">
		<header-bar title="游戏防沉迷系统" :showback="false"></header-bar>	
		<div class="content">
			<img src="../../assets/images/time.png" alt="">
			<p class="time">19:00 — 21:00</p>
			<p>时间银行余额：2000币</p>
			<router-link to="/timeshop" tag="button">
				去兑换
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
		background-color: #76a9fd;
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
				font-size: 30px;
				box-shadow: 0 0 10px 10px rgba(41,124,254,0.5);  
			}
		}
	}
</style>