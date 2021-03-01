<template>
  <div class="card">
    <div class="card-image" v-if="post.feature">
      <figure class="image">
        <g-image :src="post.feature.image.src" alt="Placeholder image"/>
      </figure>
    </div>

    <div class="card-content">
      <p class="title is-4">{{ post.title }}</p>

      <div class="content" v-html="post.description || (post.excerpt + '...')"/>

      <div class="has-text-right is-size-7">
        Posted {{ post.date }}
        &bull;
        {{ post.timeToRead }} min read
      </div>
    </div>

    <footer class="card-footer">
      <g-link :to="post.path" class="card-footer-item">Read</g-link>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["post"]
}
</script>
