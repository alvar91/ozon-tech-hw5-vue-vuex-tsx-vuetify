import { Mutation, State, Action } from "vuex-simple";

import chatsService from "@/api/chats-service";

import router from "@/router";

import { ROUTES_TO, FIRST_PAGE } from "@/constants/index";
export class ChatsModule {
  @State()
  chats = [];

  @State()
  currentPage = FIRST_PAGE;

  @Action()
  async createChatAction(data) {
    const createChatsResponse = await chatsService.createChat(data);

    if (createChatsResponse?.status === 200) {
      router.push(`${ROUTES_TO.chats}/${FIRST_PAGE}`);
    }
  }

  @Mutation()
  setCurrentPage(newPage) {
    this.currentPage = newPage;
  }

  @Mutation()
  fetchChats(chats) {
    this.chats = chats;
  }

  @Mutation()
  resetChatsStore() {
    this.chats = [];
    this.currentPage = FIRST_PAGE;
  }

  @Action()
  async fetchChatsAction(pageNumber = FIRST_PAGE) {
    const createChatsResponse = await chatsService.fetchChats(pageNumber - 1);

    if (createChatsResponse?.status === 200) {
      this.fetchChats(createChatsResponse.data);
      this.setCurrentPage(pageNumber);
    }
  }
}
