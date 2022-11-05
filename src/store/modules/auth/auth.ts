import { Action } from "vuex-simple";

import userService from "@/api/user-service";

import router from "@/router";
import { ROUTES_TO, FIRST_PAGE } from "@/constants/index";

export class AuthModule {
  @Action()
  async createUser(data) {
    const createUserResponse = await userService.createUser(data);
    if (createUserResponse?.status === 200) {
      localStorage.isAuthenticated = true;
      router.push(`${ROUTES_TO.chats}/${FIRST_PAGE}`);
    }
  }

  @Action()
  async logIn(data) {
    const loginResponse = await userService.logIn(data);
    if (loginResponse?.status === 200) {
      localStorage.isAuthenticated = true;
      router.push(`${ROUTES_TO.chats}/${FIRST_PAGE}`);
    }
  }

  @Action()
  async logOut() {
    const response = await userService.logOut();

    if (response?.status === 200) {
      localStorage.removeItem("isAuthenticated");
      router.push({ name: "SigninView" });
    }
  }

  @Action()
  async logInYandex(data) {
    const response = await userService.logInYandex(data);

    if (response?.status === 200) {
      localStorage.isAuthenticated = true;
      router.push(`${ROUTES_TO.chats}/${FIRST_PAGE}`);
    }
  }
}
