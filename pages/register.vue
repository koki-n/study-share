<template>
  <div id="register">
    <Header message="新規登録"></Header>
    <div class="register">
      <h2>新規登録</h2>
      <label>名前 <input v-model="username" type="name" required /></label>
      <br />
      <label
        >メールアドレス <input v-model="email" type="email" required
      /></label>
      <br />
      <label
        >パスワード <input v-model="password" type="password" required
      /></label>
      <br />
      <button @click="register">新規登録</button>
      <br />
      <div class="btn">
        <NuxtLink to="/">ログイン</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      email: null,
      password: null,
      username: null,
    };
  },
  methods: {
    async register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            // this.$router.replace('/login')
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
      await firebase
        .auth()
        .currentUser.updateProfile({
          displayName: this.username,
        })
        .then(() => {
          console.log("設定完了");
        })
        .catch((error) => console.log(error));

      alert("アカウントを作成しました");
      // this.$router.replace("/home");
    },
  },
};
</script>
<style scoped>
.register {
  /* margin-top: 10vh; */
  border: 1px solid #e0e0e0;
  background-color: #fefdfd;
  width: 500px;
  margin: 20vh auto;
  height: 400px;
  padding: 20px;
  border-radius: 5px;
}
input {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
}
button {
  /* text-align: center; */
  width: 100%;
  /* border: 1px solid #e0e0e0; */
  background-color: #f6f8a1;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-top: 10px;
}
h2 {
  margin-bottom: 20px;
}
.btn a {
  display: inline-block;
  text-decoration: none;
  color: black;
  width: 100%;
  text-align: center;
  border: 1px solid #e0e0e0;
  margin-top: 40px;
  border-radius: 5px;
}
</style>
