let KEY = 'USER'
export default {
  /**
   *  set user info in sessionStorage
   * @param userInfo  Object   user info
   * @return none
   */
  setLoginState: (userInfo) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(userInfo))
  },
  /**
   *  get user info from sessionStorage
   * @return userInfo Object  user Info
   */
  getLoginState: () => {
    return window.sessionStorage.getItem(KEY)
  },
  deleteLoginState: () => {
    return new Promise((resolve, reject) => {
      window.sessionStorage.removeItem(KEY) ? resolve({'isDelete': true}) : reject({'isDelete': false})
    })
  }

}
