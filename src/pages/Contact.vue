<template>
  <Layout>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Contact</h1>

        <form name="contact" method="post" v-on:submit.prevent="handleSubmit" action="/success/" data-netlify="true">
          <b-field label="Name">
            <b-input id="name" name="name" type="text" placeholder="Your name" v-model="formData.name" required />
          </b-field>

          <b-field label="Email">
            <b-input id="email" name="email" type="email" placeholder="Your email" v-model="formData.email" required />
          </b-field>

          <b-field label="Message">
            <b-input id="message" name="message" type="textarea" placeholder="Your message" rows="5" v-model="formData.message" required />
          </b-field>

          <input type="hidden" name="form-name" value="contact"/>

          <b-field>
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </b-field>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="title is-2">Socials</h2>

        <div class="buttons">
          <a class="button is-link" rel="nofollow noopener noreferrer" target="_blank" v-for="link in links" :key="link.name" :href="link.link">{{ link.name }}</a>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact'
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData
        }),
      }).then(() => alert("Your message was sent!")).catch(error => alert(error));
    }
  },
  data: () => ({
    formData: {},
    links: [
      {
        name: "Email",
        link: "mailto:hi@jakew.me"
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/jake-walker1/"
      },
      {
        name: "GitHub",
        link: "https://github.com/jake-walker"
      },
      {
        name: "GitLab",
        link: "https://gitlab.com/_jakew"
      },
      {
        name: "Twitter",
        link: "https://twitter.com/_jakewalker1"
      },
      {
        name: "Keybase",
        link: "https://keybase.io/jakew"
      },
      {
        name: "NPM",
        link: "https://www.npmjs.com/~jakew"
      },
      {
        name: "PyPI",
        link: "https://pypi.org/user/jakew1"
      },
      {
        name: "asciinema",
        link: "https://asciinema.org/~jakew"
      }
    ]
  })
}
</script>
