<template>
  <div :class="['toast toast--' + type, show ? 'show' : null]">
    <span class="toast__message">
      {{ message }}
    </span>
    <button class="toast__close" @click="$emit('close')">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.toast {
  padding: 22px;
  border-radius: 8px;
  min-width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 60px;
  right: -1000px;
  color: #ffffff;
  transition: all ease-out 0.2s;

  &.show {
    right: 12px;
  }

  &--success {
    background-color: $primary;
  }
  &--info {
    background-color: $info;
  }
  &--warning {
    background-color: $warning;
  }
  &--error {
    background-color: $error;
  }

  .toast__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
    color: #ffffff;
    border: none;
    outline: none;
    border-radius: 50%;
    padding: 0;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
