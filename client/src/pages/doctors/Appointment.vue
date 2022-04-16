<template>
  <div>
    <h2 class="text-center mb-5">Szczegółowe informacje</h2>
    <v-container>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs8 class="mx-auto">
            <v-card color="white" class="elevation-5 pa-5">
              <v-container fluid>
                <v-row>
                  <v-col class="col-12">
                    <v-text-field
                      v-model="patientFullName"
                      label="Pacjent"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-12">
                    <v-text-field
                      v-model="doctorFullName"
                      label="Lekarz"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-12">
                    <v-select
                      v-model="status"
                      :items="items"
                      label="Filled style"
                    ></v-select>
                  </v-col>
                  <v-col class="col-6">
                    <v-date-picker
                      locale="pl-PL"
                      v-model="date"
                    ></v-date-picker>
                  </v-col>
                  <v-col class="col-6">
                    <v-time-picker v-model="time"></v-time-picker>
                  </v-col>
                  <v-col class="col-12">
                    <v-textarea
                      label="Notaki przed wizyta"
                      rows="2"
                      v-model="preNotes"
                    ></v-textarea>
                  </v-col>
                  <v-col class="col-12">
                    <v-textarea
                      label="Notaki po wizycie"
                      rows="2"
                      v-model="postNotes"
                    ></v-textarea>
                  </v-col>
                  <v-col class="col-12">
                    <v-text-field
                      v-model="code"
                      label="Kod recepty"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  @click="updateAppointment"
                  dark
                  color="light-blue accent-3"
                  >Zapisz</v-btn
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
export default {
  data() {
    return {
      items: ["oczekuje", "potwierdzona", "zakończona"],
      patientFirstName: "",
      patientLastName: "",
      doctorFirstName: "",
      doctorLastName: "",
      status: "potwierdzona",
      date: "",
      time: "",
      preNotes: "",
      postNotes: "",
      code: "",
    };
  },
  mounted() {
    this.loadAppointmentDetails();
  },
  methods: {
    async loadAppointmentDetails() {
      const payload = {
        appointmentId: this.$route.params.id,
      };
      const { data } = await this.$api.appointments.loadAppointmentDetails(
        payload
      );
      this.patientFirstName = data[0].userFirstName;
      this.patientLastName = data[0].userLastName;
      this.doctorFirstName = data[0].doctorFirstName;
      this.doctorLastName = data[0].doctorLastName;
      this.status = data[0].status;
      this.date = data[0].dateStart;
      this.time = data[0].timeStart;
      this.preNotes = data[0].preNotes;
      this.postNotes = data[0].postNotes;
      this.code = data[0].code;
    },
    async updateAppointment() {
      const payload = {
        appointmentId: this.$route.params.id,
        status: this.status,
        dateStart: this.date,
        timeStart: this.time,
        preNotes: this.preNotes,
        postNotes: this.postNotes,
        code: this.code,
      };
      try {
        this.loading = true;
        await this.$api.appointments.updateAppointment(payload);
        this.loading = false;
        this.$router.push({ name: "appointments-list" });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
  computed: {
    patientFullName() {
      return `${this.patientFirstName} ${this.patientLastName}`;
    },
    doctorFullName() {
      return `${this.doctorFirstName} ${this.doctorLastName}`;
    },
  },
};
</script>
