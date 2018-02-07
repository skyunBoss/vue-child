<template>
	<div>
		<header-bar title="修改密码" :showback="true" @back="back"></header-bar>	
		<div class="content">
			<div>
				<i class="icon-oldpass"></i>
				<input type="text" placeholder="请输入旧密码">
			</div>
			<div>
				<i class="icon-newpass"></i>
				<input type="text" placeholder="请输入新密码">
			</div>
			<button type="button">完成</button>
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
		        path: '/userValidation'
		      })
		    }
		}
	}
</script>	

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
	.content{
		width: 500px;
		padding: 150px 100px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);					
		border-radius: 5px;		
		margin: 30px auto;
		div{
			overflow: hidden;
			position: relative;
			margin: 0 0 40px 0;
			.icon-oldpass{
				position: absolute;
				left: 25px;
				display: block;
				width: 29px;
				height: 28px;
				background: url(../../assets/images/icon-oldpass.png) no-repeat;
				background-size: 100% 100%;
				top: 50%;
				margin-top: -14.5px;
			}
			.icon-newpass{
				position: absolute;
				left: 25px;
				display: block;
				width: 29px;
				height: 28px;
				background: url(../../assets/images/icon-newpass.png) no-repeat;
				background-size: 100% 100%;
				top: 50%;
				margin-top: -14.5px;
			}
			input{
				width: 330px;
				height: 66px;
				border-radius: 30px;
				background: none;
				border: 1px solid #d6d6d6;
				padding: 0 80px;
				font-size: 30px;
				color: #d6d6d6;
			}
		}
		button{
			width: 490px;
			height: 90px;
			line-height: 90px;
			border-radius: 45px;
			background-color: #85aff7;
			border: none;
			font-size: 30px;
			color: #d6d6d6;
			color: #fff;
			margin: 60px 0 0 0;
		}
	}
</style>		