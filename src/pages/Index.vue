<template>
  <Layout>
    <div class="container mx-auto py-5">
      <p class="text-lg mb-4">
        Hi! I'm Jake Walker, a Developer and Tech Enthusiast living in the United Kingdom.
      </p>
      <p>
        When I was around 7 years old, I started programming, starting off with
        the <a class="no-underline hover:underline text-primary" href="http://smallbasic.com/">Small Basic</a> programming
        language. Ever since I have been refining my programming skills by
        learning more complex languages and by creating small applications,
        websites and more. In 2015, I started
        <a class="no-underline hover:underline text-primary" href="https://github.com/jake-walker">my GitHub account</a> and
        began to contribute to open source software and published some of my
        own projects.
      </p>
    </div>

    <div class="container mx-auto py-5">
      <h2 class="text-2xl">Latest Posts</h2>
      <ul class="list-disc list-inside">
        <li v-for="post in $page.posts.edges" :key="post.node.id">
          <g-link :to="post.node.path" class="no-underline hover:underline text-primary">{{ post.node.title }}</g-link>
          <span class="ml-2 text-xs text-gray-600">({{ post.node.date }}, {{ post.node.timeToRead }} min read)</span>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import PostList from "@/components/PostList";

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    PostList
  }
}
</script>

<page-query>
query {
  posts: allBlogPost(filter: { date: { gte: "2020" }}, limit: 5) {
    edges {
      node {
        id
        title
        timeToRead
        date (format: "D MMM YYYY")
        path
      }
    }
  }
}
</page-query>
