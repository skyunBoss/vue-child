<template>
	<div>
		<header-bar title="设置" :showback="true" @back="back"></header-bar>	
		<ul>
			<li>
				<span class="title fl">消息</span>
				<span class="fr name">刘冉冉</span>
			</li>
			<li>
				<input type="file" name="photo" id="photo" @change="onfilechange">
				<span class="title fl">头像</span>
				<span class="fr">
					<img :src="imgUrl">
				</span>
			</li>
			<router-link to="/setpassword" tag="li">
				<span class="title fl">修改密码</span>
				<span class="fr icon-nav"></span>
			</router-link>
		</ul>
	</div>
</template>

<script>
	import HeaderBar from '@/components/header-bar/header-bar'
	export default {
		components: {
			HeaderBar
		},
		data(){
			return {
				imgUrl: require("@/assets/images/tx.png")
			}
		},
		methods: {
			back () {
		      this.$router.push({
		        path: '/mine'
		      })
		    },
		    onfilechange(e){
		    	let _this = this
				let files = e.target.files || e.dataTransfer.files
				if (!files.length) return

				let reader = new FileReader()
				reader.onload = (e) =>{
					_this.imgUrl = e.target.result				
				}
				reader.readAsDataURL(files[0])
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.mint-header{
		background: #76a9fd;
	}
	ul{
		width: 670px;
		padding: 0 15px;
		background-color: #fff;
		box-shadow: 8px 10px 20px rgba(63,127,233,0.1);		
		border-radius: 5px;
		margin: 30px auto;
		li{  
			padding: 0 15px;	
			overflow: hidden;
			border-bottom: 1px solid #edf1f8;
			line-height: 100px;
			height: 100px;
			position: relative;
			input[type="file"]{
				position: absolute;
				width: 100%;
				height: 100%;
				background-color:transparent;
				opacity: 0;
			}
			span{
				color: #4a4a4a;
				font-size: 30px;
				img{
					width: 78px;
					height: 78px;
					display: inline-block;
					vertical-align: middle;
					border-radius: 50%;				
				}
			}
			span.name{
				width: 30%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: right;
			}
			.icon-nav{
				width: 18px;
				height: 31px;
				background: url('../../assets/images/icon-nav.png') no-repeat;
				background-size: 100% 100%;
				display: block;		
				position: absolute;				
				top: 50%;
				right: 15px;
				margin-top: -15.5px;
			}
		}
		li:last-child{
			margin: 0;
			border: none;
		}
	}	
</style>	