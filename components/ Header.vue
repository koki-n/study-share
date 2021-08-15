<template>
  <header class="flex space">
    <div class="flex">
      <img class="logo" src="~/assets/img/logo.png" alt="" />
      <h1>{{ message }}</h1>
    </div>
    <nav>
      <ul class="flex">
        <li>
          <NuxtLink to="/allpost">全ての投稿へ</NuxtLink>
        </li>
        <li>
          <div
            @click="
              $router.push({
                path: '/profile/' + uid,
                params: { id: uid },
              })
            "
          >
            プロフィールへ
          </div>
        </li>
        <li>
          <NuxtLink to="/home">投稿する</NuxtLink>
        </li>
        <li>
          <div @click="logout">ログアウト</div>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import firebase from "~/plugins/firebase";

export default {
  props: ["message"], //受け取り
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトが完了しました");
          this.$router.replace("/");
        });
    },
  },
};
</script>
<style scoped>
header {
  height: 10vh;
  width: 100%;
  background-color: #b2ebf9;
  z-index: 999;
  position: fixed;
  align-items: center;
  top: 0;
}
a {
  color: black;
  text-decoration: none;
}

header h1 {
  color: white;
}
.logo {
  height: 10vh;
  width: 150px;
  object-fit: cover;
}
.flex {
  display: flex;
  align-items: center;
}
li {
  list-style: none;
  text-decoration: none;
  margin-right: 10px;
}
.space {
  justify-content: space-between;
}
</style>