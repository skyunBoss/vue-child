<template>
	<div>
		<div class="personal">
			<router-link to="/userValidation" tag="i" class="icon-setting"></router-link>
			<router-link to="/userValidation" tag="div" class="head">	
				<img src="../../assets/images/tx.png">
			</router-link>	
			<p class="username">刘冉冉</p>
			<p class="id">ID：732847</p>
			<ul>
				<li>
					<i class="icon-message"></i>
					<div>
						<span class="title fl">消息</span>
						<span class="fr icon-nav"></span>
					</div>
				</li>
			</ul>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import TabBar from '@/components/tab-bar/tab-bar'
	export default {
		components: {
			TabBar
		}
	}
</script>

<style lang="scss" scoped>
	.personal{
		width: 100%;
		background-color: #76a9fd;
		padding: 20px 0 100px 0;
		position: relative;
		.icon-setting{
			position: absolute;
			width: 40px;
			height: 40px;
			background: url(../../assets/images/icon-setting.png) no-repeat;
			background-size: 100% 100%;
			right: 40px;
		}
		.head{
			text-align: center;
			margin: 35px 0 0 0;
			img{
				width: 120px;
				height: 120px;
				border-radius: 50%;
				border: 6px solid #9fc3fe;
			}
		}
		p{
			font-size: 24px;
			color: #fff;
			text-align: center;
			margin-top: 15px;
		}		
		p.username{
			font-size: 30px;
			margin: 20px 0 0 0;
		}
		ul{
			width: 670px;
			padding: 0 15px;
			background-color: #fff;
			box-shadow: 8px 10px 20px rgba(63,127,233,0.1);					
			position: absolute;
			top: 350px;
			left: 50%;
			margin-left: -350px;
			border-radius: 5px;
			li{  
				padding: 28px 15px 0 15px;	
				.icon-message{
					width: 33px;
					height: 33px;
					background: url('../../assets/images/icon-message.png') no-repeat;
					background-size: 100% 100%;
					display: block;
					float: left;
				}
				div{
					position: relative;
					margin: 0 0 0 62px;
					padding: 0 0 30px 0;
					overflow: hidden;
					border-bottom: 1px solid #edf1f8;
					line-height: 33px;
					span{
						color: #76a9fd;
						font-size: 30px;
					}
					span.title{
						color: #4a4a4a;
						font-size: 30px;
					}
					.icon-nav{
						width: 18px;
						height: 31px;
						background: url('../../assets/images/icon-nav.png') no-repeat;
						background-size: 100% 100%;
						display: block;						
					}
				}
			}
			li:last-child{
				margin: 0;
				div{
					border: none;
				}
			}
		}
	}
</style>