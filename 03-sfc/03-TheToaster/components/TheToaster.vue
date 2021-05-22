<template>
  <div v-if="messages.length" class="toasts">
    <toaster-message v-for="message in messages" :key="message.label" :type="message.type" :message="message.label" />
  </div>
</template>

<script>
import ToasterMessage from './ToasterMessage';

const DELAY = 5000;

export default {
  name: 'TheToaster',

  components: { ToasterMessage },
  data: () => ({
    messages: [],
  }),

  methods: {
    error(message) {
      this.handleMessages('error', message);
    },

    success(message) {
      this.handleMessages('success', message);
    },

    handleMessages(type, message) {
      this.messages.push({
        type: type,
        label: message,
      });
      setTimeout(() => this.messages.shift(), DELAY);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
