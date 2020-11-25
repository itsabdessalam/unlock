<template>
  <Layout>
    <h2>Generator</h2>
    <label for="">Length</label>
    <input
      type="number"
      id="passwordLength"
      min="1"
      value="1"
      v-model="passwordLength"
    />
    <label for="">Lowercase</label>
    <input type="checkbox" id="lowercaseChars" v-model="lowercaseChars" />
    <label for="">Uppercase</label>
    <input type="checkbox" id="uppercaseChars" v-model="uppercaseChars" />
    <label for="">Numbers</label>
    <input type="checkbox" id="numbers" v-model="numbers" />
    <label for="">Special chars</label>
    <input type="checkbox" id="specialChars" v-model="specialChars" />
    <button @click="generatePassword">Generate</button>

    <p v-if="password">{{ password }}</p>
  </Layout>
</template>

<script>
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

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
  methods: {
    getPasswordConfig() {
      console.log(
        "toto",
        this.passwordLength,
        this.lowercaseChars,
        this.uppercaseChars,
        this.numbers,
        this.specialChars
      );
    },
    generatePassword(
      length,
      lowercaseChars,
      uppercaseChars,
      numbers,
      specialChars
    ) {
      let password = "";

      if (this.lowercaseChars) {
        password += "abcdedfghijklmnopqrst";
      }

      if (this.uppercaseChars) {
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }

      if (this.numbers) {
        password += "0123456789";
      }

      if (this.specialChars) {
        password += "!@#$%&*";
      }

      password = shuffle(password.split(""));

      this.password = password.slice(0, this.passwordLength).join("");
    }
  }
};
</script>

<style></style>
