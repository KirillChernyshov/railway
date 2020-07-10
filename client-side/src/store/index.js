import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'
import compositions from './modules/compositions.js'
import trains from './modules/trains.js'
import carriages from './modules/carriages.js'
import stations from './modules/stations.js'
import routes from './modules/routes.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
      login({ state }) {
          console.log(state);
      }
  },
  modules: {
      user,
      compositions,
      carriages,
      trains,
      stations,
      routes,
  }
});
