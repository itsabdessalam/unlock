<template>
  <nav class="nav">
    <div class="nav__links nav__links--desktop">
      <Logo />
      <div class="nav__links__inner">
        <g-link
          class="nav__link"
          to="/"
          title="Check"
          exact-active-class="nav__link--active"
        >
          Check
        </g-link>
        <g-link
          class="nav__link"
          to="/generate/"
          title="Generate"
          exact-active-class="nav__link--active"
        >
          Generate
        </g-link>
        <g-link
          class="nav__link"
          to="/resources/"
          title="Resources"
          exact-active-class="nav__link--active"
        >
          Resources
        </g-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "~/components/elements/Logo";

export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  components: { Logo },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.clear();
  },
  computed: {},
  methods: {
    init() {
      if (document.documentElement.classList.contains("overflow")) {
        document.documentElement.classList.remove("overflow");
      }
    },
    clear() {},
    handleClick() {
      this.isMenuOpen = !this.isMenuOpen;
      if (
        this.isMenuOpen &&
        !document.documentElement.classList.contains("overflow")
      ) {
        document.documentElement.classList.add("overflow");
      } else {
        document.documentElement.classList.remove("overflow");
      }
    }
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  max-width: 980px;
  top: 0;
  z-index: 1200;
  background: $background;

  .nav__links {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--desktop {
      width: 100%;

      .nav__links__inner {
        display: flex;
        align-items: center;
      }
    }

    &--mobile {
      display: none;
      width: 100%;

      .nav__link__icons {
        display: flex;

        .nav__link {
          &--icon {
            margin: 0 !important;
          }
        }
      }

      .nav__link__menu {
        z-index: 1092;
        position: relative;
      }

      &.open {
        .nav__link__menu {
          svg {
            fill: #ffffff;
            stroke: #ffffff;
          }
        }
      }

      .nav__links__inner {
        &.visible {
          display: flex;
          position: fixed;
          background: #000;
          width: 100%;
          height: 100vh;
          top: 0;
          z-index: 1072;
          left: 0;
          color: #fff;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .nav__link {
            margin-left: 0;
            margin-bottom: 12px;
            color: #ffffff;
          }
        }
      }
    }

    .nav__link {
      margin-left: 24px;
      position: relative;
      color: $muted;

      &--active {
        color: $text;
      }

      &:hover {
        opacity: 1;
      }
    }

    .nav__link__menu {
      display: flex;
    }

    .nav__link__icons {
      display: flex;
    }
  }
}
</style>
