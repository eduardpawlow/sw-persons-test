<template>
  <v-footer
      app 
      :dark="getTheme"
    >
      <v-row
        justify="space-between"
        
      >
        <v-col
          sm="1"
          lg="1"
          md="1"
          class="text-left"
        >
            <v-btn
                text
                width="115px"
                :class="getTextSideBtn + '-btn'"
                @click="toggleTheme"
                @mouseleave="toggleTextSideBtn"
                @mouseenter="toggleTextSideBtn"
            >
            {{ getTextSideBtn }}
            </v-btn>

        </v-col>
        <v-col
          sm="2"
          lg="2"
          md="2"
          class="text-right"
        >
        <span>All rigth reserved</span>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters(['getTheme', 'getTextSideBtn']),
        ThemeTextBtn(){
            return (this.getTheme ? 'Darkside ': 'Lightside' )
        }
    },
    methods: {
        ...mapMutations(['toggleTheme','toggleTextSideBtn']),
    }
}
</script>

<style>
    .darkside-btn{
        color: rgb(143, 32, 32) !important;
    }
    .lightside-btn{
        color: rgba(52, 139, 209, 0.9) !important;
    }
</style>