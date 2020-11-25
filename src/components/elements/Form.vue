<template>
  <div class="form">
    <form
      class="form__inner"
      @keydown.enter.prevent=""
      novalidate="true"
      autocomplete="disabled"
    >
      <header class="form__header">
        <slot name="header"></slot>
      </header>
      <div class="form__body">
        <slot name="body"></slot>
      </div>
      <footer class="form__footer">
        <slot name="footer"></slot>
      </footer>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Form',

  methods: {
    submit() {
      this.$emit('submit');
    },
  },
};
</script>

<style lang="scss">
.form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  .form__header {
    text-align: center;
    margin-bottom: 40px;

    &:empty {
      display: none;
    }
  }

  .form__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    font-size: 14px;

    &:empty {
      display: none;
    }
  }

  .suggestion {
    text-align: left;
  }

  .form__inner {
    background: #ffffff;
    margin: 0 auto;
    width: 100%;
    padding: 24px;

    .title {
      text-align: center;
      margin-bottom: 32px;
      color: #303133;

      * {
        display: inline-block;
      }

      p {
        vertical-align: middle;
        margin: 0;
        font-size: 24px;

        * {
          display: block;
        }
      }
    }

    .grouped {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .field {
        width: 50%;

        &:not(:last-child) {
          margin-right: 12px;
        }
      }

      @media (max-width: $phone) {
        .field {
          width: 100%;

          &:not(:last-child) {
            margin-right: 0;
          }
        }
      }
    }

    .field {
      position: relative;
      clear: both;

      input:not([type='checkbox']):not([type='radio']),
      .input {
        display: inline-block !important;
      }

      label,
      .label {
        display: block;
        margin-bottom: 12px;
        font-size: 12px;
        color: $subtitle;
      }

      input:not([type='checkbox']):not([type='radio']),
      .input,
      select,
      textarea {
        background: #ffffff;
        border: 1px solid $inputBorder;
        color: $text;
        margin: 0;
        padding: 16px;
        width: 100%;
        display: block;
        font-size: 14px;
        transition: border-color ease-in-out 0.2s, box-shadow ease-in-out 0.2s;
        text-align: left;
        height: auto;
        -webkit-appearance: none;
        outline: none;
      }

      p.help {
        margin: 0;
        position: absolute;
        bottom: -16px;
        font-size: 11px;

        &.error {
          color: $error;
        }
      }

      &--error {
        input:not([type='checkbox']):not([type='radio']),
        .input,
        select,
        textarea {
          border-color: $error;
        }
      }
    }
  }
}
</style>
