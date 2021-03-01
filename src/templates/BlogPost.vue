<template>
  <Layout>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <p class="title" v-text="$page.post.title" />
          <p class="subtitle">
            {{ $page.post.date }} &bull; {{ $page.post.timeToRead }} min read
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container is-max-desktop">
        <article id="article-content" class="content" v-html="$page.post.content"/>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
   post: blogPost (path: $path) {
    title
    content
    date (format: "D MMMM YYYY")
    timeToRead
  }
}
</page-query>

<style>
  img {
    display: block;
    margin: 0 auto;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }

  .gridsome-highlight {
    border-radius: 4px;
    font-size: 1rem;
  }

  #article-content {
    font-size: 1.2rem;
  }

  pre code [class~=token] {
    font: inherit;
    background: inherit;
    margin: 0;
    padding: 0;
    min-width: auto;
    height: auto;
  }

  code {
    word-break: break-word !important;
  }
</style>
