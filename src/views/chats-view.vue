<script lang="tsx">
import { VNode } from "vue";
import { Vue, Component } from "vue-property-decorator";

import { useModule } from "vuex-simple";
import { ChatsModule } from "@/store/modules/chats/chats";
import { AuthModule } from "@/store/modules/auth/auth";

import Chats from "@/components/chats.vue";

import { VSheet, VList, VBtn, VIcon } from "vuetify/lib";

import { ROUTES_TO, FIRST_PAGE } from "@/constants";

import { Chat } from "@/types/chats";

@Component({
  name: "ChatsView",
})
export default class ChatsView extends Vue {
  chatsStore = useModule<ChatsModule>(this.$store, ["chats"]);
  authStore = useModule<AuthModule>(this.$store, ["auth"]);

  get currentPage(): number {
    const pageNumber = Number(this.$route.params.pageNumber);
    if (isNaN(pageNumber) || pageNumber < FIRST_PAGE) return FIRST_PAGE;

    return pageNumber;
  }

  get chats(): Chat[] {
    return this.chatsStore?.chats as Chat[];
  }

  created(): void {
    this.chatsStore?.fetchChatsAction(this.currentPage);
  }

  async logout() {
    await this.authStore?.logOut();
    this.chatsStore?.resetChatsStore();
  }

  prevPage() {
    if (this.currentPage > FIRST_PAGE) {
      return `${this.currentPage - 1}`;
    }

    return `${this.currentPage}`;
  }

  nextPage() {
    if (this.chats?.length > 0) {
      return `${this.currentPage + 1}`;
    }

    return `${this.currentPage}`;
  }

  render(): VNode {
    const { currentPage, chats, prevPage, nextPage } = this;

    return (
      <VSheet class="grey lighten-3">
        <div class="mx-auto text-center text-h4 pa-6 primary white--text">
          Ozon Messages
        </div>

        <nav class="ma-10 text-center text-h4 d-flex justify-space-between">
          <router-link to={ROUTES_TO.createChat} class="text-decoration-none">
            <VBtn color="primary">Создать новый чат</VBtn>
          </router-link>

          <VBtn color="error" on={{ click: () => this.logout() }}>
            Выйти
          </VBtn>
        </nav>

        <div class="ma-10 pa-6 white rounded-xl">
          <div class="mb-4">
            <router-link
              to={prevPage()}
              class="white--text text-decoration-none"
            >
              <VBtn disabled={currentPage <= FIRST_PAGE} class="primary mr-4">
                <VIcon>mdi-arrow-left-bold</VIcon>
              </VBtn>
            </router-link>

            <router-link
              to={nextPage()}
              class="white--text text-decoration-none"
            >
              <VBtn disabled={chats?.length === 0} class="primary">
                <VIcon>mdi-arrow-right-bold</VIcon>
              </VBtn>
            </router-link>
          </div>

          <h3>Страница {this.currentPage}</h3>
          <VList three-line>
            <Chats />
          </VList>
        </div>
      </VSheet>
    );
  }
}
</script>
