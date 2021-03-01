<template>
  <b-navbar :class="{ 'is-primary': !transparent }">
    <template #brand>
      <b-navbar-item tag="g-link" to="/" class="is-size-5 has-text-weight-semibold">
        {{ $static.metadata.siteName }}
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item v-for="item in $static.navItems.edges" :key="item.node.id" tag="g-link" :to="item.node.path" exact-active-class="is-active">
        {{ item.node.name }}
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  navItems: allNavItems(order: ASC) {
    edges {
      node {
        name
        path
      }
    }
  }
}
</static-query>

<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>
