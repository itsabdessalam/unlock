<template>
  <g-link class="logo" title="Home" to="/">
    <g-image
      src="@/assets/images/unlock-logo-full.png"
      alt="Unlock"
      width="132"
    />
  </g-link>
</template>

<script>
export default {
  name: "Logo"
};
</script>
<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
