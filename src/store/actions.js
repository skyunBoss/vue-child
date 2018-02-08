import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'mint-ui'
import { USER_SIGNIN,USER_SIGNOUT } from './types'

// login
export const UserLogin = ({ commit }, data) => {
  axios.post('/api/myauth/api-token-auth/',data).then(res =>{  //success
    if(res.data){
      commit(USER_SIGNIN, res.data)
      window.location = '/'
    }else{
      window.location = '/login'
    }
  }).catch(error => {  //error
    Toast({
      message: '请检查用户名和密码',
      position: 'bottom',
      className: 'toast'
    })
  })
}

// loginOut TODO
export const UserLogout = ({ commit }, data) => {

}

