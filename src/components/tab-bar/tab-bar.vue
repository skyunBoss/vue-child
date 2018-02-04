<!-- 底部导航栏 组件 -->
<template>
  <div class="tab-bar">
    <mt-tabbar>
      <router-link class="mint-tab-item" tag="div" to="/home"> 
        <i class="icon icon-home"></i>
      </router-link>  

      <router-link class="mint-tab-item" tag="div" to="/setting">
        <i class="icon icon-setting"></i>
      </router-link>  

      <router-link class="mint-tab-item" tag="div" to="/mine">
        <i class="icon icon-mine"></i>
      </router-link>       
    </mt-tabbar>    
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 84px;
  box-shadow: 0 -5px 0 rgba(118,169,253,0.2);
  background-color: #fff;  
  .mint-tabbar{
    height: 100%;
    .mint-tab-item{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;  
      align-items: center; 
      padding: 0;
      .icon{
        width: 38px;
        height: 38px;
        display: block;
      }
      .icon-home{
        background: url(../../assets/images/home.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-setting{
        background: url(../../assets/images/setting.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-mine{
        background: url(../../assets/images/mine.png) no-repeat;
        background-size: 100% 100%;
      }      
    }
    .mint-tab-item:hover{
      background: none;
    }
    .router-link-active{
      .icon-home{
        background: url(../../assets/images/home-hover.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-setting{
        background: url(../../assets/images/setting-hover.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-mine{
        background: url(../../assets/images/mine-hover.png) no-repeat;
        background-size: 100% 100%;
      }  
    }
  }
}
</style>
