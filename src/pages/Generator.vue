<template>
  <Layout>
    <div class="password__container">
      <span>
        {{ password }}
      </span>
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
  data() {
    return {
      password: "",
      passwordLength: 16,
      lowercaseChars: true,
      uppercaseChars: true,
      numbers: true,
      specialChars: true
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
  margin-bottom: 24px;

  span {
    text-align: center;
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
    background-color: #fff;
    outline: 0;
    transition-duration: 0.2s;
  }
}
</style>
