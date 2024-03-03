<template>
  <div>
    <br/>
    <h2 class="title is-2">Registro de usuário !</h2>

    <div class="columns is-mobile">
      <div class="column is-half is-offset-one-quarter">

        <hr/>

        <article class="message is-danger" :class="{ active: isActive }" v-if="error != undefined">
          <div class="message-header">
            <p>Error</p><button class="delete" aria-label="delete" @click="fechaAlert()"></button>
          </div>
          <div class="message-body">{{ error }}</div>
        </article>

        <article class="message is-success" v-if="sucess != undefined">
          <div class="message-header">
            <p>Sucesso</p><button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">{{ sucess }}</div>
        </article>

        <section>
          <div class="field">
            <label class="label">Nome:</label>
            <div class="control">
              <input type="text" class="input" name="name" id="name" placeholder="Nome do usuário" v-model="name">
            </div>
          </div>

          <div class="field">
            <label class="label">E-mail:</label>
            <div class="control">
              <input type="email" class="input" name="email" id="email" placeholder="E-mail do usuário" v-model="email">
            </div>
          </div>

          <div class="field">
            <label class="label">Senha:</label>
            <div class="control">
              <input type="password" class="input" name="password" id="password" placeholder="*********" v-model="password">
            </div>
          </div>

          <hr/>
          <div class="buttons has-addons is-right">
            <button class="button is-success" @click="register()">Cadastrar</button>
          </div>
        </section>
 
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      password: "",
      email: "",
      error: undefined,
      sucess: undefined,
      isActive: false,
    }
  },
  methods: {
    register() {
      this.isActive = false;

      let dados = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      axios.post("http://192.168.3.15:8686/user", dados).then(res => {
        this.sucess = res.data.mensagem;

        // fazer o redirecionamento
        //this.$router.push({name: "Home"});

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