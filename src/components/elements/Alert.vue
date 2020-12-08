<template>
  <div :class="'alert alert--' + type">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.alert {
  padding: 22px;
  margin-bottom: 22px;
  transition: all ease-out 0.2s;

  &--success {
    color: $success;
    background-color: rgba(60, 192, 167, 0.1);
  }
  &--info {
    color: $info;
    background-color: rgba(63, 64, 241, 0.1);
  }
  &--warning {
    color: $warning;
    background-color: rgba(231, 77, 60, 0.1);
  }
  &--error {
    color: $error;
    background-color: rgba(231, 77, 60, 0.1);
  }
}
</style>
