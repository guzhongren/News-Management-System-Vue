let KEY = 'USER'
export default {
  /**
   *  set user info in sessionStorage
   * @param userInfo  Object   user info
   * @return none   
   */
  setLoginState: (userInfo)=> {
    window.sessionStorage.setItem(KEY, JSON.stringify(userInfo))
  },
  /**
   *  get user info from sessionStorage
   * @return userInfo Object  user info   
   */
  getLoginState:  ()=>{
    return window.sessionStorage.getItem(KEY)
  }

}
