<template>
  <Layout>
    <div class="password__checker">
      <form>
        <Input
          id="password"
          :type="!isPasswordVisible ? 'password' : 'text'"
          v-model="password"
          class="password__entry"
          autocomplete="on"
          placeholder="Password you want to check..."
        />
        <button
          class="password__reveal"
          @click.prevent="togglePasswordVisibility"
        >
          <svg
            v-if="!isPasswordVisible"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            ></path>
          </svg>
        </button>
      </form>
    </div>
    <div class="password__strength">
      <div class="strength-meter-fill" :data-strength="score"></div>
    </div>
    <Loader v-if="isChecking"></Loader>
    <div v-if="checked">
      <div class="password__feedback">
        <div
          v-if="feedback.warning && pwnedTime > 0"
          class="password__feedback__warning"
        >
          {{ feedback.warning }}
        </div>
        <div
          v-else-if="!feedback.warning && pwnedTime > 0"
          class="password__feedback__warning"
        >
          You need to change your password!
        </div>
        <div v-else class="password__feedback__warning">
          Everything seems good!
        </div>

        <div v-if="password && pwnedTime > 0" class="password__pwned">
          This password has appeared {{ pwnedTime }} times in a database of
          leaked passwords.
        </div>
        <div v-else-if="password && pwnedTime === 0" class="password__pwned">
          This password does not appear in any database of leaked passwords.
        </div>

        <div
          v-if="feedback.suggestions && feedback.suggestions.length > 0"
          class="password__suggestions"
        >
          <div class="password__suggestions__icon">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              ></path>
            </svg>
          </div>
          <div class="password__suggestions__text">
            <ul
              v-for="(suggestion, index) in feedback.suggestions"
              :key="index"
            >
              <li>{{ suggestion }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="password__best-practices">
        <div class="password__best-practices__header">
          <h2>
            Best practices
            <span class="check__count">
              {{ checkedCount }} out of {{ checklist.length }}
            </span>
          </h2>
          <Button @click="checkAll" class="password__best-practices__check">
            {{ allChecked ? "Uncheck all" : "Check all" }}
          </Button>
        </div>
        <div
          v-for="item in checklist"
          :key="item.id"
          class="password__best-practices__item"
        >
          <Checkbox
            :id="item.id"
            :name="item.id"
            :label="item.value"
            :checked="item.checked"
            :styled="true"
            v-model="item.checked"
          />
        </div>
      </div>
    </div>
    <Toast
      :show="showToast"
      type="success"
      message="Well done! 🥳"
      @close="hideToast"
    />
  </Layout>
</template>

<page-query>
query {
   checklist: allChecklist {
    totalCount
    edges {
      node {
        id
        value
      }
    }
  }
}
</page-query>

<script>
import { debounce } from "~/utils/common";
import { getHash, getStrength } from "~/utils/password";

import Loader from "~/components/elements/Loader";
import Button from "~/components/elements/Button";
import Input from "~/components/elements/Input";
import Checkbox from "~/components/elements/Checkbox";
import Toast from "~/components/elements/Toast";

export default {
  metaInfo: {
    title: "Check password"
  },
  data() {
    return {
      showToast: false,
      checklist: [],
      password: "",
      isPasswordVisible: false,
      checked: false,
      isChecking: false,
      pwnedTime: 0,
      feedback: {},
      score: -1
    };
  },
  components: {
    Loader,
    Checkbox,
    Button,
    Input,
    Toast
  },
  created() {
    if (this.$page) {
      this.checklist = this.$page.checklist.edges.map(edge => ({
        ...edge.node,
        checked: false
      }));
    }
  },
  computed: {
    checkedCount: function() {
      return this.checklist.filter(item => item.checked).length;
    },
    allChecked: function() {
      return this.checklist.every(item => item.checked);
    }
  },
  methods: {
    async checkPassword(password) {
      this.isChecking = true;
      this.checked = false;

      const strength = getStrength(password);
      const hash = getHash(password);
      const response = await fetch(
        "https://api.pwnedpasswords.com/range/" + hash.substr(0, 5)
      );
      const data = await response.text();

      let time = 0;
      data.split("\n").forEach(value => {
        const result = value.split(":");
        if (hash.substr(0, 5) + result[0] == hash) {
          time = result[1];
        }
      });

      if (time > 0) {
        this.pwned = true;
        this.pwnedTime = time;
      } else {
        this.pwned = false;
        this.pwnedTime = 0;
      }

      this.feedback = strength.feedback;
      this.score = strength.score;

      setTimeout(() => {
        this.isChecking = false;
        this.checked = true;
      }, 750);
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    reset() {
      this.password = "";
      this.pwnedTime = 0;
      this.checked = false;
      this.score = -1;
    },
    checkAll() {
      this.checklist = this.checklist.map(item => ({
        ...item,
        checked: !this.allChecked
      }));
    },
    hideToast() {
      this.showToast = false;
    }
  },
  watch: {
    password: debounce(function() {
      this.checked = false;

      if (this.password) {
        this.checkPassword(this.password);
      } else {
        this.reset();
      }
    }, 500),
    // eslint-disable-next-line no-unused-vars
    allChecked: function(newVal, oldVal) {
      if (newVal === true) {
        this.showToast = true;

        setTimeout(() => {
          this.hideToast();
        }, 2500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.password__checker {
  position: relative;
  margin-bottom: 12px;

  input.password__entry {
    font-size: 18px;
    height: 72px;
    line-height: 30px;
    display: block;
    width: 100%;
    margin: 0;
    padding: 20px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: inherit;
    background-color: #ffffff;
    outline: 0;
    transition-duration: 0.2s;

    &:hover {
      border-color: #cbd5e1;
    }

    &:focus {
      border-color: $primary;
      box-shadow: 0 0 0 4px #d6e3fd;
    }
  }

  .password__reveal {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    min-width: 48px;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;

    svg {
      color: $muted;
      width: 24px;
      height: 24px;
    }
  }
}

.password__feedback {
  margin-top: 32px;
  background-color: #ffffff;
  padding: 32px;
  border: 2px solid $primary;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 12px;
  }

  .password__feedback__warning {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 24px;
    color: $title;
    margin-bottom: 4px;
  }

  .password__pwned {
    color: $muted;
  }
}

.password__suggestions {
  margin-top: 24px;
  display: flex;
  align-items: center;

  .password__suggestions__icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 24px;
    color: #fbbf24;
    background-color: rgba($color: #fbbf24, $alpha: 0.1);

    > svg {
      width: 28px;
    }
  }
}

.password__strength {
  position: relative;
  height: 4px;
  background: #e2e8f0;
  margin: 10px 2px;
  border-radius: 50px;

  .strength-meter-fill {
    background: transparent;
    height: inherit;
    position: absolute;
    width: 0;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
  }

  .strength-meter-fill[data-strength="0"] {
    background: #dc2626;
    width: 20%;
  }

  .strength-meter-fill[data-strength="1"] {
    background: #ef4444;
    width: 40%;
  }

  .strength-meter-fill[data-strength="2"] {
    background: #f59e0b;
    width: 60%;
  }

  .strength-meter-fill[data-strength="3"] {
    background: #34d399;
    width: 80%;
  }

  .strength-meter-fill[data-strength="4"] {
    background: #059669;
    width: 100%;
  }
}

.password__best-practices {
  margin-top: 32px;

  h2 {
    display: inline-block;
    margin: 0;

    .check__count {
      display: inline-block;
      font-size: 16px;
      font-weight: 400;
      color: $muted;
      margin-left: 8px;
    }
  }
  .password__best-practices__item {
    min-height: 72px;
    padding: 10px 15px;
    border-radius: 8px;

    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 1px 100px 10px rgba(148, 163, 184, 0.06);

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .password__best-practices__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .password__best-practices__check {
    max-width: 132px;
    height: 52px;
    padding: 0;
    background-color: $primary;
    color: #fff;
    font-size: 16px;
  }
}
</style>
