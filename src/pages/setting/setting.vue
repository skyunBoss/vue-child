<template>
	<div class="setting">
		<header-bar title="获得更多时间" :showback="false" :showButton="true" @submit="submit"></header-bar>
		<mt-loadmore :top-method="loadTop" ref="loadmore">
			<ul class="list">
				<li :class="{'active' : index == activeIndex}" v-for="(list,index) in houseworkList" @click="toggle(index,list.id)">
					<i class="icon"></i>
					<div>
						<span class="title fl">{{list.name}}</span>
						<span class="fr">{{list.earn_time}}时间币</span>
					</div>
				</li>
			</ul>
		</mt-loadmore>
		<tab-bar></tab-bar>

		<!-- pop -->
		<div :class="popShow ? 'pop-window animated fadeIn displayShow' : 'pop-window animated fadeOut displayNone'">
			<div class="pop-main">
				<div class="title">
					选择家长
				</div>
				<ul>
					<li :class="{'active' : index == popActiveIndex}" v-for="(val,index) in familyList" @click="popToggle(index,val.id)">
						<span class="name fl">{{val.name}}</span>
						<span class="fr"><i class="icon"></i></span>
					</li>
				</ul>
				<div class="btn">
					<button class="cancel fl" @click="cancel">取消</button>
					<button class="confirm fr" @click="confirm">确定</button>
				</div>
			</div>
			<div class="mask"></div>
		</div>		
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import TabBar from '@/components/tab-bar/tab-bar'
	import { Toast,Indicator,Loadmore } from 'mint-ui'
	export default {
		components: {
			TabBar,
			HeaderBar
		},
		data(){
			return {
				activeIndex: -1,
				popActiveIndex: 0,
				houseworkId: '',
				parentId: '',
				houseworkList: [],
				user_id: this.$store.state.login.user_id,
				popShow: false,
				familyList: [],
				role: ['PARENT_ADMIN','PARENT_NORMAL']  //家长操作权限
			}
		},
		methods: {
			toggle(index,id){  //houser-work toggle
				this.activeIndex = index
				this.houseworkId = id
			},
			loadTop(){  //下拉加载
				this.getList('loadmore')
			},
			popToggle(index,id){  //parent toggle
				this.popActiveIndex = index
				this.parentId = id
			},
			getList(type){
				let _this = this
				if(!type) Indicator.open()  //loading
				_this.$fetch('/api/housework-list/'+_this.user_id+'/')
					.then(res => {
						if(!type){
							Indicator.close()
						}
						_this.houseworkList = res
					})
					.catch(error => {
						console.log(error)
					})
				if(type) this.$refs.loadmore.onTopLoaded()	
			},
			submit(){
				let _this = this
				if(_this.activeIndex < 0){
					Toast({
						message: '请选择时间',
						duration: '1000'
					})
				}else{
					_this.popShow = true  //show pop
					_this.familyList = []
					Indicator.open()
					_this.$fetch('/api/family/family-list/'+_this.user_id+'/')
						.then(res => {
							Indicator.close()
							res.family.map(item => {
								_this.role.map(role => {
									if(item.role == role){
										_this.familyList.push({
											id: item.id,
											name: item.name
										})
									}
								})
							})
							_this.parentId = _this.familyList[0].id
						})
						.catch(errror => {
							Indicator.close()
						})
				}
			},
			cancel(){
				this.popShow = false  //hide pop
			},
			confirm(){
				let _this = this
				Indicator.open()
				_this.$post('/api/trade/housework-ask/',{
					housework: this.houseworkId,
					parent: _this.parentId
				})
					.then(res => {
						Indicator.close()
						Toast({
							message: '提交成功'
						})
						_this.popShow = false
					})
					.catch(error => {
						Indicator.close()
						Toast({
							message: '操作失败'
						})
					})
			}
		},
		mounted(){
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.setting{
		padding: 82px 0 0 0;
		height: 100%;
	}
	.mint-loadmore{
		height: 100%;
		.mint-loadmore-content{
			height: 100%;
		}
	}
	.mint-header{
		background-color: #76a9fd;
	}
	ul.list{
		width: 670px;
		margin: 30px auto;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);		
		li{  
			padding: 28px 30px 0 30px;	
			.icon{
				width: 42px;
				height: 42px;
				background: url('../../assets/images/icon-select.png') no-repeat;
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
				line-height: 42px;
				span{
					color: #76a9fd;
					font-size: 30px;
				}
				span.title{
					color: #4a4a4a;
					font-size: 30px;
					width: 70%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
		li.active{
			.icon{
				background: url('../../assets/images/icon-selectActive.png') no-repeat;
				background-size: 100% 100%;
			}
		}	
	}
	.pop-window{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		.mask{
			background-color: rgba(0,0,0,0.2);			
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		.pop-main{
			width: 625px;
			background-color: #fff;
			border-radius: 5px;
			position: absolute;
			top: 30%;
			left: 50%;
			margin-left: -312.5px;
			overflow: hidden;
			.title{
				font-size: 36px;
				color: #fff;
				text-align: center;
				height: 96px;
				line-height: 96px;
				background-color: #76a9fd;
			}
			ul{
				padding: 0 75px;
				li{
					margin: 42px 0 0 0;
					overflow: hidden;
					.name{
						font-size: 30px;
						color: #4a4a4a;
					}
					.icon{
						width: 42px;
						height: 42px;
						background: url('../../assets/images/icon-select.png') no-repeat;
						background-size: 100% 100%;
						display: block;
						float: left;
					}
				}
				li.active{
					.icon{
						background: url('../../assets/images/icon-selectActive.png') no-repeat;
						background-size: 100% 100%;
					}
				}					
			}
			.btn{
				width: 100%;
				margin: 42px 0 0 0;
				.cancel{
					width: 50%;
					height: 107px;
					line-height: 107px;
					border: none;
					border-top: 1px solid #edf1f8;
					border-right: 1px solid #edf1f8;
					color: #3679e6;
					font-size: 32px;
					text-align: center;
					background: none;
				}
				.confirm{
					width: 50%;
					height: 107px;
					line-height: 107px;
					border: none;
					border-top: 1px solid #edf1f8;
					border-radius: 5px;
					background: none;
					color: #3679e6;
					font-size: 32px;
					text-align: center;
				}
			}
		}
	}	
</style>