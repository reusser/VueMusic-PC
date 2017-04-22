const STORAGE_MUSIC_KEY = 'music';
const STORAGE_USER_KEY = 'user'

export default {
  getMusic(key = STORAGE_MUSIC_KEY) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  saveMusic(items, key = STORAGE_MUSIC_KEY) {
    window.localStorage.setItem(key, JSON.stringify(items));
  },
  getUser(key = STORAGE_USER_KEY) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  saveUser(items, key = STORAGE_USER_KEY) {
    window.localStorage.setItem(key, JSON.stringify(items));
  }
}