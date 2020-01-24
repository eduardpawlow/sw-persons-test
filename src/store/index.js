import Vue from 'vue'
import Vuex from 'vuex'
// import PersonsModule from './modules/Persons'
import GeneralModule from './modules/General'
import PersonsModule from './modules/Persons'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    PersonsModule,
    GeneralModule
  }
})
