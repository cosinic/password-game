<template>
  <div class="row no-gutters justify-content-center align-items-center">
    <div class="col-12 col-md-5 col-lg-4 col-xxl-3">
      <b-card border-variant="primary" align="center" no-body>
        <template v-slot:header>
          <h1 class="mb-0">{{ $t('ui.title') }}</h1>
        </template>
        <b-card-body class="text-left">
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="showAlert"
            @dismissed="message = ''"
          >
            {{ message }}
          </b-alert>

          <b-input-group size="lg">
            <b-input-group-prepend>
              <b-input-group-text
                ><i class="fal fa-fw fa-user"></i
              ></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              v-model="name"
              :placeholder="$t('ui.placeholders.name')"
              class="text-uppercase"
              trim
              :formatter="formatter"
              @keydown.enter="createGame"
              :max-length="max_name"
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mt-3" size="lg">
            <b-input-group-prepend>
              <b-input-group-text
                ><i class="fal fa-fw fa-key"></i
              ></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              v-model="game"
              :placeholder="$t('ui.placeholders.code')"
              class="text-uppercase"
              trim
              :formatter="formatter"
              @keydown.enter="joinGame"
              :max-length="max_game"
            ></b-form-input>
          </b-input-group>
          <b-row cols="2" class="mt-4">
            <b-col>
              <b-button
                variant="outline-success"
                class="text-uppercase w-100 font-weight-light"
                size="lg"
                @click="createGame"
                >{{$t('ui.buttons.create')}}</b-button
              >
            </b-col>
            <b-col>
              <b-button
                variant="outline-primary"
                class="text-uppercase w-100 font-weight-light"
                size="lg"
                @click="joinGame"
                >{{$t('ui.buttons.join')}}</b-button
              >
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
const CONSTANTS = require("../common/constants");

export default {
  name: "index",
  layout: "default",
  data: () => ({
    name: "",
    message: "",
    game: "",
    max_name: 16,
    max_game: 4,
    id: null
  }),
  computed: {
    ...mapGetters([CONSTANTS.STORE.GETTERS.GET_GAME_CODE]),
    nameRules() {
      if (this.name.length > 2 && this.name.length < 16) {
        return "";
      } else if (this.name.length > 0) {
        return this.$t('ui.errors.two_char_min');
      } else {
        return this.$t('ui.errors.no_name');
      }
    },
    codeRules() {
      if (this.game.length === 4) {
        return "";
      } else {
        return this.$t('ui.errors.no_code');
      }
    },
    showAlert() {
      return this.message.length > 0;
    }
  },
  mounted() {
    const { message } = this.$route.query;
    if (message === "noUser") {
      this.message = this.$t('ui.errors.invalid_session');
    } else if (message === "leftGame") {
      this.message = this.$t('ui.errors.left_game');
    }

    if (this[CONSTANTS.STORE.GETTERS.GET_GAME_CODE]) {
      this.game = this[CONSTANTS.STORE.GETTERS.GET_GAME_CODE];
    }

    this.$socket.$subscribe(CONSTANTS.SOCKET.EMIT.CREATE_GAME, data => {
      console.log("On CREATE Game");
      console.log(data);
      const gameCode = data.game;
      this[CONSTANTS.STORE.ACTIONS.SET_GAME_CODE](gameCode);
      this.$router.push("/game");
    });

    this.$socket.$subscribe(CONSTANTS.SOCKET.EMIT.JOIN_GAME, payload => {
      console.log("On JOIN Game");
      console.log(payload);
    });
  },
  methods: {
    ...mapActions([CONSTANTS.STORE.ACTIONS.SET_GAME_CODE]),
    ...mapMutations(["setUser"]),
    formatter(value, evt) {
      const max = parseInt(evt.target.getAttribute("max-length"));
      return value
        .toUpperCase()
        .substring(0, max)
        .trim();
    },
    validate(joinOrCreate = "create") {
      if (this.nameRules.length) {
        this.message = this.nameRules;
        return false;
      }
      if (joinOrCreate === "join" && this.codeRules.length) {
        this.message = this.codeRules;
        return false;
      }
      this.message = "";
      return true;
    },
    joinGame() {
      if (this.validate("join")) {
        const user = {
          name: this.name,
          game: this.game
        };
        this.$socket.client.emit(CONSTANTS.SOCKET.ON.JOIN_GAME, user);
      }
    },
    createGame() {
      if (this.validate()) {
        const user = {
          name: this.name,
          game: this.game
        };
        this.$socket.client.emit(CONSTANTS.SOCKET.ON.CREATE_GAME, user);
      }
    }
  }
};
</script>
