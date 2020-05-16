const CONSTANTS = {
    SOCKET: {
        EMIT: {
            'CREATE_GAME': 'createdGame',
            'JOIN_GAME': 'joinedGame',
            'PING': 'ping'
        },
        ON: {
            'CREATE_GAME': 'onCreateGame',
            'JOIN_GAME': 'onJoinGame'
        }
    },
    STORE: {
        MUTATIONS: {
            'SET_USER': 'setUser',
            'NEW_MESSAGE': 'newMessage',
            'UPDATE_USERS': 'updateUsers',
            'CLEAR_DATA': 'clearData',
            'SET_GAME_CODE': 'setGameCode'
        },
        ACTIONS: {
            'JOIN_GAME': 'joinGame',
            'CREATE_GAME': 'createGame',
            'SET_GAME_CODE': 'setCode'
        },
        GETTERS: {
            'GET_GAME_CODE': 'getGameCode'
        }
    }
}

module.exports = CONSTANTS;