<template>
  <div id="all">
    <Header message="全ての投稿"></Header>
    <div>
      <div class="content">
        <div class="search">
          <h3>検索</h3>
          <!-- <div class="flex"> -->
          <label>投稿者 </label>
          <input type="text" v-model="searchName" />
          <label>タイトル </label>
          <input type="text" v-model="searchTitle" />
          <label>内容 </label>
          <input type="text" v-model="searchContent" />
          <!-- </div> -->
          <button @click="search">検索</button>
        </div>
        <div class="allpost">
          <div class="post" v-for="post in posts" :key="post.id">
            <div class="user">
              <div class="user-flex">
                <img
                  v-if="post.path == null"
                  class="postuser"
                  src="@/assets/img/noimage.jpg"
                />
                <img
                  v-else
                  class="postuser"
                  :src="'http://127.0.0.1:8000/' + `${post.path}`"
                />

                <p>{{ post.username }}</p>
              </div>
              <p>{{ post.created_at.substring(0, 10) }}</p>
            </div>
            <div class="post-content">
              <!-- <p>title</p> -->
              <h3>{{ post.title }}</h3>
              <p v-if="post.content.length < 50">{{ post.content }}</p>
              <p v-else>{{ post.content.substring(0, 50) + ".." }}</p>
            </div>
            <div
              @click="
                $router.push({
                  path: '/comment/' + post.id,
                  params: { id: uid },
                })
              "
              class="comment-btn"
            >
              コメントする
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      username: null,
      useremail: null,
      posts: [],
      title: null,
      content: null,
      uid: null,
      searchName: "",
      searchTitle: "",
      searchContent: "",
      profile: {},
    };
  },
  methods: {
    //   createdの処理
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          this.username = user.displayName;
          this.uid = user.uid;
        }
      });
    },
    async getPostData() {
      const test = await this.$axios.get(
        "https://lit-escarpment-24044.herokuapp.com/api/post/"
      );
      console.log(test);
      this.posts = test.data.data;
    },
    // 検索機能
    async search() {
      const sendData = {
        title: this.searchTitle,
        content: this.searchContent,
        username: this.searchName,
      };
      console.log(sendData);
      const test = await this.$axios.post(
        "https://lit-escarpment-24044.herokuapp.com/api/search/",
        sendData
      );
      console.log(test);
      this.posts = test.data.data;
    },
    // async getUserProfile() {
    //   const test = await this.$axios.get("http://127.0.0.1:8000/api/user/");
    //   console.log(test);
    //   console.log(this.posts);
    //   let a = "uid";
    //   if (a in this.posts) {
    //     console.lo("aru");
    //   }
    //   // console.log(getHashProperties(this.posts).includes("nishida"));
    // },
    // image(){

    // }
  },
  computed: {},

  created() {
    this.getUserData();
    this.getPostData();
    // this.getUserProfile();
  },
};
</script>
<style scoped>
/* 共通 */
* {
  margin: 0;
  padding: 0;
}
input {
  border: 1px solid #e0e0e0;
  background-color: #fefdfd;
}
.flex {
  display: flex;
}
img {
  border-radius: 50%;
}
/* 全体 */
.container {
  display: flex;
}
/* サイドバー */
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #e0e0e0;
  width: 150px;
  height: 100vh;
  padding-top: 10vh;
  position: fixed;
  top: 0;
}
/* 検索窓 */
.search {
  display: flex;
  flex-direction: column;
  margin: 20px 50px;
  width: 30%;
  height: 300px;
  padding: 10px;
  box-shadow: 0 0 4px #cccccc;
  position: fixed;
  left: 0;
}
label {
  margin-top: 10px;
}
button {
  /* margin-top: 20px; */
  background-color: #99ceff;
  width: 100px;
  margin: 30px auto 0 auto;
  border-radius: 50px;
  box-shadow: 2px 2px gray;
  text-align: center;
}
button:active {
  box-shadow: none;
  position: relative;
  bottom: -2px;
  right: -2px;
}
.content {
  box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 10vh;
  display: flex;
  justify-content: space-around;
}
/* 投稿 */
.allpost {
  width: 60%;
  position: absolute;
  right: 10px;
}
.post {
  height: 300px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px #cccccc;
  padding: 10px;
  border: 1px solid #e0e0e0;
}
.user {
  text-align: center;
  /* min-width: 100px; */
  display: flex;
  justify-content: space-between;
}
.user-flex {
  display: flex;
}
.postuser {
  width: 75px;
  height: 75px;
  object-fit: cover;
}
.post-content {
  /* padding-left: 30px; */
  min-width: 250px;
}
.post-content h3 {
  border: 1px solid #e0e0e0;
  background-color: #fefdfd;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.post-content p {
  border: 1px solid #e0e0e0;
  background-color: #fefdfd;

  height: 100px;
}
.comment-btn {
  display: inline-block;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  box-shadow: 2px 2px gray;
  text-align: center;
  padding: 3px 10px;
}
</style>
