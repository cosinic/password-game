const CONSTANTS = require('../common/constants');
const SOCKET_EMIT = 'socketEmit';

export const state = () => ({
  user: {},
  game: {},
  messages: [],
  users: [],
});

export const getters = {
  typingUsers: state => state.users.filter(user => user.status),
  [CONSTANTS.STORE.GETTERS.GET_GAME_CODE]: state => state.game.code
}

export const mutations = {
  [CONSTANTS.STORE.MUTATIONS.SET_USER](state, user) {
    state.user = user;
  },
  [CONSTANTS.STORE.MUTATIONS.NEW_MESSAGE](state, msg) {
    state.messages = [...state.messages, msg];
  },
  [CONSTANTS.STORE.MUTATIONS.UPDATE_USERS](state, users) {
    state.users = users;
  },
  [CONSTANTS.STORE.MUTATIONS.SET_GAME_CODE](state, code) {
    state.game.code = code;
  },
  [CONSTANTS.STORE.MUTATIONS.CLEAR_DATA](state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
}

export const actions = {
  [SOCKET_EMIT]({
    commit
  }, {
    action,
    payload
  }) {
    this._vm.$socket.emit(action, payload, data => {
      // console.log(data);
    })
  },
  createMessage({
    commit,
    dispatch,
    state
  }, msg) {
    const {
      user
    } = state;
    const payload = {
      msg,
      id: user.id
    };

    dispatch(SOCKET_EMIT, {
      action: 'createMessage',
      payload
    });
  },
  [CONSTANTS.STORE.ACTIONS.CREATE_GAME]({
    commit,
    dispatch,
    state
  }) {
    const {
      user
    } = state;

    dispatch(SOCKET_EMIT, {
      action: CONSTANTS.SOCKET.ON.CREATE_GAME,
      payload: user
    });
  },
  [CONSTANTS.STORE.ACTIONS.JOIN_GAME]({
    commit,
    dispatch,
    state
  }) {
    const {
      user
    } = state;

    dispatch(SOCKET_EMIT, {
      action: CONSTANTS.SOCKET.ON.JOIN_GAME,
      payload: user
    });
  },
  [CONSTANTS.STORE.ACTIONS.SET_GAME_CODE]({
    commit,
    dispatch,
    state
  }, code) {
    commit(CONSTANTS.STORE.MUTATIONS.SET_GAME_CODE, code);
  },
  leftGame({
    commit,
    dispatch,
    state
  }) {
    dispatch(SOCKET_EMIT, {
      action: 'leftGame',
      payload: null
    });

    commit('clearData');
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
};
