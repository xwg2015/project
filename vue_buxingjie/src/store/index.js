import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list_data: [],
    detaill_data: [],
    time: 0,
    cur_detail: {}
  },
  mutations,
  actions
})
