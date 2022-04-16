<template>
  <div>
    <h2 class="text-center mb-5">Szczegółowe informacje</h2>
    <v-container>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs10 class="mx-auto">
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
                      disabled
                    ></v-select>
                  </v-col>
                  <v-col class="col-6">
                    <v-text-field
                      disabled
                      label="Data wizyty"
                      :value="date"
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-6">
                    <v-text-field
                      disabled
                      label="Czas wizyty"
                      v-model="time"
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-12">
                    <v-textarea
                      disabled
                      rows="1"
                      label="Notaki przed wizyta"
                      :value="preNotes"
                    ></v-textarea>
                  </v-col>
                  <v-col class="col-12">
                    <v-textarea
                      disabled
                      rows="1"
                      label="Notaki po wizycie"
                      :value="postNotes"
                    ></v-textarea>
                  </v-col>
                  <v-col class="col-12">
                    <v-text-field
                      v-model="code"
                      label="Kod recepty"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      items: ["oczekuje", "potwierdzona", "zakończona"],
      patientFirstName: "",
      patientLastName: "",
      doctorFirstName: "",
      doctorLastName: "",
      status: "",
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
      moment.locale("pl");
      this.date = moment(this.date).format("LL");
      if (this.date === "Invalid date") {
        this.date = "";
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
