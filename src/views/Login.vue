<template>
  <div id="area-login">
    <br/>
    <h2 class="title is-2">Login </h2>

    <div class="columns is-mobile">
      <div class="column is-half is-offset-one-quarter">

        <hr/>

        <article class="message is-danger" :class="{ active: isActive }" v-if="error != undefined">
          <div class="message-header">
            <p>Error</p><button class="delete" aria-label="delete" @click="fechaAlert()"></button>
          </div>
          <div class="message-body">{{ error }}</div>
        </article>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="usuário" name="email" id="email" v-model="email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" name="password" id="password" v-model="password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <button class="button is-success" @click="logar()">Logar</button>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      isActive: false,
      error: undefined
    }
  },
  methods: {
    logar() {
      this.isActive = false;

      let dados = {
        email: this.email,
        password: this.password
      }

      axios.post('http://192.168.3.15:8686/login', dados).then(res => {
        sessionStorage.setItem("tk", res.data.token);
        this.$router.push({ path: '/admin/users' });

      }).catch(e => {
        this.error = e.response.data.mensagem; 

      });
    },
    fechaAlert() {
      this.isActive = true;
    }
  }
}
</script>

<style scoped>
.active {
  display: none;
}
</style>