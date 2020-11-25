<template>
  <footer class="footer">
    <!-- <Logo />
    <div class="footer__links">
      <g-link class="footer__link" to="/" title="Home"></g-link>
    </div> -->
  </footer>
</template>

<script>
import Logo from "~/components/elements/Logo";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss">
.footer {
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .footer__links {
    margin-top: 12px;
    display: flex;

    span {
      display: block;
      margin: 0px 12px;
      color: $subtitle;
    }
  }
}
</style>
