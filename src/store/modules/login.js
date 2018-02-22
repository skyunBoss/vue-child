import { USER_SIGNIN,USER_SIGNOUT } from '../types'

const userParse = JSON.parse(localStorage.getItem('user'))
const state = {
  token: userParse ? userParse.token : null,
  user_id: userParse ? userParse.id : null
};

const mutations = {
  [USER_SIGNIN](state, user) {
    localStorage.setItem('user',JSON.stringify(user));
    state.token = user.token
    state.user_id = user.id
  },
  [USER_SIGNOUT](state) {
    localStorage.removeItem('user')
    state.token = null
    state.user_id = null
  }
}

export default {
  state,
  mutations
}
