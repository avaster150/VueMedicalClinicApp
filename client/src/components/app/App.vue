<template>
  <Login v-if="!token" />
  <Content v-else />
</template>

<script>
import { mapState } from "vuex";
import Login from "./Login.vue";
import Content from "./Content.vue";
export default {
  name: "App",
  components: {
    Login,
    Content,
  },
  data() {
    return {
      flag: true,
    };
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
};
</script>