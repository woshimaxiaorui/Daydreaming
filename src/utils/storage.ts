
const userStorage = 'loginUserToken';
export default {
  saveUserToken(userToken: string) {
    localStorage.setItem(userStorage,userToken);
  },
  getUserToken() {
    return localStorage.getItem(userStorage);
  },
  removeUserToken() {
    localStorage.removeItem(userStorage);
  }
}
