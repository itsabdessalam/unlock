<template>
  <div :class="['checkbox', styled ? 'styled' : null]" :checked="checked">
    <span class="checkbox__check">
      <input
        class="checkbox__input"
        type="checkbox"
        :checked="checked"
        :aria-checked="checked"
        :disabled="disabled"
        @change="handleCheckboxChange($event.target.checked)"
      />
    </span>
    <span class="checkbox__text">{{ label }}</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    checked: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    styled: { type: Boolean, default: false }
  },
  methods: {
    handleCheckboxChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &.styled[checked="checked"] {
    .checkbox__text {
      color: $muted;

      &::after {
        width: 100%;
      }
    }
  }

  .checkbox__check {
    width: 18px;
    height: 18px;
  }

  .checkbox__input {
    position: relative;
    margin: 0;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    outline: none;
    appearance: none;
    width: 18px;
    height: 18px;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &[aria-checked="true"] {
      background-color: $primary;
      border-width: 1px;
      border-color: $primary;

      &::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' height='16' width='16' fill='none'%3E%3Cpath d='M14 7L8.5 12.5L6 10' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
        position: absolute;
        width: 16px;
        height: 16px;
        text-align: center;
      }
    }
    &:not([aria-checked="true"]) {
      &:hover {
        background-color: rgba(0, 122, 255, 0.1);
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .checkbox__text {
    margin-left: 8px;
    position: relative;

    &::after {
      content: "";
      width: 0;
      height: 1px;
      background-color: $muted;
      position: absolute;
      top: 50%;
      left: 0;
      transition: 0.2s ease;
    }
  }
}
</style>
