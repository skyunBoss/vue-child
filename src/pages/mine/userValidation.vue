<template>
	<div class="userValidation">
		<header-bar title="设置" :showback="true" @back="back"></header-bar>	
		<ul>
			<li>
				<span class="title fl">用户名</span>
				<span class="fr name">{{username}}</span>
			</li>
			<li>
				<!-- <input type="file" name="photo" id="photo" @change="onfilechange" accept="image/*"> -->
				<span class="title fl">头像</span>
				<span class="fr img" :style="{'background': 'url('+imgUrl+') 0% 0% / cover no-repeat'}"></span>
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
	import { Toast } from 'mint-ui'
	export default {
		components: {
			HeaderBar
		},
		data(){
			return {
				imgUrl: '',
				username: this.$store.state.login.username
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
				let formdata = new FormData()
				if (!files.length) return

				let reader = new FileReader()
				reader.onload = (e) =>{
					_this.imgUrl = e.target.result				
				}
				// reader.readAsDataURL(files[0])
				formdata.append('avatar_url',files[0])
				_this.$post('/api/user/info/',formdata)
					.then(res => {
						_this.imgUrl = res.avatar_url ? _this.publicUrl+res.avatar_url : require("@/assets/images/tx.jpg");
					})
					.catch(error => {
						Toast({
							message: '更换头像失败',
							duration: '1000'
						})
					})
		    },
		    getUserInfo(){
				let _this = this
				_this.$fetch('/api/user/info/')
					.then(res => {
						_this.imgUrl = res.avatar_url ? _this.publicUrl+res.avatar_url : require("@/assets/images/tx.jpg");
					})
			}
		},
		mounted(){
			this.getUserInfo()
		}
	}
</script>

<style lang="scss" scoped>
	.userValidation{
		
	}
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
			}
			span.img{
				width: 78px;
				height: 78px;
				display: inline-block;
				vertical-align: middle;
				border-radius: 50%;	
				position: absolute;			
				top: 50%;
				right: 15px;
				margin-top: -39px;
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