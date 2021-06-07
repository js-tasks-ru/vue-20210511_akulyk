<template>
  <form class="form" novalidate @submit.prevent="submit">
    <form-group label="Email">
      <div class="input-group">
        <input ref="email" v-model="email" type="email" placeholder="demo@email" class="form-control" required />
      </div>
    </form-group>
    <form-group label="Пароль">
      <div class="input-group">
        <input ref="password" v-model="password" type="password" placeholder="password" class="form-control" required />
      </div>
    </form-group>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }" class="link"> Зарегистрируйтесь </router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';
import FormGroup from '../components/FormGroup';

const TEXTS = {
  validation: {
    empty: (field) => `Требуется ввести ${field}`,
  },
};

export default {
  name: 'LoginPage',

  components: {
    FormGroup,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    validate() {
      if (this.$refs.email.validity.valueMissing) {
        alert(TEXTS.validation.empty('Email'));
        return false;
      }

      if (this.$refs.password.validity.valueMissing) {
        alert(TEXTS.validation.empty('пароль'));
        return false;
      }

      return true;
    },

    submit() {
      if (!this.validate()) {
        return;
      }

      login(this.email, this.password).then((result) => {
        if (result.error) {
          alert(result.message);
        } else {
          alert(result.fullname);
          this.$router.push(this.$route.query.from ?? '/');
        }
      });
    },
  },
};
</script>

<style></style>
