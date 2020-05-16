<template>
  <div class="wrapper game">
    <nuxt class="content" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
  },
  sockets: {
    updateUsers(users) {
      this.updateUsers(users);
    },
    newMessage(msg) {
      this.newMessage(msg);
    },
    typing(user) {
      this.addTypingUser(user)
    },
    setTypingStatus(user) {
      this.displayTypingStatus(user);
    }
  },
  computed: {
    ...mapState(["user", "users"])
  },
  middleware: "auth",
  methods: {
    ...mapMutations(["updateUsers", "newMessage"]),
    ...mapActions(["socketEmit", "joinGame", "leftGame", "addTypingUser", "displayTypingStatus"]),
    exit() {
      this.leftGame();
      this.$router.push("/?message=leftGame");
    }
  },
  created() {
    this.joinGame(this.user);
  }
}
</script>