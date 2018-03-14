<template>
	<div class="home" @click="refresh">
		<header-bar title="成长盾" :showback="false"></header-bar>	
		<div class="content">
			<div class="img" :style="{'margin-top': list.length>0 ? 0 : 80 +'px'}"></div>
			<!-- <img src="../../assets/images/animation.png" alt=""> -->
			<div class="ing">
				<p class="time" v-show="list.length>0">{{remainTime}}</p>
				<p class="time" v-show="list.length==0">今日无更多休闲时间段</p>
				<div class="border" v-show="list.length>0"></div>
			</div>
			<p class="time" v-show="list.length>0">今日休闲时间段</p>
			<div class="time-list" v-show="list.length>0">
				<p class="shadow top"></p>
				<mt-loadmore :top-method="loadTop" ref="loadmore" style="-webkit-overflow-scrolling: auto">
					<ul>
						<li v-for="(val,index) in list">
							<i :class="['fl',{'past-time': val.start_time<hourMin,'after-time': val.start_time>hourMin,'now-time': hourMin>val.start_time && hourMin<val.end_time}]"></i>
							<em v-show="index < (list.length-1)"></em>
							<span class="fl slot">{{val.start_time}} — {{val.end_time}}</span>
							<span class="fr" v-show="val.minute<60">共{{val.minute}}分钟</span>
							<span class="fr" v-show="val.minute>=60">共{{val.hour}}小时</span>
 						</li>
					</ul>
				</mt-loadmore>
				<p class="shadow bottom"></p>
			</div>
			<div class="position">
				<router-link to="/timeshop" tag="button">
					时间商城
				</router-link>
				<p>时间不够用？去时间银行兑换吧！</p>				
			</div>
		</div>
		<tab-bar></tab-bar>	
	</div>
</template>

<script>
	import TabBar from '@/components/tab-bar/tab-bar'
	import HeaderBar from '@/components/header-bar/header-bar'
	import { Loadmore,InfiniteScroll,Indicator } from 'mint-ui'
	export default {
		components: {
			TabBar,
			HeaderBar
		},
		data(){
			return {
				user_id: this.$store.state.login.user_id,
				allLoaded: true,
				list: [],
				day: 1,
				hourMin: '',
				remainTime: ''   //剩余时间
			}
		},
		methods: {
			loadTop(){  //下拉加载
				this.getList()
				this.$refs.loadmore.onTopLoaded()
			},
			getDate(){
				let newDate = new Date(),
				year = newDate.getFullYear(),
	    		month = newDate.getMonth()+1,
	    		date = newDate.getDate()
				this.hourMin = this.prefixInteger(newDate.getHours())+':'+this.prefixInteger(newDate.getMinutes())
				this.day = newDate.getDay() == 0 ? 7 : newDate.getDay()
			},
			getList(){
				let _this = this,
					pastTime = [],
					date = new Date(),
					year = date.getFullYear(),
		    		month = date.getMonth()+1,
		    		day = date.getDate()
				_this.list = []
				// Indicator.open()
				_this.$fetch('/api/device/user-dayconfigs/'+_this.user_id+'/')
					.then(res => {
						Indicator.close()	
						res.map(item => {
							if(item.day == _this.day){
								_this.list.push({
									start_time: item.start_time.substr(0,5),
									end_time: item.end_time.substr(0,5),
									minute: parseInt(new Date(year+'/'+_this.prefixInteger(month)+'/'+date.getDate()+' '+item.end_time)-new Date(year+'/'+_this.prefixInteger(month)+'/'+date.getDate()+' '+item.start_time)) / 1000 / 60,
									hour: parseInt((parseInt(new Date(year+'/'+_this.prefixInteger(month)+'/'+date.getDate()+' '+item.end_time)-new Date(year+'/'+_this.prefixInteger(month)+'/'+date.getDate()+' '+item.start_time)) / 1000 / 60) / 60)
								})
							}
						})
						_this.list.sort(function(a,b){
							return a.start_time > b.start_time ? 1 : -1
						})
						_this.list.map(item => {
							if(item.start_time > _this.hourMin || item.end_time > _this.hourMin){
								pastTime.push({
									start_time: item.start_time,
									end_time: item.end_time
								})
							}
						})

						if(_this.hourMin > pastTime[0].start_time && _this.hourMin < pastTime[0].end_time){ //剩余时间
							_this.remainTime = '剩余'+parseInt((new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+pastTime[0].end_time+':00'))-(new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+_this.hourMin+':00'))) / 1000 / 60+'分钟'
						}else{
							_this.remainTime = parseInt(parseInt((new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+pastTime[0].start_time+':00'))-(new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+_this.hourMin+':00'))) / 1000 / 60) < 60 ? (parseInt((new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+pastTime[0].start_time+':00'))-(new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+_this.hourMin+':00'))) / 1000 / 60) + '分钟后进入休闲时间段' : ((parseInt((new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+pastTime[0].start_time+':00'))-(new Date(year+'/'+_this.prefixInteger(month)+'/'+day+' '+_this.hourMin+':00'))) / 1000 / 60) / 60) + '小时后进入休闲时间段'
						}
					}).catch(error => {
						Indicator.close()	
					})
			},
			prefixInteger(num){
		    	return (Array(2).join(0) + num).slice(-2)
		    },
		    refresh(){
		    	if(this.list.length == 0){
		    		this.loadTop()
		    	}
		    }
		},
		mounted(){
			this.getDate()
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		width: 100%;
		height: 90%;
		padding: 82px 0 0 0;
		background: linear-gradient(to bottom, #43D7ff , #3486fb);
		position: fixed;
		.content{
			width: 100%;
			padding: 50px 0 20px 0;
			overflow: hidden;
			text-align: center;
			.img{
				width: 471px;
				height: 386px;		
				background: url('../../assets/images/animation.png') no-repeat;		
				background-size: 100% 100%;
				margin: 0 auto;
			}
			.ing{
				p{
					font-size: 28px;
					color: #fff;
					margin: 25px 0 0 0;
					text-align: center;
				}
				.border{
					width: 696px;
					height: 2px;
					background: url(../../assets/images/border.png) repeat;
					background-size: 100% 100%;
					margin: 20px auto;
				}
			}
			p.time{
				font-size: 0.5rem;
				color: #fff;
				text-shadow: 5px 5px 5px #438cfe;
			}
			p{
				font-size: 24px;
				color: #fff;
			}
			.time-list{
				height: 360px;
				margin: 10px 20px 0 20px;
				position: relative;
				color: #fff;
				background: none;
				.shadow{
					width: 100%;
					height: 60px;
					background: linear-gradient(to bottom, rgba(59, 172, 253,0.7) , rgba(59, 172, 253,0));
					position: absolute;
					z-index: 10;
				}
				.top{
					top: 0;
				}
				.bottom{
					bottom: 0;
					background: linear-gradient(to bottom, rgba(54, 148, 251,0) , rgba(54, 148, 251,0.9));
				}
				.mint-loadmore{
					height: 360px;
					overflow:scroll;  
					-webkit-overflow-scrolling:touch;  
					ul{
						height: 100%;
						background: none;
						li:first-child{
							margin: 20px 0 0 0;
						}
						li{
							width: 100%;
							height: 90px;
							// overflow: hidden;
							position: relative;
							i{
								width: 22px;
								height: 22px;	
								margin: 10px 0 0 10px;							
							}
							i.past-time{
								background-color: #fff;
								border: 1px solid #fff;
								border-radius: 50%;
							}
							i.now-time{
								background-color: #fff;
								border-radius: 50%;
								transition: all linear 0.1s;
								-webkit-transition: all linear 0.1s;
								box-shadow: 0 0 8px 10px white; 
								animation-name: bling;
								animation-duration: 1s;
								animation-iteration-count: infinite;
								animation-direction: alternate; 
							}
							i.after-time{
								background: none;
								border-radius: 50%;
								border: 1px solid #fff;
							}
							em{
								display: block;
								height: 68px;
								border-left: 2px dashed #fff;
								position: absolute;
								bottom: -12px;
								left: 20px;
							}
							span{
								color: #fff;
								font-size: 32px;
							}
							span.slot{
								width: 60%;
								text-align: left;
								text-indent: 2em;
							}
						}
					}					
				}
				.mint-loadmore::-webkit-scrollbar{
					width: 0;
					height: 0;
				}
			}
			.position{
				position: absolute;
				bottom: 50px;
				width: 100%;
				z-index: 10;
				button{
					width: 148px;
					height: 63px;
					line-height: 63px;
					background-color: #fff;
					border-radius: 30px;
					border: none;
					margin: 40px 0 15px 0;
					color: #3485fb;
					font-size: 30px;
					box-shadow: 0 0 10px 10px rgba(41,124,254,0.5);  
				}
			}
		}
	}
	@keyframes bling {
		from {
			box-shadow: 0 0 8px 10px white; 
		}
		to {
			box-shadow: 0 0 8px 7px white; 
		} 
	}
	@-webkit-keyframes bling {
		from {
			box-shadow: 0 0 8px 10px white; 
		}
		to {
			box-shadow: 0 0 8px 7px white; 
		} 
	}		
</style>