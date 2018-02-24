<template>
	<mt-loadmore :top-method="loadTop" ref="loadmore" topDropText="" topPullText="" topLoadingText="">
		<ul class="news-list">
			<li class="news-item" v-for="(val,index) in task">
				<div class="news-item_content">
					<i class="icon" v-if="val.tag=='时间兑换'"></i>
					<i class="icon icon-tourism" v-else-if="val.tag=='旅游'"></i>
					<!-- <i class="icon icon-food" v-if="val.tag=="></i> -->
					<i class="icon icon-money" v-else-if="val.tag=='现金'"></i>
					<span class="fl title">{{val.tag}}</span>
					<span class="fr time">{{val.time}}</span></div>
				<p class="content">{{val.content}}</p>
				<p class="reply" v-show="val.reply">{{val.reply}}</p>
				<p>
					<span class="agreed" v-if="val.agreed">已同意</span>
					<span v-else>已拒绝</span>
				</p>
			</li>
		</ul>		
	</mt-loadmore>
</template>

<script>
	import { Toast,Indicator,Loadmore } from 'mint-ui'
	export default {
		data(){
			return {
				task: []
			}
		},
		methods: {
			loadTop(){  //下拉加载
				this.getData()
				this.$refs.loadmore.onTopLoaded()
			},
			getData(msgType){
		    	let _this = this
		    	Indicator.open()
		    	_this.$fetch('/api/message/messages/?msg_type='+msgType)
		    		.then(res => {
		    			Indicator.close()
		    			res.results.map(item => {
		    				_this.task.push({
		    					time: item.created_time,
		    					agreed: item.agreed,
		    					tag: item.tag,
		    					content: item.content,
		    					reply: item.reply
		    				})
	    				})
		    		})
		    		.catch(error => {
		    			console.log(error)
		    		})
		    }
		},
		mounted(){
			this.getData('hwa')
		}
	}
</script>

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
	.mint-loadmore{
		width: 100%;
		height: 87%;
		top: 170px;
		position: absolute;	
		overflow:scroll;  
		-webkit-overflow-scrolling:touch; 
		.mint-loadmore-content{
			height: 100%;
		}
	}	
	.news {	
		height: 100%;

		.news-list {
			width: 100%;
			height: 100%;
			&::-webkit-scrollbar {
				display: none;
			}
			li{
				.news-item_content{
					width: 100%;
					overflow: hidden;
					line-height: 50px;
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
					.icon-money{
						background: url('../../assets/images/icon-money.png') no-repeat;			
						background-size: 100% 100%;				
					}
					.title{
						color: #4a4a4a;
						font-size: 26px;
						position: relative;
						margin: 0 200px 0 20px;
					}
					.time{
						font-size: 20px;
						color: #c1c1c1;
					}
				}
				.content{
					color: #4a4a4a;
					font-size: 30px;
					padding: 25px 0;
					border-bottom: 2px solid #edf1f8;					
					text-align: justify;
				}
				.reply{
					padding: 20px 20px;
					color: #4a4a4a;
					font-size: 26px;
					text-align: justify;
					background-color: #f8f8f8;
					margin: 25px 0 0 0;
				}
				p{
					margin: 25px 0 0 0;
					overflow: hidden;
					span{
						display: block;
						width: 120px;
						height: 50px;
						line-height: 50px;
						text-align: center;
						color: #c1c1c1;
						font-size: 24px;
						border: 1px solid #c1c1c1;
						border-radius: 30px;
						float: right;
					}
					.agreed{
						background-color: #76a9fd;
						border-color: #76a9fd;
						color: #fff;
					}
				}
			}
		}

		.news-item {
			margin: auto;
			padding: 30px 40px;
			border-radius: 8px;
			width: 600px;
			font-size: 32px;
			background: #fff;
			color: #4a4a4a;
			box-shadow: 8px 10px 20px rgba(63,127,233,0.1);	
			.hr {
				margin: 20px 0;				
				height: 1px;
				background: #eaeaea;
			}
			& + .news-item {
				margin-top: 24px;
			}
		}

		.news-item_apply {
			overflow: hidden;
			&.agree {
				color: #628acb;
			}
			&.reject {
				color: #d72f2f;
			}
			&.submit {
				color: #4a4a4a;
			}
		}
	}

</style>	