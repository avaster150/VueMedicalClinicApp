<template>
  <nav>
    <v-app-bar color="light-blue accent-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="font-weight-light">Przychodnia </span>
        <span>Online</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn tile color="grey darken-3" @click="logout">
        <v-icon left> mdi-logout </v-icon>
        Wyloguj
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-img src="@/assets/logo.png" contain />
          <p class="subheading text-center mt-1">Witaj {{ firstName }}!</p>
        </v-flex>
      </v-layout>

      <v-list v-if="spec === undefined || spec === 'undefined'" nav dense>
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list v-else nav dense>
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item
            v-for="link in doctorLinks"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: false,
    group: null,
    links: [
      { icon: "mdi-information-outline", text: "O nas", route: "/about" },
      {
        icon: "mdi-doctor",
        text: "Lekarze",
        route: "/doctors",
      },
      { icon: "mdi-calendar", text: "Wizyty", route: "/users/appointments" },
      { icon: "mdi-frequently-asked-questions", text: "FAQ", route: "/faq" },
      { icon: "mdi-phone", text: "Kontakt", route: "/contact" },
    ],
    doctorLinks: [
      {
        icon: "mdi-calendar",
        text: "Wizyty",
        route: "/doctors/appointments/list",
      },
    ],
  }),

  computed: {
    ...mapState("auth", ["firstName", "spec"]),
  },
  methods: {
    logout() {
      this.$router.push({ name: "start" });
      this.$store.dispatch("auth/logout");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>