<template>
	<div class="setting">
		<header-bar title="获得更多时间" :showback="false" :showButton="true" @submit="submit"></header-bar>
		<ul>
			<li :class="{'active' : index == activeIndex}" v-for="(list,index) in houseworkList" @click="toggle(index)">
				<i class="icon"></i>
				<div>
					<span class="title fl">{{list.name}}</span>
					<span class="fr">{{list.time}}时间币</span>
				</div>
			</li>
		</ul>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import TabBar from '@/components/tab-bar/tab-bar'
	import { Toast } from 'mint-ui'
	export default {
		components: {
			TabBar,
			HeaderBar
		},
		data(){
			return {
				activeIndex: '-1',
				houseworkList: [{
					name: '打扫房间',
					time: 20
				},{
					name: '倒垃圾',
					time: 30
				}]
			}
		},
		methods: {
			toggle(index){
				this.activeIndex = index
			},
			submit(){
				if(this.activeIndex < 0){
					Toast({
						message: '请选择时间',
						position: 'middle',
						className: 'toast'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-header{
		background-color: #76a9fd;
	}
	ul{
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
</style>