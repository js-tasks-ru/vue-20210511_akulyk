<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div v-if="resultError" class="error">{{ resultError }}</div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          class="form-control"
          :value="formModel.email.value"
          @blue="handleChange('email', $event)"
          @input="handleChange('email', $event)"
        />
        <div v-if="formModel.email.error" class="error">{{ formModel.email.error }}</div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          :value="formModel.name.value"
          @blue="handleChange('name', $event)"
          @input="handleChange('name', $event)"
        />
        <div v-if="formModel.name.error" class="error">{{ formModel.name.error }}</div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          :value="formModel.password.value"
          @blue="handleChange('password', $event)"
          @input="handleChange('password', $event)"
        />
        <div v-if="formModel.password.error" class="error">{{ formModel.password.error }}</div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          :value="formModel.password_repeat.value"
          @blue="handleChange('password_repeat', $event)"
          @input="handleChange('password_repeat', $event)"
        />
        <div v-if="formModel.password_repeat.error" class="error">{{ formModel.password_repeat.error }}</div>
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input v-model="formModel.agree.value" type="checkbox" /> Я согласен с условиями <span></span
      ></label>
      <div v-if="formModel.agree.error" class="error">{{ formModel.agree.error }}</div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data: () => {
    return {
      resultError: null,
      formModel: {
        name: {
          value: null,
          valid: false,
          error: null,
          touched: false,
          validators: [(value) => (value && value.length > 0 ? null : 'Требуется ввести полное имя')],
        },

        email: {
          value: null,
          valid: false,
          error: null,
          touched: false,
          validators: [(value) => (value && value.length > 0 ? null : 'Требуется ввести Email')],
        },

        password: {
          value: null,
          valid: false,
          error: null,
          touched: false,
          validators: [(value) => (value && value.length > 0 ? null : 'Требуется ввести пароль')],
        },

        password_repeat: {
          value: null,
          valid: false,
          error: null,
          touched: false,
          validators: [
            (value, self) => {
              return value && value === self.formModel.password.value ? null : 'Пароли не совпадают';
            },
          ],
        },

        agree: {
          value: false,
          valid: false,
          error: null,
          touched: false,
          validators: [(value) => (value ? null : 'Требуется согласиться с условиями')],
        },
      },
    };
  },

  computed: {
    valid() {
      let valid = true;
      for (const item in this.formModel) {
        valid = valid && this.formModel[item].valid;
      }
      return valid;
    },
  },

  methods: {
    handleChange(field, e) {
      const value = e.target.value;
      const model = this.formModel[field];
      model.value = value;
      this.formModel = { ...this.formModel, model };
      this.validate(field);
    },

    validate(field) {
      const self = this;
      const model = this.formModel[field];
      const validators = model.validators;
      model.valid = true;
      model.error = null;
      validators.forEach((validate) => {
        if (model.error) {
          return;
        }
        const error = validate(model.value, self);
        if (error) {
          model.error = error;
          model.valid = false;
        }
      });
      this.formModel = { ...this.formModel, model };
    },

    async handleSubmit() {
      for (const field in this.formModel) {
        this.validate(field);
        if (this.formModel[field].error) {
          alert(this.formModel[field].error);
        }
      }
      if (!this.valid) {
        return;
      }
      const result = await register(
        this.formModel.email.value,
        this.formModel.name.value,
        this.formModel.password.value,
      );
      if (result.error) {
        this.resultError = result.message;
        alert(this.resultError);
        return;
      }
      alert(result.id);
      this.$router.push({name: 'login'});

    },
  },
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}

.error {
  color: #db3851;
}
</style>
