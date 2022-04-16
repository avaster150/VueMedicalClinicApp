import api from "../../services/api";

export default {
  namespaced: true,
  state: {
    id: localStorage.getItem("id"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
    spec: localStorage.getItem("spec"),
  },

  mutations: {
    loginUser(state, data) {
      state.id = data.id;
      state.firstName = data.firstName;
      state.lastName = data.lastName;
      state.email = data.email;
      state.token = data.token;
      state.spec = data.specialisation;
      localStorage.setItem("id", data.id);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("spec", data.specialisation);
    },
    logout(state) {
      state.id = "";
      state.spec = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("id");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("spec");
    },
  },

  actions: {
    async login({ commit }, payload) {
      let data;
      if (!payload.isDoctor) {
        data = await api.auth.loginAsUser(payload);
      } else {
        data = await api.auth.loginAsDoctor(payload);
      }
      commit("loginUser", data.data);
    },

    async register({ commit }, payload) {
      const { data } = await api.auth.register(payload);
      commit("loginUser", data);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
};
