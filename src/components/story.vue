<template>
	<div id="story">
		<div class="imgBox">
			<img :src="'https://images.weserv.nl/?url='+story.image">
			<span>{{ story.title }}</span>
		</div>
		<div class="col l12 s12 m12" v-html="storyBody"></div>
		    <div class="story-actions">
           <a class="btn-floating btn-large waves-effect waves-light purple lighten-2" @click="removeFavoriteStory" v-if="favorite"><i class="material-icons">favorite</i></a>

           <a class="btn-floating btn-large waves-effect waves-light purple lighten-2" @click="addFavoriteStory" v-else="favorite"><i class="material-icons">favorite_border</i></a>
           <!-- 返回上级按钮 -->
           <a class="btn-floating btn-large waves-effect waves-light purple lighten-2"><i class="material-icons" @click="goBack">keyboard_return</i></a>
        </div>
               <div class="col l12 s12 m12">
            <!-- long-comments -->
            <p style="color:#999;">评论</p>
            <div class="card-panel comments" v-for="comment of longComments">
                <div class="valign-wrapper comment-info">
                  <img :src="'https://images.weserv.nl/?url='+comment.avatar">
                  <i class="material-icons margin-left">account_circle</i>
                  <span>&nbsp;{{ comment.author }}</span>
                  <i class="material-icons margin-left">thumb_up</i>
                  <span>&nbsp;{{ comment.likes }}</span>
                </div>
                <p class="comment-content">{{ comment.content }}</p>
            </div>
            <!-- short-comments -->
            <div class="card-panel comments" v-for="comment of shortComments">
                <div class="valign-wrapper comment-info">
                  <img :src="'https://images.weserv.nl/?url='+comment.avatar">
                  <i class="material-icons margin-left">account_circle</i>
                  <span>&nbsp;{{ comment.author }}</span>
                  <i class="material-icons margin-left">thumb_up</i>
                  <span>&nbsp;{{ comment.likes }}</span>
                </div>
                <p class="comment-content">{{ comment.content }}</p>
            </div>
        </div>
	</div>
</template>
<script>
	export default{
		 created() {
    this.getStory(this.$route.params.id)
  },
			data(){
				return {
					story: {},
			      longComments: [],
			      shortComments: [],
			      loading: true,
			      favorite: false
				}
			},
			methods:{
				   getStory(storyId) {
      this.$http.get(`${this.$url}/api/4/news/${storyId}`)
                .then(res => {
                  this.story = res.data
                  console.log(res.data)
                  this.getLongComments(this.$route.params.id)
                })
                .catch(e => {
                  console.log(e)
                })
    },
     // 获取文章长评
    getLongComments(storyId) {
      this.$http.get(`${this.$url}/api/4/story/${storyId}/long-comments`)
                .then(res => {
                  this.longComments = res.data.comments
                  console.log('评论'+res.data.comments)
                  this.getShortComments(this.$route.params.id)
                })
                .catch(e => {
                  console.log(e)
                })
    },
    // 获取文章短评
    getShortComments(storyId) {
      this.$http.get(`${this.$url}/api/4/story/${storyId}/short-comments`)
                .then(res => {
                  this.shortComments = res.data.comments
                  this.loading = false
                })
                .catch(e => {
                  console.log(e)
                })
    },
        //删除收藏
    removeFavoriteStory(){
        let story = {id: this.story.id}
        this.$store.dispatch('removeFavoriteStory',story)
        this.favorite = false

    },
    //添加收藏
    addFavoriteStory(){
    	   let story = {
     
        id: this.story.id,
        title: this.story.title,
        image: this.story.images[0],
        created_at: Date.now()
      }
        this.$store.dispatch('addFavoriteStory', story)
        console.log(this.$store.state.favorites)
      this.favorite = true

    },
    goBack(){}
			},
			  computed: {
    storyBody() {
      return ''+this.story.body
                      	.replace(/headline/,'')
                       .replace(/img\-place\-holder/,'')
                       .replace(/view\-more/,'')
                       .replace(/查看知乎讨论/,'')
                       .replace(/http\:\/\//g,'https://images.weserv.nl/?url=')
    }
  }

	}
</script>
<style lang="less" scoped>
	#story{
	      .imgBox{
        display:flex;
        position:relative;
        width:60%;
        margin:1rem auto;
        
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
    .story-actions {
      position: fixed;
      top: 40%;
      right: 6%;
      display: flex;
      min-height: 124px;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .material-icons{
        font-size: 30px;
      }
    }
    }
</style>