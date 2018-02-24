<template>
	<div class="timeshop">
		<header-bar title="时间商城" :showback="true" @back="back"></header-bar>	
		<mt-loadmore :top-method="loadTop" ref="loadmore">
			<div class="content">
				<div class="time">
					<div>
						<i class="icon icon-time"></i>
						时间银行余额
					</div>
					<p><em>{{time_bank}}</em>&nbsp;&nbsp;时间币</p>
					<p class="tit">*注：1时间币可兑换1分钟上网时间</p>
				</div>
				<div class="type">
					<ul>
						<router-link to="/changePeriod" tag="li">
							<i class="icon"></i>
							<div>
								<span class="title fl">时间段兑换</span>
								<span class="fr">自定义</span>
							</div>
						</router-link>
						<li v-for="val in list" @click="openPop(val.name,val.cost,val.tag,val.id)">
							<i class="icon icon-tourism" v-if="val.tag==1"></i>
							<i class="icon icon-food" v-if="val.tag==3"></i>
							<i class="icon icon-money" v-if="val.tag==2"></i>
							<div>
								<span class="title fl">{{val.name}}</span>
								<span class="fr">{{val.cost}}币</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</mt-loadmore>
		<pop-window :title="title" :context="context" :type="type" v-if="popShow" @cancel="cancel" @confirm="confirm"></pop-window>
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import PopWindow from '@/components/popup/popup'
	import { Toast } from 'mint-ui'
	export default {
		components: {
			HeaderBar,
			PopWindow
		},
		data(){
			return {
				popShow: false,
				title: '',
				context: '',
				type: 1,
				time_bank: '',   //时间银行余额
				goods_id: '',  //商品id
				user_id: this.$store.state.login.user_id,
				list: []
			}
		},
		methods: {
			openPop(name,cost,type,id){
				this.popShow = true
				this.title = name
				this.context = "您将花费"+cost+"时间币兑换"+name
				this.type = type
				this.goods_id = id
			},
			loadTop(){ //下拉加载
				this.getList('loadmore')
			},
			back () {
		      this.$router.push({
		        path: '/home'
		      })
		    },
		    getList(type){
		    	let _this = this
		    	// 获取时间余额
		    	_this.$fetch('/api/user/time-bank/')
		    		.then(res => {
		    			_this.time_bank = res.time_bank
		    		})
		    		.catch(error => {
		    			console.log(error)
		    		})
		    	// 获取时间商城	
		    	_this.$fetch('/api/trade/time-shop/')
		    		.then(res => {
		    			_this.list = res.results
		    		})
		    		.catch(error => {
		    			console.log(error)
		    		})	

	    		// complate load 
	    		if(type) this.$refs.loadmore.onTopLoaded()
		    },
		    cancel(){
		    	this.popShow = false
		    },
		    confirm(){
		    	let _this = this
		    	_this.$post('/api/trade/shop-ask/',{
		    		child: _this.user_id,
		    		time_shop: _this.goods_id
		    	}).then(res => {
			    	if(res.code == 0){
			    		this.popShow = false
			    		Toast({
							message: '提交成功',
							position: 'middle',
							duration: '1000'
						})
			    	}		    		
		    	}).catch(error => {
		    		if(error.response.data.non_field_errors[0]){
		    			Toast({
							message: '余额不足，无法兑换',
							position: 'middle',
							duration: '1000'
						})
		    		}
		    	})
		    }
		},
		mounted(){
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.timeshop{
		height: 100%;
	}
	.mint-loadmore{
		height: 100%;
		.mint-loadmore-content{
			height: 100%;
		}
	}	
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
		p.tit{
			color: #ccc;
			text-align: left;
			margin: 20px 0 0 0;
		}
	}
	.type{
		width: 700px;
		margin: 30px auto;
		border-raduis: 5px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);
		li{  
			padding: 28px 30px 0 30px;	
			-webkit-tap-highlight-color: transparent;
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
			div{
				position: relative;
				margin: 0 0 0 62px;
				padding: 0 0 40px 0;
				overflow: hidden;
				border-bottom: 1px solid #edf1f8;
				line-height: 50px;
				span{
					color: #76a9fd;
					font-size: 32px;
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