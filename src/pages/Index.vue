<template>
  <HomeLayout>
    <section class="section">
      <div class="container">
        <p class="is-size-5 mb-3">
          Hi! I'm Jake Walker, a tech enthusiast and developer living in the United Kingdom.
        </p>

        <p class="mb-3">
          At the moment, I enjoy web development (including frontend and backend) and Python
          development and I am trying to get more into open source software.
          I also enjoy managing a handful of cloud hosted applications a Raspberry Pi home server and
          other small Arduino/Raspberry Pi projects at home.
          I am currently learning about cyber security.
        </p>

        <p class="mb-3">
          When I was around 7 years old, I started programming, starting off with
          the <a rel="nofollow noopener noreferrer" target="_blank" href="http://smallbasic.com/">Small Basic</a> programming
          language. Ever since I have been refining my programming skills by
          learning more complex languages and by creating small applications,
          websites and more. In 2015, I started
          <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/jake-walker">my GitHub account</a> and
          began to contribute to open source software and published some of my
          own projects.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">Latest Posts</h1>

        <div class="columns is-multiline">
          <div class="column is-half-tablet is-one-third-desktop" v-for="post in $page.posts.edges" :key="post.node.id">
            <PostCard :post="post.node" />
          </div>
        </div>
      </div>
    </section>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/layouts/Home";
import PostCard from "@/components/PostCard";

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    HomeLayout,
    PostCard
  }
}
</script>

<page-query>
query {
  posts: allBlogPost(limit: 3) {
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
