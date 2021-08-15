<template>
  <div id="home">
    <div class="home">
      <Header message="投稿する"></Header>
      <h2>ようこそ{{ this.username }}さん</h2>
      <div class="new">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="ProviderProps" rules="required">
            <label for="title">title</label>
            <input type="text" v-model="title" id="title" />
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
          <validation-provider v-slot="ProviderProps" rules="required">
            <label for="textarea">内容</label>

            <textarea
              name="content"
              id="textarea"
              cols="30"
              rows="10"
              v-model="content"
            ></textarea
            ><br />
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>

          <button
            type="button"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
            @click="addPost"
          >
            投稿
          </button>
        </validation-observer>
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
      post: [],
      title: null,
      content: null,
      uid: null,
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
      const senddata = {
        uid: this.uid,
      };
      const test = await this.$axios.get(
        "https://lit-escarpment-24044.herokuapp.com/api/post/",
        senddata
      );
      console.log(test);
      this.post = test.data.data;
    },
    async saveUserData() {
      const senddata = {
        uid: this.uid,
        name: this.username,
      };
      const test = await this.$axios.get(
        "https://lit-escarpment-24044.herokuapp.com/api/user/",
        {
          params: {
            uid: this.$route.params.id,
            name: this.name,
          },
        }
      );
      console.log(test);
      console.log("test");
    },

    async addPost() {
      const senddata = {
        title: this.title,
        content: this.content,
        username: this.username,
        uid: this.uid,
      };
      const test = await this.$axios.post(
        "https://lit-escarpment-24044.herokuapp.com/api/post/",
        senddata
      );
      console.log(test);
      this.title = null;
      this.content = null;
      alert("投稿しました");
    },
  },
  created() {
    this.getUserData();
    this.getPostData();
    this.saveUserData();
  },
};
</script>
<style scoped>
.home {
  margin-top: 10vh;
}
h2 {
  text-align: center;
  padding: 20px;
}
input,
textarea {
  border: 1px solid #e0e0e0;
  background-color: #fefdfd;
}
textarea {
  width: 100%;
}
.new {
  /* border: 1px solid grey; */
  border: 1px solid #e0e0e0;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 4px #cccccc;
}
</style>
