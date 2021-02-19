<template>
  <g-link class="logo" title="Home" to="/check">
    <svg
      width="42"
      height="42"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="logo__vector"
    >
      <rect width="512" height="512" rx="191" fill="#007AFF" />
      <path
        d="M245.7 104.1C225.5 106.8 206.7 117.8 195.5 133.5C185.9 146.9 181.3 161.3 180.3 180.6L179.7 192.7L174.6 194C167.1 195.8 155.7 200.7 151 204.1C141.8 210.8 135.4 222.8 130.1 243.3C121.6 275.8 122.3 324.6 131.7 357C135 368.7 140.1 378.7 145.6 384.9C159.3 400.1 197.8 408.3 255.5 408.3C313.4 408.3 352 400 365.5 384.8C368 381.9 371.6 376.3 373.5 372.5C387.7 343.1 391.2 283.3 381 243.5C372.7 210.9 363.4 201.1 333.3 193.1L329 191.9V183.7C328.9 144.4 307.4 114.9 272.5 106C263.2 103.7 254 103 245.7 104.1ZM270.2 129.9C278.1 132.6 284.4 136.5 290 142C299.4 151.5 303.9 162.3 304.7 177.9L305.3 188.3L300.4 187.7C280.1 185 235.7 185 210.3 187.6L204 188.3V181.3C204 173.1 206.8 161.3 210.5 153.9C215.5 144.1 226.8 134.1 237 130.5C247.9 126.6 260 126.3 270.2 129.9Z"
        fill="white"
      />
      <circle cx="256.5" cy="301.5" r="27.5" fill="#007AFF" />
    </svg>
    <span class="logo__text">mypasswd</span>
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

  .logo__text {
    font-size: 24px;
    font-weight: 500;
    margin-left: 8px;
  }
}
</style>
