<template>
  <form class="form" @submit.prevent="handleLogin">
    <p v-if="error" class="error">{{ error }}</p>
    <form-group label="Email">
      <div class="input-group">
        <input v-model="email" type="email" placeholder="demo@email" class="form-control"/>
      </div>
    </form-group>
    <form-group label="Пароль">
      <div class="input-group">
        <input v-model="password" type="password" placeholder="password" class="form-control"/>
      </div>
    </form-group>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import {login} from '../data';
import FormGroup from '../components/FormGroup';

export default {
  name: 'LoginPage',
  components: {
    FormGroup,
  },
  data: () => ({
    email: null,
    password: null,
    error: null,
  }),
  computed: {
    valid() {
      return this.email && this.password;
    },
  },
  methods: {
    async handleLogin() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }

      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }

      const result = await login(this.email, this.password);
      if (result.error) {
        this.error = result.message;
        alert(this.error);
        return;
      }
      alert(result.fullname);
      let path = '/';
      if (this.$route.query.from) {
        path = this.$route.query.from;
      }
      return this.$router.push(path);

    },
  },
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}

.error {
  color: crimson;
}
</style>
