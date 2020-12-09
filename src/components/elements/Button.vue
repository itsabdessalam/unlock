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
  background-color: transparent;
  border: none;
  font-size: 18px;
  height: 72px;
  line-height: 30px;
  display: block;
  width: 100%;
  margin: 0;
  padding: 20px;
  border: 2px solid $primary;
  border-radius: 8px;
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
