<template>
  <v-app>

    <nav-bar />

    <v-content :class="getTheme ? 'sp-content-dark': 'sp-content-light'">
      <v-container :class="getTheme ? 'sp-container-dark': 'sp-container-light'">
      <router-view></router-view>
      </v-container>
    </v-content>

  
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    NavBar,
    Footer
  },
  computed: {
    ...mapGetters(['getTheme']),
    kk(){
      return this.$vuetify.breakpoint.height
    }
  }
};
</script>

<style>
  .sp-content-dark{
    background-color: rgb(36, 39, 39, 0.9);
  }

  .sp-container-dark {
    /* background-color: white; */
    border-left: 2px solid rgb(95, 95, 95);
    border-right: 2px solid rgb(95, 95, 95);
    height: 100%;
    color: white;
  }

  .sp-content-light{
    background-color: rgba(88, 176, 248, 0.603);
  }

  .sp-container-light {
    border-left: 2px solid rgb(246, 241, 241);
    border-right: 2px solid rgb(246, 241, 241);
    height: 100%;
  }

  .hr-darkside{
        border:1px solid rgb(95, 95, 95);
  }
  .hr-lightside{
        border: 1px solid rgb(246, 246, 241);
  }

  .darkside{
        color: #d82929;
    }

  .lightside{
      color: #428e12;
  }
</style>>
