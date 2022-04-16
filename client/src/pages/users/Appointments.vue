<template>
  <div v-if="appointments && appointments.length">
    <v-card flat v-for="appointment in appointments" :key="appointment.id">
      <v-layout wrap :class="`pa-5 appointment ${appointment.status}`">
        <v-flex xs12 sm2 md3>
          <div class="caption grey--text">Wizyta dla:</div>
          <div>
            {{ appointment.userFirstName }} {{ appointment.userLastName }}
          </div>
        </v-flex>
        <v-flex xs12 sm3 md3>
          <div class="caption grey--text">Lekarz</div>
          <div>
            {{ appointment.doctorFirstName }} {{ appointment.doctorLastName }}
          </div>
        </v-flex>
        <v-flex xs12 sm5 md3>
          <div class="caption grey--text">Data</div>
          <div>
            {{ appointment.dateStart }} -
            {{ appointment.timeStart }}
          </div>
        </v-flex>
        <v-flex xs5 sm2 md2>
          <div class="caption grey--text">Status</div>
          <div class="right">
            <v-chip dark small :color="handleColors(appointment.status)">{{
              appointment.status
            }}</v-chip>
          </div>
        </v-flex>
        <v-flex xs4 sm2 md1 align-self-end>
          <router-link :to="`/users/appointments/details/${appointment.id}`"
            >Więcej</router-link
          >
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      appointments: [],
    };
  },
  mounted() {
    this.loadAppointments();
  },
  computed: {
    ...mapState("auth", ["id"]),
  },
  methods: {
    async loadAppointments() {
      const { data } = await this.$api.appointments.loadAppointments(this.id);
      this.appointments = data;
      moment.locale("pl");
      for (let i = 0; i < this.appointments.length; i++) {
        this.appointments[i].dateStart = moment(
          this.appointments[i].dateStart
        ).format("LL");
        if (this.appointments[i].dateStart === "Invalid date") {
          this.appointments[i].dateStart = "";
        }
      }
    },
    handleColors(status) {
      switch (status) {
        case "oczekuje":
          return "#0011ff";
        case "potwierdzona":
          return "#02a10f";
        case "zakończona":
          return "#414141";
      }
    },
  },
};
</script>
<style>
.appointment.oczekuje {
  border-left: 4px solid #0011ff;
}
.appointment.potwierdzona {
  border-left: 4px solid #02a10f;
}
.appointment.zakończona {
  border-left: 4px solid #414141;
}
</style>
