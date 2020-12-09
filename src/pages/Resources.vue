<template>
  <Layout>
    <h1>Resources</h1>
    <div class="resources">
      <div v-for="resource in resources" :key="resource.id" class="resource">
        <h4 class="resource__title">
          {{ resource.title }}
        </h4>
        <span class="resource__source">
          {{ resource.source }}
        </span>
        <a
          class="resource__link"
          :href="resource.link"
          rel="noopener noreferrer"
          target="_blank"
        >
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query{
  resources: allResource {
    totalCount
    edges {
      node {
        id
        title
        description
        link
        source
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Resources"
  },
  data() {
    return {
      resources: []
    };
  },
  created() {
    if (this.$page) {
      this.resources = this.$page.resources.edges.map(edge => edge.node);
    }
  }
};
</script>

<style lang="scss" scoped>
.resources {
  .resource {
    position: relative;
    min-height: 72px;
    padding: 24px;
    border-radius: 8px;
    display: block;
    background-color: #ffffff;
    box-shadow: 0 1px 100px 10px rgba(148, 163, 184, 0.06);

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    .resource__title {
      font-weight: 400;
      margin-bottom: 4px;
    }

    .resource__source {
      font-size: 16px;
      color: $muted;
    }

    .resource__title,
    .resource__source {
      display: block;
    }
    .resource__link {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      color: $primary;
    }
  }
}
</style>
