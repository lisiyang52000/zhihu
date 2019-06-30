<template>
  <div id="app">
	<navBar></navBar>
	<router-view></router-view>	
  </div>
</template>

<script>
	import header from './components/index-header'
export default {
  name: 'App',
  components:{
  		navBar:header
  }
}
</script>

<style>

</style>
