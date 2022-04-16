<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-img
              class="mx-auto mb-5"
              src="@/assets/logo.png"
              alt="Logo"
              max-height="150"
              max-width="250"
            />
            <v-card class="elevation-12">
              <v-toolbar color="light-blue accent-3" dark flat>
                <v-tabs dark v-model="tab" grow>
                  <v-tab v-for="item in items" :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </v-toolbar>
              <v-card-text>
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <v-form>
                      <v-alert v-if="errorLogin" dense outlined type="error">
                        Błędny adres email lub hasło!
                      </v-alert>
                      <v-text-field
                        label="E-mail"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="email"
                      ></v-text-field>

                      <v-text-field
                        label="Hasło"
                        name="hasło"
                        prepend-icon="lock"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="password"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword"
                      ></v-text-field>
                      <div class="d-flex align-center">
                        <v-checkbox
                          v-model="isDoctor"
                          color="light-blue accent-3"
                          label="Zaloguj jako lekarz"
                        ></v-checkbox>
                        <v-spacer></v-spacer>
                        <v-btn
                          :loading="loadingLogin"
                          dark
                          color="light-blue accent-3"
                          @click="login"
                          >Logowanie</v-btn
                        >
                      </div>
                    </v-form>
                  </v-tab-item>
                  <v-tab-item>
                    <v-form ref="form" v-model="register.valid" lazy-validation>
                      <v-alert v-if="registerDone" dense text type="success">
                        Dziękujemy za rejestrację!
                      </v-alert>
                      <v-alert v-if="errorRegister" dense outlined type="error">
                        Rejestracja nie powiodła się wystąpił błąd!
                      </v-alert>
                      <v-text-field
                        v-model="register.firstName"
                        :rules="register.rules.firstName"
                        label="Imię"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="register.lastName"
                        :rules="register.rules.lastName"
                        label="Nazwisko"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="register.email"
                        :rules="register.rules.email"
                        label="E-mail"
                        required
                      ></v-text-field>
                      <v-text-field
                        type="password"
                        v-model="register.password"
                        :rules="register.rules.password"
                        label="Password"
                        required
                      ></v-text-field>
                      <div class="d-flex align-center">
                        <v-spacer></v-spacer>
                        <v-btn
                          :loading="loadingRegister"
                          dark
                          color="light-blue accent-3"
                          @click="registerUser"
                          >Zarejestruj się</v-btn
                        >
                      </div>
                    </v-form>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
  data() {
    return {
      loadingLogin: false,
      errorLogin: false,
      loadingRegister: false,
      errorRegister: false,
      registerDone: false,
      showPassword: false,
      email: "",
      password: "",
      isDoctor: false,
      tab: null,
      items: ["Logowanie", "Rejestracja"],
      register: {
        valid: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rules: {
          firstName: [(v) => !!v || "Imię jest wymagane"],
          lastName: [(v) => !!v || "Nazwisko jest wymagane"],
          email: [
            (v) => !!v || "Email jest wymagany",
            (v) => emailRegex.test(v) || "Podany email jest błędny",
          ],
          password: [
            (v) => !!v || "Hasło jest wymagane",
            (v) => v.length > 7 || "Minimalna długość hasła to 8 znaków",
          ],
        },
      },
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
        isDoctor: this.isDoctor,
      };
      try {
        this.loadingLogin = true;
        await this.$store.dispatch("auth/login", payload);
        this.loadingLogin = false;
        this.errorLogin = false;
      } catch (error) {
        this.errorLogin = true;
        this.loadingLogin = false;
        console.log(error);
      }
    },
    async registerUser() {
      await this.$refs.form.validate();
      if (!this.register.valid) {
        return;
      }
      const payload = {
        firstName: this.register.firstName,
        lastName: this.register.lastName,
        email: this.register.email,
        password: this.register.password,
      };
      try {
        this.loadingRegister = true;
        await this.$store.dispatch("auth/register", payload);
        this.loadingRegister = false;
        this.registerDone = true;
        this.errorRegister = false;
      } catch (error) {
        this.loadingRegister = false;
        this.registerDone = false;
        this.errorRegister = true;
        console.log(error);
      }
    },
  },
};
</script>