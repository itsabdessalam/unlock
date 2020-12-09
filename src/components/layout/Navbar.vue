<template>
  <nav class="nav">
    <div class="nav__links nav__links--desktop">
      <Logo />
      <div class="nav__links__inner">
        <g-link
          class="nav__link"
          to="/tester"
          title="Tester"
          exact-active-class="nav__link--active"
          exact
        >
          Tester
        </g-link>
        <g-link
          class="nav__link"
          to="/generator"
          title="Generator"
          exact-active-class="nav__link--active"
          exact
        >
          Generator
        </g-link>
        <g-link
          class="nav__link"
          to="/resources"
          title="Resources"
          exact-active-class="nav__link--active"
          exact
        >
          Resources
        </g-link>
      </div>
    </div>

    <div class="nav__links nav__links--mobile" :class="{ open: isMenuOpen }">
      <a class="nav__link__menu" @click.prevent="handleClick">
        <svg
          v-if="!isMenuOpen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="menu-open"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </a>
      <Logo />

      <div class="nav__links__inner" :class="{ visible: isMenuOpen }">
        <g-link class="nav__link" to="/tester" title="Tester">
          Tester
        </g-link>
        <g-link class="nav__link" to="/generator" title="Generator">
          Generator
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
  height: 80px;
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
