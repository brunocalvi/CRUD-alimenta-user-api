<template>
  <div>
    <br/>
    <h2 class="title is-2">Edição de usuário !</h2>

    <div class="columns is-mobile">
      <div class="column is-half is-offset-one-quarter">

        <div class="buttons has-addons is-right">
          <router-link :to="{name: 'Users'}"><button class="button is-link">Voltar</button></router-link>
        </div>

        <hr/>

        <article class="message is-danger" :class="{ active: isActive }" v-if="error != undefined">
          <div class="message-header">
            <p>Error</p><button class="delete" aria-label="delete" @click="fechaAlert()"></button>
          </div>
          <div class="message-body">{{ error }}</div>
        </article>

        <article class="message is-success" :class="{ active: isActive }" v-if="sucess != undefined">
          <div class="message-header">
            <p>Sucesso</p><button class="delete" aria-label="delete" @click="fechaAlert()"></button>
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

          <hr/>
          <div class="buttons has-addons is-right">
            <button class="button is-success" @click="update()">Editar</button>
          </div>
        </section>
 
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`
      }
    }

    axios.get(`http://localhost:8686/user/${this.$route.params.id}`, config).then(res => {
      console.log(res);

      this.name = res.data.name;
      this.email = res.data.email;
      this.id = res.data.id;
      
    }).catch(e => {
      console.log(e.response);
      this.$router.push({name: "Users"});

    });
  },
  data() {
    return {
      name: "",
      email: "",
      id: -1,
      error: undefined,
      sucess: undefined,
      isActive: false,
    }
  },
  methods: {
    update() {
      this.isActive = false;

      let config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`
        }
      }

      let dados = {
        name: this.name,
        email: this.email,
        id: this.id
      }

      axios.put("http://192.168.3.15:8686/user", dados, config).then(res => {
        this.sucess = res.data.mensagem;

       
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