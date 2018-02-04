<template>
	<div class="timeshop">
		<header-bar title="时间商城" :showback="true" @back="back"></header-bar>	
		<div class="content">
			<div class="time">
				<div>
					<i class="icon icon-time"></i>
					时间银行
				</div>
				<p><em>2000</em>&nbsp;&nbsp;币</p>
			</div>
		</div>
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
		        path: '/home'
		      })
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
	.time{
		width: 670px;
		margin: 20px auto;
		padding: 22px 15px;
		border-raduis: 5px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);  
		div{
			font-size: 30px;
			color: #76a9fd;
			line-height: 36px;
			i{
				display: block;
				width: 36px;
				height: 36px;
				background: url(../../assets/images/clock.png) no-repeat;
				background-size: 100% 100%;
				float: left;
				margin: 0 20px 0 0;
			}
		}
		p{
			text-align: center;
			font-size: 	30px;
			color: #4a4a4a;
			margin: 32px 0 0 0;
			em{
				font-size: 100px;
			}
		}
	}
</style>