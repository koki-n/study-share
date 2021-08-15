<template>
  <p>{{ this.$route.params.id }}</p>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      uid: null,
    };
  },
  methods: {
    async getData() {
      const sendData = {
        uid: this.$route.params.id,
      };
      console.log(sendData);
      const test = await this.$axios.get(
        "https://lit-escarpment-24044.herokuapp.com/api/search",
        {
          params: {
            uid: this.$route.params.id,
            test: 1,
          },
        }
      );
      console.log(test);
    },
  },
  created() {
    this.getData();
  },
};
</script>