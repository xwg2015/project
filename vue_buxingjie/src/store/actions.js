import axios from 'axios'

export function GetData ({ commit, state }) {
  axios.get('http://106.14.201.222/data.json')
  .then(function (response) {
    if (response.status === 200) {
      let res = evil('(' + response.data + ')')
      commit('LIST_DATA', res.list_data[0])
      commit('DETAIL_DATA', res.detail_data)
      commit('TIME', res.time)
      sessionStorage.setItem('LIST_DATA', JSON.stringify(res.list_data[0]))
      sessionStorage.setItem('DETAIL_DATA', JSON.stringify(res.detail_data))
      sessionStorage.setItem('TIME', JSON.stringify(res.time))
    } else {
      alert('接口请求失败!')
    }
  })
  .catch(function (response) {
    alert(response)
  })
}

export function GetDetail ({commit, state}, id) {
  let arr = JSON.parse(sessionStorage.getItem('DETAIL_DATA'))
  for (var i = 0; i < arr.length; i++) {
    if (id === arr[i].url) {
      commit('CUR_DETAIL', arr[i])
    }
  }
}

function evil (fn) {
  var Fn = Function
  return new Fn('return ' + fn)()
}
