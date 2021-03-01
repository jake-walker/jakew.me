<template>
  <Layout>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Blog</h1>

        <div class="columns is-multiline">
          <div class="column is-half-tablet is-one-third-desktop" v-for="post in $page.posts.edges" :key="post.node.id">
            <PostCard :post="post.node" />
          </div>
        </div>

        <nav class="pagination is-centered" role="navigation">
          <g-link :class="{ 'pagination-previous': true, 'is-disabled': !hasPrevious }" :to="prevLink">Previous</g-link>
          <g-link :class="{ 'pagination-next': true, 'is-disabled': !hasNext }" :to="nextLink">Next</g-link>
          <ul class="pagination-list">
            <li v-if="$page.posts.pageInfo.currentPage > 1">
              <g-link :to="firstLink" class="pagination-link">1</g-link>
            </li>
            <li v-if="hasLeft">
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-if="hasLeft">
              <g-link :to="prevLink" class="pagination-link">{{ prevNum }}</g-link>
            </li>
            <li>
              <g-link class="pagination-link is-current">{{ $page.posts.pageInfo.currentPage }}</g-link>
            </li>
            <li v-if="hasRight">
              <g-link :to="nextLink" class="pagination-link">{{ nextNum }}</g-link>
            </li>
            <li v-if="hasRight">
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-if="$page.posts.pageInfo.currentPage < $page.posts.pageInfo.totalPages">
              <g-link :to="lastLink" class="pagination-link">{{ $page.posts.pageInfo.totalPages }}</g-link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </Layout>
</template>

<script>
import PostCard from '@/components/PostCard';

export default {
  components: {
    PostCard
  },
  metaInfo: {
    title: 'Blog'
  },
  computed: {
    prevLink() {
      let i = this.$page.posts.pageInfo.currentPage - 1;
      if (i <= 0) { return; }
      if (i == 1) { i = ''; }
      return '/blog/' + i;
    },
    nextLink() {
      let i = this.$page.posts.pageInfo.currentPage + 1;
      if (i > this.$page.posts.pageInfo.totalPages) { return; }
      return '/blog/' + i;
    },
    firstLink() {
      return '/blog/';
    },
    lastLink() {
      return '/blog/' + this.$page.posts.pageInfo.totalPages;
    },
    hasPrevious() {
      return this.$page.posts.pageInfo.currentPage > 1;
    },
    hasNext() {
      return this.$page.posts.pageInfo.currentPage < this.$page.posts.pageInfo.totalPages;
    },
    hasLeft() {
      return this.$page.posts.pageInfo.currentPage > 2;
    },
    hasRight() {
      return this.$page.posts.pageInfo.currentPage < this.$page.posts.pageInfo.totalPages - 1;
    },
    prevNum() {
      return this.$page.posts.pageInfo.currentPage - 1;
    },
    nextNum() {
      return this.$page.posts.pageInfo.currentPage + 1;
    }
  }
}
</script>

<page-query>
query ($page: Int) {
  posts: allBlogPost(perPage: 9, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        description
        excerpt
        timeToRead
        date (format: "D MMM YYYY")
        path
        feature {
          image (fit: cover, width: 1280, height: 960)
        }
      }
    }
  }
}
</page-query>
