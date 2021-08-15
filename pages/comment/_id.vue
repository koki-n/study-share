<template>
  <div id="comment">
    <Header message="投稿"></Header>
    <p>{{ this.$route.params.id }}</p>

    <div class="post">
      <div class="user">
        <div class="user-flex">
          <img
            v-if="posts.path == null"
            class="postuser"
            src="@/assets/img/noimage.jpg"
          />

          <img
            v-else
            class="postuser"
            :src="'http://127.0.0.1:8000/' + `${posts.path}`"
          />
          <p>{{ this.posts.username }}</p>
        </div>
      </div>
      <div class="post-content">
        <h3>{{ this.posts.title }}</h3>
        <p>{{ this.posts.content }}</p>
      </div>
    </div>

    <div class="commentlist">
      <h3 class="comment-ttl">コメント</h3>
      <div class="comment-child" v-for="item in commentdata" :key="item.id">
        <div class="user">
          <div class="user-flex">
            <img
              v-if="item.path == 'none'"
              class="postuser"
              src="@/assets/img/noimage.jpg"
            />

            <img
              v-else
              class="postuser"
              :src="'http://127.0.0.1:8000/' + `${item.path}`"
            />

            <p>{{ item.username }}</p>
          </div>
        </div>

        <p>{{ item.comment }}</p>
      </div>
    </div>
    <div class="comment">
      <div class="user">
        <div class="user-flex">
          <img class="postuser" src="@/assets/img/cat.jpg" />
          <p>{{ this.username }}</p>
        </div>
      </div>

      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="ProviderProps" rules="required">
          <textarea
            v-model="comment"
            name="comment"
            id=""
            cols="20"
            rows="5"
          ></textarea>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <div class="commentbtn">
          <button
            @click="addComment"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
          >
            コメントする
          </button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      comment: null,
      commentdata: [],
      posts: [],
      username: null,
      uid: null,
    };
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          this.username = user.displayName;
          this.uid = user.uid;
        }
      });
    },
    async commentUser() {
      const id = 2;
      const test = await this.$axios.get(
        "https://lit-escarpment-24044.herokuapp.com/api/user/" + id
      );
      console.log(test);
      console.log("dff");
    },

    async getPostData() {
      const id = this.$route.params.id - 1;
      const test = await this.$axios.get(
        "https://lit-escarpment-24044.herokuapp.com/api/comment/"
      );
      console.log(test);
      this.posts = test.data.data[id];
      this.commentdata = test.data.data[id].comment;
    },

    async addComment() {
      const senddata = {
        comment: this.comment,
        post_id: this.$route.params.id,
        username: this.username,
        uid: this.uid,
      };
      const test = await this.$axios.post(
        "https://lit-escarpment-24044.herokuapp.com/api/comment/",
        senddata
      );
      console.log(test);
      this.comment = "";
      this.getPostData();
    },
    getImage() {
      console.log(this.uid);
      this.$axios
        .request({
          method: "get",
          url: "https://lit-escarpment-24044.herokuapp.com/api/user/",
          data: { uid: this.uid },
        })
        .then((response) => {
          console.log("resdddddddd");
          console.log(response);
        })
        .catch((err) => {
          this.message = err;
        });
    },
  },
  created() {
    this.getPostData();
    this.getUserData();
    this.commentUser();
    this.getImage();
  },
};
</script>
<style scoped>
.flex {
  display: flex;
}
img {
  border-radius: 50%;
}
/* コメントの投稿 */
.comment {
  width: 60%;
  margin: 0 auto;
  box-shadow: 0 0 4px #cccccc;
  padding: 10px;
  border: 1px solid #e0e0e0;
}
textarea {
  border: 1px solid #e0e0e0;
  width: 100%;
}
.commentbtn {
  background-color: #99ceff;
  width: 150px;
  border-radius: 50px;
  box-shadow: 2px 2px gray;
  text-align: center;
  margin-left: auto;
}
.post {
  /* height: 300px; */
  width: 60%;
  margin: 0 auto;
  box-shadow: 0 0 4px #cccccc;
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin-top: 10vh;
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

  /* height: 100px; */
}
.commentlist {
  width: 60%;
  margin: 0 auto;
  box-shadow: 0 0 4px #cccccc;
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin-top: 30px;
}
.comment-child {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
}
.commentlist :not(:first-child) {
  margin-top: 10px;
}
</style>