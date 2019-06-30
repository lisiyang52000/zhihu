<template>
	<div id="header">

	  <nav>

    <div class="nav-wrapper">
  <ul id="dropdown1" class="dropdown-content">
  <li><a href="#!">一</a></li>
  <li><a href="#!">二</a></li>
  <li class="divider"></li>
  <li><a href="#!">三</a></li>
</ul>
      <router-link to="/">
      	<img class="app-logo" src="../assets/imgs/brand.png" alt="知乎日报" title="首页">
      </router-link>	
      <div class="brand-logo center">
			<span v-if="this.$route.name=='index'">
				首页
			</span>
			<span  v-else-if="this.$route.name === '/hot'">
				热门文章
			</span>
			<span  v-else-if="this.$route.name === 'favorite'">
            共计: {{ this.$store.getters.getFavoritesStoryNum }}
			
			</span>
      </div>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/favorite">收藏</router-link></li>
        <li><router-link to="/hot">热门</router-link></li>
        <li><a href="#" data-activates="dropdown1"><i class="material-icons">more_vert</i></a></li>
    </ul>

    </div>
  </nav>

       	</div>
</template>
<script>
export default{

}

	
</script>
<style lang='less' scoped>

	nav{
		background:#ba68c8;	
		   .app-logo{
	      padding: 12px;
	      height: 60px;
	      padding-left: 60px;}
    }

	

</style>