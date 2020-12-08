<template>
  <input
    class="input"
    :value="value"
    :type="type"
    @input="handleInputChange($event.target.value)"
  />
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    handleInputChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  font-size: 18px;
  height: 72px;
  line-height: 30px;
  display: block;
  width: 100%;
  margin: 0;
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  background-color: #ffffff;
  outline: 0;
  transition-duration: 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 4px #d6e3fd;
  }
}
</style>
