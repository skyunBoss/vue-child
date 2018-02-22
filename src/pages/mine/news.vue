<template>
	<div class="news">
		<header-bar title="消息" :showback="true" @back="back"></header-bar>
		<div class="news-bg">
			<div class="news-nav">
				<router-link to="/news/task" tag="div" :class="['news-nav_item',{active: activeIndex==0}]" @click.native="toggle(0,'hwa')">任务兑换</router-link>
				<router-link to="/news/time" tag="div" :class="['news-nav_item',{active: activeIndex==1}]" @click.native="toggle(1,'bpd')">时间段兑换</router-link>
			</div>			
		</div>
		<router-view></router-view>		
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import { Toast,Indicator,Loadmore } from 'mint-ui'
	export default {
		components: {
			HeaderBar
		},
		data(){
			return {
				activeIndex: 0
			}
		},
		methods: {
			back () {
		      this.$router.push({
		        path: '/mine'
		      })
		    },
		    toggle(index,msgType){
		    	this.activeIndex = index
		    }
		}
	}
</script>	

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
	.news {	
		height: 100%;
		.news-bg{
			width: 100%;
			height: 250px;
			position: fixed;
			top: 0;
			z-index: 0;
			background-color: #76a9fd;
			.news-nav {
				margin: 80px auto 0;
				width: 500px;
				font-size: 28px;
				color: #fff;
				&:before, &:after {
					content: "";
					display: table;
				}
				&:after {
					clear: both;
				}
			}
			.news-nav_item {
				position: relative;
				padding: 16px 0;
				float: left;
				width: 250px;
				text-align: center;
				&.active {
					&:after {
						content: "";
						position: absolute;
						bottom: 0;
						left: 17%;
						display: block;	
						width: 66%;
						height: 4px;
						background: #fff;
					}
				}
			}
		}
	}

</style>	