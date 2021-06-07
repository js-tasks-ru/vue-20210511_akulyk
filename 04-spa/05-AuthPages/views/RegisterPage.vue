<template>
  <form class="form" novalidate @submit.prevent="submit">
    <form-group label="Email">
      <div class="input-group">
        <input ref="email" v-model="email" type="email" class="form-control" required />
      </div>
    </form-group>
    <form-group label="Имя">
      <div class="input-group">
        <input ref="fullname" v-model="fullname" type="text" class="form-control" required />
      </div>
    </form-group>
    <form-group label="Пароль">
      <div class="input-group">
        <input ref="password" v-model="password" type="password" class="form-control" required />
      </div>
    </form-group>
    <form-group label="Повтор пароля">
      <div class="input-group">
        <input v-model="password2" type="password" class="form-control" />
      </div>
    </form-group>
    <form-group>
      <label class="checkbox"><input v-model="agree" type="checkbox" /> Я согласен с условиями <span></span></label>
    </form-group>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import FormGroup from '../components/FormGroup';
import { register } from '../data';

const TEXTS = {
  validation: {
    empty: (field) => `Требуется ввести ${field}`,
    repeatPasswords: 'Пароли не совпадают',
    agree: 'Требуется согласиться с условиями',
  },
  wrongCredentials: 'Неверные учетные данные',
};

export default {
  name: 'RegisterPage',
  components: { FormGroup },

  data() {
    return {
      email: '',
      fullname: '',
      password: '',
      password2: '',
      agree: false,
    };
  },

  methods: {
    validate() {
      if (this.$refs.email.validity.valueMissing) {
        alert(TEXTS.validation.empty('Email'));
        return false;
      }

      if (this.$refs.fullname.validity.valueMissing) {
        alert(TEXTS.validation.empty('полное имя'));
        return false;
      }

      if (this.$refs.password.validity.valueMissing) {
        alert(TEXTS.validation.empty('пароль'));
        return false;
      }

      if (this.password !== this.password2) {
        alert(TEXTS.validation.repeatPasswords);
        return false;
      }

      if (!this.agree) {
        alert(TEXTS.validation.agree);
        return false;
      }

      return true;
    },

    submit() {
      if (!this.validate()) {
        return;
      }

      register(this.email, this.fullname, this.password).then((result) => {
        if (result.error) {
          alert(result.message);
        } else {
          alert(result.id);
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>

<style></style>
