<template>
  <header class="header">
    <Navbar />
  </header>
</template>

<script>
import Navbar from "~/components/layout/Navbar";

export default {
  components: { Navbar }
};
</script>

<style lang="scss">
.header {
  margin-bottom: 20px;
  height: 80px;
}
</style>
