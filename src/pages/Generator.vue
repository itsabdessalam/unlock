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
      <button @click="generatePassword" class="password__generate">
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </button>
    </div>

    <div class="password__length">
      <label for="passwordLength">Length</label>
      <Input
        type="number"
        id="length"
        name="length"
        min="1"
        v-model="config.length"
      />
    </div>

    <div class="password__criteria">
      <label for="">Filters</label>
      <div class="password__criteria__filters">
        <Checkbox
          id="lowercase"
          name="lowercase"
          label="Lowercase"
          :checked="config.lowercase"
          v-model="config.lowercase"
          :disabled="true"
        />

        <Checkbox
          id="uppercase"
          name="uppercase"
          label="Uppercase"
          :checked="config.uppercase"
          v-model="config.uppercase"
        />

        <Checkbox
          id="numbers"
          name="numbers"
          label="Numbers"
          :checked="config.numbers"
          v-model="config.numbers"
        />
        <Checkbox
          id="special"
          name="special"
          label="Special chars"
          :checked="config.special"
          v-model="config.special"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import { generate } from "~/utils/password";

import Checkbox from "~/components/elements/Checkbox";
import Input from "~/components/elements/Input";

const DEFAULT_CONFIG = {
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  special: true
};

export default {
  metaInfo: {
    title: "Generator"
  },
  data() {
    return {
      password: generate(DEFAULT_CONFIG),
      config: DEFAULT_CONFIG,
      passwordCopied: false
    };
  },
  components: { Checkbox, Input },
  methods: {
    generatePassword() {
      this.password = generate(this.config);
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
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.generatePassword(this.config);
      }
    }
  }
};
</script>

<style lang="scss">
.password__criteria {
  margin: 24px 0;
  padding: 0 4px;

  .password__criteria__filters {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  label {
    display: block;
  }

  .checkbox {
    width: auto;

    &:not(:first-child) {
      margin-left: 8px;
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
    border-radius: 8px;
    font-family: inherit;
    background-color: #ffffff;
    color: $text;
    outline: 0;
    transition-duration: 0.2s;
  }

  .password__copy {
    position: absolute;
    right: 22px;
    top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    cursor: pointer;
    color: $primary;
    background-color: rgba($color: $primary, $alpha: 0.1);
    border: none;
    outline: none;
    border-radius: 50%;

    svg {
      width: 24px;
      height: 24px;
    }

    &--copied {
      cursor: not-allowed;
      pointer-events: none;
      color: #34d399;
      background-color: rgba($color: #34d399, $alpha: 0.1);
    }
  }

  .password__generate {
    position: absolute;
    right: 22px;
    top: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    cursor: pointer;
    color: #38bdf8;
    background-color: rgba($color: #38bdf8, $alpha: 0.1);
    border: none;
    outline: none;
    border-radius: 50%;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.password__length {
  input {
    height: 52px !important;
  }
}
</style>
