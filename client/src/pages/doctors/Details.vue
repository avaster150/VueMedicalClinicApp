<template>
  <div>
    <h2 class="text-center mb-5">Szczegółowe informacje</h2>
    <v-container>
      <v-flex>
        <v-layout v-if="doctor && Object.keys(doctor).length" row wrap>
          <v-flex xs10 class="mx-auto">
            <v-alert v-if="appoitmentDone" dense outlined type="success">
              Dziękujemy! Sprawdzaj zakładkę wizyty! Twój lekarz ustali wizytę w
              ciągu 24h!
            </v-alert>
            <v-alert v-if="error" dense outlined type="error">
              Nie udało się zapisać na wizytę!
            </v-alert>
            <v-card color="white" class="elevation-5 pa-5">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="title">
                        <b>{{ doctor.firstName }} {{ doctor.lastName }}</b>
                      </div>
                      <br />
                      <div>
                        {{ doctor.description }}
                      </div>
                      <br />
                      <div>
                        <b>Specjalizacja: </b>{{ doctor.specialisation }}
                      </div>
                      <div><b>Koszt wizyty: </b>{{ doctor.cost }} zł</div>
                    </div>
                  </v-flex>
                  <v-flex xs5 class="d-flex justify-end">
                    <v-avatar size="200" class="grey lighten-2">
                      <img :src="doctor.photo" />
                    </v-avatar>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loadingDetails"
                  @click="makeAppointment"
                  dark
                  color="light-blue accent-3"
                  >Zapisz się na wizytę</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loadingDetails: false,
      doctor: "",
      appoitmentDone: false,
    };
  },
  mounted() {
    this.error = false;
    this.appoitmentDone = false;
    this.loadDoctorDetails();
  },
  computed: {
    ...mapState("auth", ["id", "firstName", "lastName"]),
  },
  methods: {
    async loadDoctorDetails() {
      const { id } = this.$route.params;
      const { data } = await this.$api.users.loadDoctorDetails(id);
      this.doctor = data[0];
    },
    async makeAppointment() {
      const payload = {
        userId: this.id,
        doctorId: this.$route.params.id,
        userFirstName: this.firstName,
        userLastName: this.lastName,
        doctorFistName: this.doctor.firstName,
        doctorLastName: this.doctor.lastName,
        cost: this.doctor.cost,
        status: "oczekuje",
      };
      try {
        this.loadingDetails = true;
        await this.$api.appointments.makeAppointment(payload);
        this.appoitmentDone = true;
        this.loadingDetails = false;
        this.error = false;
      } catch (error) {
        this.error = true;
        this.appoitmentDone = false;
        this.loadingDetails = false;
        console.log(error);
      }
    },
  },
};
</script>