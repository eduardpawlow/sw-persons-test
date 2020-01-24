<template>
      <v-app-bar
      app
      :dark="getTheme"
      >
          <v-toolbar-title flat>
            <router-link tag="span" class="sp-title"  to="/">Star Wars Persons</router-link>
            </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="sp-toolbar">
            <search-input />
          </v-toolbar-items>
      </v-app-bar>
</template>

<script>
import SearchInput from '@/components/SearchInput' 
import { mapGetters } from 'vuex'

export default {
  components: {
    SearchInput
  },
  computed: mapGetters(['getTheme'])
}
</script>

<style scoped>
  .sp-toolbar {
    align-items: center;
  }
  .sp-title{
    cursor: pointer;
  }
</style>
