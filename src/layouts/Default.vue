<template>
  <div class="layout">
    <Header />
    <main class="content">
      <slot />
    </main>
    <Footer />
    <BackToTop />
    <span id="device" class="screen-only"></span>
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import BackToTop from "~/components/elements/BackToTop";

export default {
  data() {
    return {
      deviceWatcher: null,
      device: ""
    };
  },
  created() {},
  mounted() {
    this.deviceWatcher = document.getElementById("device");
    this.setDevice();
    window.addEventListener("resize", this.setDevice);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setDevice);
  },
  components: {
    Header,
    Footer,
    BackToTop
  },
  computed: {},
  methods: {
    setDevice() {
      const device = getComputedStyle(
        this.deviceWatcher,
        ":after"
      ).content.replace(/"/g, "");
      if (this.device !== device) {
        this.device = device;
      }
    }
  }
};
</script>
<style lang="scss">
.layout {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 12px;

  .content {
    min-height: calc(100vh - 320px);
    padding: 72px 0;
  }
}
</style>
