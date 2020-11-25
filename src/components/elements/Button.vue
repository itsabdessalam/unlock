<template>
  <button class="button" @click.prevent="submit($event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  methods: {
    submit(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease-out 0.2s;
  background-color: transparent;
  font-size: 14px;
  min-width: 120px;
  padding: 16px 24px;
  min-width: 128px;
  border: none;
  cursor: pointer;
  transition: all ease-out 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &--primary {
    color: #ffffff;
    background-color: $primary;
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
