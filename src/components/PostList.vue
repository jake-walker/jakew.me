<template>
  <div class="pb-8">
    <h1 class="text-3xl font-semibold text-primary">{{ year }}</h1>
    <PostItem :key="post.node.id" v-for="post in this.postsByYear" :post="post.node" />
  </div>
</template>

<script>
import PostItem from './PostItem';

export default {
  props: ["year"],
  components: {
    PostItem
  },
  computed: {
    postsByYear() {
      const posts = this.$page.posts.edges;
      return posts.filter((post) => {
        return post.node.date.includes(this.year);
      })
    }
  }
};
</script>
