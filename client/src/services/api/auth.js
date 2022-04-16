import http from "@/services/http";

export default {
  loginAsUser(payload) {
    return http.post("/auth/user-login", payload);
  },
  loginAsDoctor(payload) {
    return http.post("/auth/user-doctor", payload);
  },
  register(payload) {
    return http.post("/auth/register", payload);
  },
};
