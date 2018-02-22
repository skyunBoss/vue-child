<template>
	<div class="changePeriod">
		<header-bar title="兑换休闲时间段" backTitle="时间商城" :showback="true" @back="back" :showButton="true" @submit="submit"></header-bar>	
		<div class="content">
			<div class="time">
				<div>
					<i class="icon icon-time"></i>
					时间银行余额
				</div>
				<p><em>{{time_bank}}</em>&nbsp;&nbsp;时间币</p>
				<p class="tit">*注：1时间币可兑换1分钟上网时间</p>
			</div>
			<div class="time">
				<div>
					<i class="icon icon-period"></i>
					申请兑换时间
				</div>
				<ul class="week">
					<li :class="{active: weekActive == index , sat: val.name=='周六'}" v-for="(val,index) in week" @click="weekToogle(index,val.value)">{{val.name}}</li>
				</ul>
				<div class="start_time" @click="openPicker('start')">
					<span class="fl">开始时间</span>
					<span class="right"></span>
					<span class="fr">{{start_time}}</span>
				</div>
				<div class="over_time" @click="openPicker('over')">
					<span class="fl">结束时间</span>
					<span class="right"></span>
					<span class="fr">{{over_time}}</span>
				</div>
			</div>
			<div class="time">
				<div>
					<i class="icon icon-device"></i>
					选择兑换设备
				</div>
				<ul class="device">
					<li :class="{active: deviceActiveIndex == index}" v-for="(val,index) in device_list" @click="toggle(index,val.id,1)">
						<i class="icon"></i>
						<div>
							<span class="title">{{val.name}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="time">
				<div>
					<i class="icon icon-user"></i>
					选择家长
				</div>
				<ul class="device">
					<li :class="{active: userActiveIndex == index}" v-for="(val,index) in user_list" @click="toggle(index,val.id,2)">
						<i class="icon"></i>
						<div>
							<span class="title">{{val.name}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<mt-datetime-picker
		ref="picker"
		type="time" @confirm="handleConfirm">
		</mt-datetime-picker>		
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import { DatetimePicker,Toast } from 'mint-ui'
	export default {
		components: {
			HeaderBar,
			DatetimePicker
		},
		data(){
			return {
				time_bank: '',   //时间银行余额
				weekActive: 0,
				week: [{
					name: '周一',
					value: 1
				},{
					name: '周二',
					value: 2
				},{
					name: '周三',
					value: 3
				},{
					name: '周四',
					value: 4
				},{
					name: '周五',
					value: 5
				},{
					name: '周六',
					value: 6
				},{
					name: '周日',
					value: 7
				}],
				day: 1,
				device_list: [],  //设备列表
				user_list: [],  //用户列表
				deviceActiveIndex: 0,
				userActiveIndex: 0,
				device_id: '',
				user_id: '',
				type: '',
				start_time: '09:00',
				over_time: '16:00',
				role: ['PARENT_ADMIN','PARENT_NORMAL']  //家长操作权限
			}
		},
		methods: {
			openPicker(type) {
				this.type = type
				this.$refs.picker.open();
			},
			back () {
		      this.$router.push({
		        path: '/timeshop'
		      })
		    },
		    weekToogle(index,value){
		    	this.weekActive = index
		    	this.day = value
		    },
		    toggle(index,id,type){
		    	if(type==1){
		    		this.deviceActiveIndex = index
		    		this.device_id = id
		    	}else{
		    		this.user_id = id
		    		this.userActiveIndex = index
		    	}
		    },
		    handleConfirm(time){
		    	if(this.type == 'start'){
		    		this.start_time = time
		    	}else{
		    		this.over_time = time
		    	}
		    },
		    submit(){
		    	let _this = this,
		    		newDate = new Date(),
		    		year = newDate.getFullYear(),
		    		month = newDate.getMonth()+1,
		    		date = newDate.getDate(),
		    		day = newDate.getDay() == 0 ? 7 : newDate.getDay(),
		    		hourMin = _this.prefixInteger(newDate.getHours())+':'+newDate.getMinutes(),
		    		countDay = ((_this.day >= day && _this.start_time >= hourMin)) ? (_this.day-day) : 7
	    		/*****
				** 判断选择时间是否大于当前时间
				** 通过周几判断
	    		****/
    			if(_this.start_time < _this.over_time){
			    	if(_this.device_id == -1){  //兑换孩子所有自己设备的放行时间段
			    		_this.$post('/api/trade/buy-period-dev/',{
			    			start: (new Date(year+'-'+_this.prefixInteger(month)+'-'+parseInt(date+countDay)+' '+_this.start_time)) / 1000,
			    			end: (new Date(year+'-'+_this.prefixInteger(month)+'-'+parseInt(date+countDay)+' '+_this.over_time)) / 1000,
			    			parent: _this.user_id
			    		}).then(res => {
			    			Toast({
								message: '提交成功',
								duration: '1000'
							})
							_this.$router.push({
								path: '/timeshop'
							})
			    		}).catch(error => {
			    			Toast({
								message: '余额不足',
								duration: '1000'
							})
			    		})
			    	}else{  //兑换某一设备的放行时间段
			    		_this.$post('/api/trade/buy-period/',{
			    			start: (new Date(year+'-'+_this.prefixInteger(month)+'-'+parseInt(date+(_this.day-day))+' '+_this.start_time)) / 1000,
			    			end: (new Date(year+'-'+_this.prefixInteger(month)+'-'+parseInt(date+(_this.day-day))+' '+_this.over_time)) / 1000,
			    			parent: _this.user_id,
			    			device: _this.device_id
			    		}).then(res => {
			    			Toast({
								message: '提交成功',
								duration: '1000'
							})
							_this.$router.push({
								path: '/timeshop'
							})
			    		}).catch(error => {
			    			Toast({
								message: '余额不足',
								duration: '1000'
							})
			    		})
			    	}   				
    			}else{
    				Toast({
						message: '结束时间必须大于开始时间',
						duration: '1000'
					})
    			}    		
		    },
		    prefixInteger(num){
		    	return (Array(2).join(0) + num).slice(-2)
		    },
		    getList(){
		    	let _this = this
		    	_this.device_list = []
		    	_this.user_list = []
		    	// 获取时间余额
		    	_this.$fetch('/api/user/time-bank/')
		    		.then(res => {
		    			_this.time_bank = res.time_bank
		    		})
		    		.catch(error => {
		    			console.log(error)
		    		})
		    	// 获取设备列表和家庭用户
		    	_this.$fetch('/api/device/device-statistics/')
		    		.then(res => {
    					_this.device_list.push({
    						id: -1,
    						name: '我的设备'
    					})
		    			res.results[0].device_list.map(item => {
		    				if(item.public){
		    					_this.device_list.push({
		    						id: item.id,
		    						name: item.device_name
		    					})
		    				}
		    			})
		    			res.results[0].user.map(item => {
		    				_this.role.map(role => {
								if(item.role == role){
									_this.user_list.push({
										id: item.id,
										name: item.username
									})
								}
							})
		    			})
		    			_this.device_id = _this.device_list[0].id
		    			_this.user_id = _this.user_list[0].id
		    		})
		    		.catch(error => {
		    			console.log(error)
		    		})	
		    }		    
		},
		mounted(){
			this.getList()
		}
	}
</script>	

<style lang="scss" scoped>
	.changePeriod{
		padding: 82px 0 0 0;
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
		overflow: hidden;
		div{
			font-size: 30px;
			color: #76a9fd;
			line-height: 36px;
			i.icon-time{
				display: block;
				width: 36px;
				height: 36px;
				background: url(../../assets/images/clock.png) no-repeat;
				background-size: 100% 100%;
				float: left;
				margin: 0 20px;
			}
			i.icon-period{
				display: block;
				width: 36px;
				height: 36px;
				background: url(../../assets/images/icon-period.png) no-repeat;
				background-size: 100% 100%;
				float: left;
				margin: 0 20px;
			}
			i.icon-device{
				display: block;
				width: 36px;
				height: 36px;
				background: url(../../assets/images/icon-device.png) no-repeat;
				background-size: 100% 100%;
				float: left;
				margin: 0 20px;
			}
			i.icon-user{
				display: block;
				width: 36px;
				height: 36px;
				background: url(../../assets/images/icon-user.png) no-repeat;
				background-size: 100% 100%;
				float: left;
				margin: 0 20px;				
			}
		}
		ul.week{
			margin: 58px 0 0 0;
			overflow: hidden;
			li{
				width: 91px;
				height: 91px;
				line-height: 91px;
				text-align: center;
				border-radius: 50%;
				border: 2px solid #dedede;
				color: #dedede;
				float: left;
				margin: 0 18px 10px 18px;
			}
			li.sat{
				margin: 0 40px 10px 200px;
			}
			li.active{
				border: 2px solid #76a9fd;
				background-color: #76a9fd;
				color: #fff;
				box-shadow: 1px 1px 20px rgba(118,169,253,0.5);
			}
		}
		ul.device{
			margin: 20px 0 0 0;
			overflow: hidden;	
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
		.start_time,.over_time{
			margin: 40px 0 0 0;
			color: #4a4a4a;
			font-size: 32px;
			width: 100%;
			overflow: hidden;
			span{
				color: #4a4a4a;
				font-size: 32px;
			}
			span.fr{
				color: #76a9fd;
				font-size: 40px;
				font-weight: bold;
				margin: 0 40px 0 0;
			}
			.right{
				width: 18px;
				height: 31px;
				background: url(../../assets/images/icon-nav-color.png) no-repeat;
				background-size: 100% 100%;
				float: right;
			}
		}
		.start_time{
			border-bottom: 1px solid #dedede;
			padding: 0 0 40px 0;
		}
		.over_time{
			padding: 0 0 20px 0;
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
	.picker-toolbar{
		height: 80px;
	}
</style>	