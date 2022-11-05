import Api from "./Api";

export default {
  async createUser(data) {
    return await Api().post(`/auth/signup/`, data);
  },

  async logIn(data) {
    return await Api().post(`/auth/signin/`, data);
  },

  async logOut() {
    return await Api().post(`/auth/logout/`);
  },

  async logInYandex(data) {
    return await Api().post(`/oauth/yandex`, data);
  },
};
