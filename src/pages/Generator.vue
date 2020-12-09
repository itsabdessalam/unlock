<template>
  <Layout>
    <div class="password__container">
      <span>
        {{ password }}
      </span>
      <button @click="copyPassword" class="password__copy">
        <svg
          v-if="!passwordCopied"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>

        <svg
          v-else
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </button>
    </div>

    <div class="password__length">
      <label for="passwordLength">Length</label>
      <Input
        type="number"
        id="passwordLength"
        name="passwordLength"
        min="1"
        v-model="passwordLength"
      />
    </div>

    <div class="password__criteria">
      <Checkbox
        id="lowercaseChars"
        name="lowercaseChars"
        label="Lowercase"
        :checked="lowercaseChars"
        :disabled="true"
        v-model="lowercaseChars"
      />

      <Checkbox
        id="uppercaseChars"
        name="uppercaseChars"
        label="Uppercase"
        :checked="uppercaseChars"
        v-model="uppercaseChars"
      />

      <Checkbox
        id="numbers"
        name="numbers"
        label="Numbers"
        :checked="numbers"
        v-model="numbers"
      />
      <Checkbox
        id="specialChars"
        name="specialChars"
        label="Special chars"
        :checked="specialChars"
        v-model="specialChars"
      />
    </div>

    <Button class="button button--primary" @click="generatePassword">
      Generate
    </Button>
  </Layout>
</template>

<script>
import { generate } from "~/utils/password";

import Checkbox from "~/components/elements/Checkbox";
import Input from "~/components/elements/Input";
import Button from "~/components/elements/Button";

export default {
  metaInfo: {
    title: "Generator"
  },
  data() {
    return {
      password: generate({
        length: 16,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true
      }),
      passwordLength: 16,
      lowercaseChars: true,
      uppercaseChars: true,
      numbers: true,
      specialChars: true,
      passwordCopied: false
    };
  },
  components: { Checkbox, Input, Button },
  methods: {
    generatePassword() {
      this.password = generate({
        length: this.passwordLength,
        lowercase: this.lowercaseChars,
        uppercase: this.uppercaseChars,
        numbers: this.numbers,
        special: this.specialChars
      });
    },
    copyPassword(event) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = this.password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        event.target.classList.add("password__copy--copied");
        this.passwordCopied = true;

        setTimeout(() => {
          this.passwordCopied = false;
          event.target.classList.remove("password__copy--copied");
        }, 750);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss">
.password__criteria {
  margin: 24px 0;
  padding: 0 4px;

  .checkbox {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.password__container {
  position: relative;
  margin-bottom: 24px;

  span {
    text-align: center;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130px;
    line-height: 30px;
    width: 100%;
    margin: 0;
    padding: 20px;
    border: 2px solid $primary;
    border-radius: 12px;
    font-family: inherit;
    background-color: #ffffff;
    color: $text;
    outline: 0;
    transition-duration: 0.2s;
  }

  .password__copy {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    min-width: 48px;
    cursor: pointer;
    background-color: $primary;
    border: none;
    outline: none;
    border-radius: 50%;

    svg {
      color: #ffffff;
      width: 24px;
      height: 24px;
    }

    &--copied {
      cursor: not-allowed;
      pointer-events: none;
      background-color: #34d399;

      svg {
        color: #ffffff;
      }
    }
  }
}
</style>
