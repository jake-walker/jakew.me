<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>{{ $static.metadata.siteName }}</strong>.
        The <a href="https://www.github.com/jake-walker/jakew.me">source code</a> is licensed
        <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL v3.0</a> and website content
        is licensed <a href="http://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>.
      </p>
    </div>
  </footer>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
