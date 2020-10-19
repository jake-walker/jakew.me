<template>
  <Layout>
    <div class="container mx-auto py-5">
      <PostList v-for="year in years" :key="year" :year="year" />
    </div>
  </Layout>
</template>

<script>
import PostList from "@/components/PostList";

export default {
  metaInfo: {
    title: 'Blog'
  },
  components: {
    PostList
  },
  computed: {
    years() {
      const years = {};
      const posts = this.$page.posts.edges;
      posts.map((post) => {
        const year = post.node.date.split(" ")[2];
        years[year] = "";
      });
      return Object.keys(years).sort((a, b) => {
        return b - a;
      });
    }
  }
}
</script>

<page-query>
query {
  posts: allBlogPost(filter: { date: { gte: "2020" }}) {
    totalCount
    edges {
      node {
        id
        title
        timeToRead
        description
        date (format: "D MMM YYYY")
        path
      }
    }
  }
}
</page-query>
