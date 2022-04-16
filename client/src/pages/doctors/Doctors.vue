<template>
  <div>
    <h2 class="text-center mb-5">Lekarze</h2>
    <v-layout v-if="doctors && doctors.length" row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="person in doctors" :key="person.name">
        <v-card
          flat
          class="text-xs-center ma-3 d-flex flex-column align-center"
        >
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="person.photo" />
            </v-avatar>
          </v-responsive>
          <v-card-text class="d-flex flex-column align-center">
            <div class="subheading">
              {{ person.firstName }} {{ person.lastName }}
            </div>
            <div class="grey--text">{{ person.specialisation }}</div>
          </v-card-text>
          <v-card-actions>
            <router-link :to="`/doctors/details/${person.id}`"
              >Więcej</router-link
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctors: [],
    };
  },
  mounted() {
    this.loadDoctors();
  },
  methods: {
    async loadDoctors() {
      const { data } = await this.$api.users.loadDoctors();
      this.doctors = data;
    },
  },
};
</script>