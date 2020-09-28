<template>
  <div class="post-item py-1 flex">
    <div class="w-2/12 text-secondary">
      {{ date }}
    </div>
    <div class="flex-1 font-semibold hover:underline">
      <g-link :to="post.path">
        {{ post.title }}
      </g-link>
    </div>
    <div class="w-2/12 font-light italic text-sm text-gray-600 text-right">
      {{ post.timeToRead }} min read
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  computed: {
    date() {
      return this.post.date.substring(0, this.post.date.length - 4);
    }
  }
};
</script>
