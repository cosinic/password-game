import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

export default ({
  store,
  isDev
}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'pwd_game',
      paths: [
        'user',
        'game'
      ],
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, {
            expires: 3,
            secure: !isDev
          }),
        removeItem: (key) => Cookies.remove(key),
      },
    })(store)
  })
}
