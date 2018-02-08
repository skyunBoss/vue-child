<template>
	<div class="news">
		<header-bar title="消息" :showback="true" @back="back"></header-bar>
		<div class="news-bg"></div>
		<div class="content">
			<div class="news-nav">
				<div class="news-nav_item active">家务兑换</div>
				<div class="news-nav_item">时间段兑换</div>
			</div>
			<ul class="news-list">
				<li class="news-item">
					<p class="news-item_content"><span>家务名称：</span><span>扫地</span></p>
					<p class="news-item_content"><span>兑换时间：</span><span>15min</span></p>
					<p class="news-item_content"><span>申请时间：</span><span>2017年08月11日 11:38</span></p>
					<div class="hr"></div>			
					<p class="news-item_apply agree">您的申请已同意</p>
				</li>
				<li class="news-item">
					<p class="news-item_content"><span>家务名称：</span><span>扫地</span></p>
					<p class="news-item_content"><span>兑换时间：</span><span>15min</span></p>
					<p class="news-item_content"><span>申请时间：</span><span>2017年08月11日 11:38</span></p>
					<div class="hr"></div>
					<p class="news-item_apply reject">您的申请已拒绝</p>
				</li>
				<li class="news-item">
					<p class="news-item_content"><span>家务名称：</span><span>扫地</span></p>
					<p class="news-item_content"><span>兑换时间：</span><span>15min</span></p>
					<p class="news-item_content"><span>申请时间：</span><span>2017年08月11日 11:38</span></p>
					<div class="hr"></div>
					<p class="news-item_apply submit">您的申请已提交</p>
				</li>
				<li class="news-item">
					<p class="news-item_content"><span>家务名称：</span><span>扫地</span></p>
					<p class="news-item_content"><span>兑换时间：</span><span>15min</span></p>
					<p class="news-item_content"><span>申请时间：</span><span>2017年08月11日 11:38</span></p>
					<div class="hr"></div>
					<p class="news-item_apply submit">您的申请已提交</p>
				</li>
				<li class="news-item">
					<p class="news-item_content"><span>家务名称：</span><span>扫地</span></p>
					<p class="news-item_content"><span>兑换时间：</span><span>15min</span></p>
					<p class="news-item_content"><span>申请时间：</span><span>2017年08月11日 11:38</span></p>
					<div class="hr"></div>
					<p class="news-item_apply submit">您的申请已提交</p>
				</li>
			</ul>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	import TabBar from '@/components/tab-bar/tab-bar'
	export default {
		components: {
			HeaderBar,
			TabBar
		},
		methods: {
			back () {
		      this.$router.push({
		        path: '/mine'
		      })
		    }
		}
	}
</script>	

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
	.news-bg {
		height: 4rem;
		background: #76a9fd;	
	}
	.news {	
		height: 100%;

		.content {
			position: absolute;
			top: 100px;
			left: 0;
			width: 100%;
			height: calc(100% - 190px);
		}

		.news-nav {
			margin: 10px auto 20px;
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

		.news-list {
			height: calc(100% - 120px);
			overflow: scroll;
			&::-webkit-scrollbar {
				display: none;
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
			.hr {
				margin: 20px 0;				
				height: 0.02rem;
				background: #eaeaea;
			}
			& + .news-item {
				margin-top: 24px;
			}
		}

		.news-item_apply {
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