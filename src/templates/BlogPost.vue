<template>
  <Layout>
    <div class="bg-gray-200">
      <div class="container mx-auto py-8">
        <h1 id="article-title" class="font-semibold tracking-tighter">{{ $page.post.title }}</h1>
        <p class="text-gray-600 font-light">
          <span id="article-date">{{ $page.post.date }}</span> &bull;
          <span id="article-read-time">{{ $page.post.timeToRead }} min read</span>
        </p>
      </div>
    </div>
    <div class="container mx-auto py-5">
      <article id="article-content" class="prose prose-lg lg:prose-xl mx-auto" v-html="$page.post.content"/>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  metadata {
    siteName
    siteDescription
  }
   post: blogPost (path: $path) {
    id
    title
    content
    date (format: "D MMMM YYYY")
    timeToRead
  }
}
</page-query>
