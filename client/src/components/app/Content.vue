<template>
  <v-app>
    <Navbar />
    <v-main class="mx-4 mb-4">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/pages/Navbar";
export default {
  components: { Navbar },
};
</script>