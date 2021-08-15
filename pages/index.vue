<template>
  <div id="login">
    <Header message="ログイン"></Header>
    <div class="login">
      <h2>ログイン</h2>
      <label> メールアドレス </label><br />
      <input v-model="email" type="email" required />
      <br />
      <label> パスワード </label><br />
      <input v-model="password" type="password" required />
      <br />
      <button @click="login">ログイン</button>
      <br />
      <div class="btn">
        <NuxtLink to="/register">新規登録はこちら</NuxtLink>
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
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("ログインが完了しました");
          this.$router.push("/home");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/user-disabled":
              alert("ユーザーが無効になっています。");
              break;
            case "auth/user-not-found":
              alert("ユーザーが存在しません。");
              break;
            case "auth/wrong-password":
              alert("パスワードが間違っております。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
  },
};
</script>
<style scoped>
.login {
  /* margin-top: 10vh; */
  border: 1px solid #e0e0e0;
  background-color: #fefdfd;
  width: 500px;
  margin: 20vh auto;
  height: 350px;
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
/deep/ header nav {
  display: none;
}
</style>