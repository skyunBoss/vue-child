<template>
	<div class="timeshop">
		<header-bar title="时间商城" :showback="true" @back="back"></header-bar>	
		<div class="content">
			<div class="time">
				<div>
					<i class="icon icon-time"></i>
					时间银行
				</div>
				<p><em>2000</em>&nbsp;&nbsp;时间币</p>
			</div>
			<div class="type">
				<ul>
					<li>
						<i class="icon"></i>
						<div>
							<span class="title fl">时间段兑换</span>
							<span class="fr">自定义</span>
						</div>
					</li>
					<li @click="openPop">
						<i class="icon icon-tourism"></i>
						<div>
							<span class="title fl">北京三日游</span>
							<span class="fr">10000币</span>
						</div>
					</li>
					<li>
						<i class="icon icon-food"></i>
						<div>
							<span class="title fl">汉堡王晚餐</span>
							<span class="fr">10000币</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<pop-window :show="popShow" :title="title" :context="context"></pop-window>
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import PopWindow from '@/components/popup/popup'
	export default {
		components: {
			HeaderBar,
			PopWindow
		},
		data(){
			return {
				popShow: false,
				title: '标题',
				context: '内容'
			}
		},
		methods: {
			openPop(){
				this.popShow = true
			},
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
		margin: 30px auto;
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
				margin: 0 20px;
			}
		}
		p{
			text-align: center;
			font-size: 	28px;
			color: #4a4a4a;
			margin: 32px 0 0 0;
			em{
				font-size: 100px;
				font-family: QuartzRegular;
			}
		}
	}
	.type{
		width: 670px;
		margin: 30px auto;
		padding: 0 15px;
		border-raduis: 5px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);
		li{  
			padding: 28px 15px 0 15px;	
			.icon{
				width: 50px;
				height: 50px;
				background: url('../../assets/images/period.png') no-repeat;
				background-size: 100% 100%;
				display: block;
				float: left;
			}
			.icon-tourism{
				background: url('../../assets/images/icon-tourism.png') no-repeat;			
				background-size: 100% 100%;
			}
			.icon-food{
				background: url('../../assets/images/icon-food.png') no-repeat;			
				background-size: 100% 100%;
			}
			div{
				position: relative;
				margin: 0 0 0 62px;
				padding: 0 0 40px 0;
				overflow: hidden;
				border-bottom: 1px solid #edf1f8;
				line-height: 50px;
				span{
					color: #76a9fd;
					font-size: 24px;
				}
				span.title{
					color: #4a4a4a;
					font-size: 32px;
				}
			}
		}
		li:last-child{
			margin: 0;
			div{
				border: none;
			}
		}
		li:active{
			background-color: #edf1f8;
		}
	}
</style>