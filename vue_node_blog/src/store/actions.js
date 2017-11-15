import axios from 'axios'
import Vue from 'vue'

export const GetUserInfo = ({commit, state}) => {
  axios.get(`${state.host}/isLogin`).then(function (res) {
    if (res.data.code === 0) {
      commit('STATE_USERINFO', res.data.userInfo)
    }
  }).catch(function (err) {
    Vue.$Message.error(err)
  })
}
