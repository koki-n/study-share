<template>
  <div id="profile">
    <Header message="プロフィール"></Header>
    <div class="set-profile">
      <h2>プロフィールを設定する</h2>
      <p><input type="file" @change="confirmImage" v-if="view" /></p>
      <!-- 画像確認 -->
      <p v-if="confirmedImage">
        <img class="img" :src="confirmedImage" />
      </p>

      <p>
        <button @click="uploadImage">プロフィールをアップデート</button>
      </p>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      uid: null,
      file: "",
      data: null,
      username: null,
      goal: null,
      view: true,
      confirmedImage: "",
      profile: {},
      message: "",
    };
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          this.username = user.displayName;
          this.uid = user.uid;
          console.log(this.uid);
        }
      });
    },

    // getImage() {
    //   this.$axios
    //     .request({
    //       method: "get",
    //       url: "http://127.0.0.1:8000/api/user/",
    //       data: { uid: this.uid },
    //     })
    //     .then((response) => {
    //       console.log("resdddddddd");
    //       console.log(response);
    //       // this.images = response.data;
    //     })
    //     .catch((err) => {
    //       this.message = err;
    //     });
    // },

    confirmImage(e) {
      this.message = "";
      this.file = e.target.files[0];
      if (!this.file.type.match("image.*")) {
        this.message = "画像ファイルを選択して下さい";
        this.confirmedImage = "";
        return;
      }
      console.log(this.file);
      this.createImage(this.file);
    },
    createImage(file) {
      console.log("test");
      //   console.log(file);
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.confirmedImage = e.target.result;
      };
      console.log(reader);
    },
    uploadImage() {
      let data = new FormData();
      data.append("file", this.file);
      data.append("uid", this.uid);
      data.append("goal", this.goal);
      data.append("name", this.username);
      console.log("data");
      console.log(data);
      this.$axios
        .post("https://lit-escarpment-24044.herokuapp.com/api/user/", data)
        .then((response) => {
          console.log("fdfd");
          console.log(response);
          this.getImage();
          // this.message = response.data.success;
          this.confirmedImage = "";
          this.file = "";

          // alert("updated");
          //ファイルを選択のクリア
          this.view = false;
          this.$nextTick(function () {
            this.view = true;
          });
        })
        .catch((err) => {
          //   this.message = err.response.data.errors;
          console.log("era");
        });
    },
  },
  created() {
    this.getUserData();
  },
};
</script>
<style scoped>
.set-profile {
  border: 1px solid #e0e0e0;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 4px #cccccc;
  margin-top: 20vh;
}
.img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
</style>