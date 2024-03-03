<template>
  <div id="painel">
    <h2 class="title is-2">Painel ADM</h2>

    <div class="columns is-mobile">
      <div class="column is-offset-one-quarter">

        <div class="notification is-warning" :class="{ active: isActiveSuc }"> {{ sucesso }} </div>

        <div class="notification is-info" :class="{ active: isActive }">
          <div>
            <button class="button is-success" @click="opcaoDelete(true, id_del)">SIM</button>
            <button class="button is-warning" @click="opcaoDelete(false, id_del)">NÃO</button>
          </div>
          {{ mensagem }} {{ id_del }}
        </div>

        <table class="table is-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ processRole(item.role) }}</td>
              <td>
                <router-link :to="{name: 'Edit', params:{id: item.id}}"><button class="button is-info is-light">EDI</button></router-link>
                <button class="button is-danger is-light" @click="delUser(item.id)">DEL</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      users: [],
      mensagem: "",
      isActive: true,
      isActiveSuc: true,
      id_del: "",
      sucesso: "",
    }
  },
  created() {
    let config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`
      }
    }

    axios.get("http://localhost:8686/user", config).then(res => {
      this.users = res.data; 

    }).catch(e => {
      console.log(e);
    })
  },
  methods: {
    delUser(value) {
      this.isActive = false;
      this.id_del = value;
      this.mensagem = `Deseja realmente deletar o registro`;
    },
    opcaoDelete(value, id) {
      if(value == false) {
        this.isActive = true;

      } else {
        let config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("tk")}`
          }
        }

        axios.delete(`http://localhost:8686/user/${id}`, config).then(res => {
          this.isActiveSuc = false;
          this.isActive = true;
          this.sucesso = res.data.mensagem;

          this.users = this.users.filter(u => u.id != id);

        }).catch(e => {
          this.isActiveSuc = false;
          this.isActive = true;
          this.sucesso = e.response.data.mensagem;
        });
      }
    },
    processRole(value) {
      if(value == 0) {
        return "Usuário";
      } else {
        return "Admin";
      }
    }
  },
}
</script>

<style scoped>
.notification {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.button.is-success {
  margin-right: 15px;
}
.active {
  display: none;
}
</style>