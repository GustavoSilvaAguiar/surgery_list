<template>
  <v-layout>
    <v-app-bar density="comfortable" app>
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Minha Aplicação</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="!isMobile && rail"
      :temporary="isMobile"
      :permanent="!isMobile"
      @click="!isMobile && (rail = false)"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
        >
          <template #append>
            <v-btn
              v-if="!isMobile"
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
        <v-list-item prepend-icon="mdi-account" title="My Account" value="account" />
        <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="main_wrap">
      <div class="content_wrap"><RouterView /></div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const drawer = ref(true)
const rail = ref(true)

const { smAndDown } = useDisplay()
const isMobile = smAndDown
</script>

<style lang="scss" scoped>
.main_wrap {
  background-color: $primary-color;
  display: flex;
  justify-content: center;
  align-items: center;

  .content_wrap {
    background-color: white;
    padding: 16px;
    width: 95%;
    height: 90%;
    border-radius: 24px;
    overflow: auto;
  }
}
</style>
