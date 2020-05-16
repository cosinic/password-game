<template>
  <div class="row no-gutters justify-content-center align-items-center">
    <div class="col-12 col-md-5 col-lg-4 col-xxl-3">
      <b-card border-variant="primary" align="center" no-body>
        <template v-slot:header>
          <h1 class="mb-0">
            Game Room: <span
              class="text-uppercase"
              v-if="gameCode"
              >{{ gameCode }}</span
            >
          </h1>
        </template>
        <b-card-body class="text-left"> </b-card-body>
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
    id: null
  }),
  computed: {
    ...mapGetters([CONSTANTS.STORE.GETTERS.GET_GAME_CODE]),
    showAlert() {
      return this.message.length > 0;
    },
    gameCode() {
        return this[CONSTANTS.STORE.GETTERS.GET_GAME_CODE] || ""
    }
  },
  mounted() {
    const { message } = this.$route.query;
    this.$socket.$subscribe(CONSTANTS.SOCKET.EMIT.CREATE_GAME, payload => {
      console.log("On CREATE Game");
      console.log(payload);
    });
  },
  methods: {
    ...mapMutations(["setUser"]),
    formatter(value, evt) {
      const max = parseInt(evt.target.getAttribute("max-length"));
      return value
        .toUpperCase()
        .substring(0, max)
        .trim();
    }
  }
};
</script>
