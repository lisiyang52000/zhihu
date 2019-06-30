<template>
	<div id="content">
    <div class="flex-content">
      <router-link class="box" :to="{name: 'story', params: {id:item.id}}"  v-for="item in topStories">
        <img :src="'https://images.weserv.nl/?url='+item.image">
        <span>{{item.title}}</span>

    </router-link>
   
    </div>
      <nav>
    <div class="nav-wrapper center">
      <span @click="pre" onselectstart="return false;"><</span>
      {{date}}
      <span @click="next" onselectstart="return false;">></span>
    </div>
  </nav>
  <div class="itemBox">
    <router-link class="item" v-for="item in stories" :to="{name: 'story', params: {id:item.id}}" >
      <img :src="'https://images.weserv.nl/?url='+item.images" >
      <span>{{item.title}}</span>
    </router-link>
  </div>
	</div>
</template>
<script>
export default{
  created(){
  this.getData()
  },
  watch:{
    date:'change'
  },
      data(){
        return {
             date: null,
            stories: [],
            topStories: [],
            loading: true
        }},
        methods:{
          getData(){
            this.$http.get(`${this.$url}/api/4/news/latest`)
            .then(res=>{
              console.log(res)
              this.date = parseInt(res.data.date, 10) 
               this.stories = res.data.stories
               this.topStories = res.data.top_stories
                this.loading = false
            }).catch(e => {
                  console.log(e)
                })
          },
         change(){
          const date = new Date().getDate()
          if (parseInt(('' + this.date).slice(-2)) > date) {

          }else{
              this.$http.get(`${this.$url}/api/4/news/before/${this.date}`)
                      .then(res => {
                          this.stories = res.data.stories
                      })
                      .catch(e => {
                        console.log(e)
                    })
          }

         },
          pre(){
            this.date-=1
          },
          next(){
           this.date+=1
          }
        }
      
}

	
</script>
<style lang="less" scoped>
  #content{
    width:100%;
    font-size:20px;
    nav{
    background:#ba68c8; }
    .flex-content{
       width:100%;
      display:flex;
      flex-wrap: wrap;
     
      .box{
        display:flex;
        position:relative;
        width:30%;
        height:15rem;
        margin:1rem;
        flex-grow:1;
        
        img{
          width:100%;
          height:100%;
        }
        span{
          width:100%;
          padding:0 1rem;  
          color:#fff;
          position:absolute;
          bottom:0;

        }
      }

    }
    .itemBox{
      display:flex;
      width:100%;
      flex-wrap: wrap;
     
      .item{
        width:100%;
        height:8rem;
        display:flex;
         box-shadow: 3px 3px 5px 5px #B2B0B0 inset;
         margin:1.2rem 0;

        img{
          height:100%;
          width:8rem;
        }
        span{
          height:100%;
          flex-grow:1;
          line-height:8rem;
          padding:0 2rem;
          color:#ba68c8;

        }
      }
    }
  }
</style>