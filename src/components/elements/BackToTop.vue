<template>
  <a
    class="backtotop"
    :class="visible && 'visible'"
    @click.prevent="handleClick"
  >
    <svg viewBox="0 0 16.1 11.3">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.1 5.7l-1.5-1.5L10.4 0 9 1.4l3.2 3.2H0v2h12.3L9 9.9l1.4 1.4 4.2-4.2z"
      ></path>
    </svg>
  </a>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleClick() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (!this.visible && scrollTop > 500) {
        this.visible = true;
      }
      if (this.visible && scrollTop <= 500) {
        this.visible = false;
      }
    }
  }
};
</script>

<style lang="scss">
.backtotop {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 48px;
  height: 48px;
  color: #ffffff;
  background: $primary;
  cursor: pointer;
  transform: translateY(250px);
  transition: transform ease-out 0.5s;

  > svg {
    fill: currentColor;
    width: 16px;
    transform: rotate(-90deg);
  }
  &.visible {
    transform: translateY(0);
  }

  &:focus {
    outline: 0;
  }
}
</style>
