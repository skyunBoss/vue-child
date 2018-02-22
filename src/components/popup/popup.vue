<!-- 顶部栏 组件 -->
<template>
	<div class="pop-window animated fadeIn displayShow">
		<div class="pop-main">
			<div class="title">
				<i class="icon icon-tourism" v-if="type==1"></i>
				<i class="icon icon-food" v-if="type==3"></i>
				<i class="icon icon-money" v-if="type==2"></i>
				{{title}}
			</div>
			<p>{{context}}</p>
			<div class="btn">
				<button class="cancel fl" @click="cancel">取消</button>
				<button class="confirm fr" @click="confirm">确认</button>
			</div>
		</div>
		<div class="mask"></div>
	</div>
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
			context: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: ''
			}
		},
		methods: {
			cancel(){
				this.$emit('cancel')
			},
			confirm(){
				this.$emit('confirm')
			}
		},
		watch: {

		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>
	.pop-window{
		width: 100%;
		height: 100%;
		position: absolute;
		// display: none;
		top: 0;
		.mask{
			background-color: rgba(0,0,0,0.2);			
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		.pop-main{
			width: 467px;
			height: 490px;
			padding: 50px 38px;
			background-color: #fff;
			border-radius: 5px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -271px;
			margin-top: -295px;
			.title{
				padding: 0 0 40px 0;
				font-size: 36px;
				color: #4a4a4a;
				text-align: center;
				line-height: 50px;
				border-bottom: 1px solid #898989;
				.icon{
					width: 50px;
					height: 50px;
					background: url('../../assets/images/period.png') no-repeat;
					background-size: 100% 100%;
					display: inline-block;
					vertical-align: middle;
					margin: 0 10px 0 0;
				}
				.icon-tourism{
					background: url('../../assets/images/icon-tourism.png') no-repeat;			
					background-size: 100% 100%;
				}
				.icon-food{
					background: url('../../assets/images/icon-food.png') no-repeat;			
					background-size: 100% 100%;
				}
				.icon-money{
					background: url('../../assets/images/icon-money.png') no-repeat;			
					background-size: 100% 100%;				
				}
			}
			p{
				color: #898989;
				font-size: 32px;
				text-align: justify;
				margin: 30px 0;
				line-height: 1.5em;
			}
			.btn{
				position: absolute;	
				bottom: 50px;
				width: 467px;
				.cancel{
					width: 164px;
					height: 70px;
					line-height: 70px;
					border: 2px solid #76a9fd;
					border-radius: 5px;
					background: none;
					color: #3679e6;
					font-size: 32px;
					text-align: center;
				}
				.confirm{
					width: 164px;
					height: 70px;
					line-height: 70px;
					border: 2px solid #76a9fd;
					border-radius: 5px;
					background: #76a9fd;
					color: #fff;
					font-size: 32px;
					text-align: center;
				}
			}
		}
	}
</style>