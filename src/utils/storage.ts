import _ from 'lodash';

const userStorage = 'loginUserToken';
export default {
  saveUserToken(userToken: string) {
    localStorage.setItem(userStorage,userToken);
  },
  getUserToken() {
    const userToken = localStorage.getItem(userStorage);
    return !_.isNull(userToken) ? userToken : '';
  },
  removeUserToken() {
    localStorage.removeItem(userStorage);
  }
}
