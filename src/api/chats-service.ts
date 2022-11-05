import Api from "./Api";

const step = 10;

export default {
  async fetchChats(pageNumber) {
    return await Api().get(
      `/chats?offset=${step * pageNumber}&limit=${step}&title=`
    );
  },

  async createChat(data) {
    return await Api().post(`/chats/`, data);
  },
};
