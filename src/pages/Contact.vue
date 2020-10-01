<template>
  <Layout>
    <div class="container mx-auto py-5">
      <h2 class="text-3xl mb-4">Profiles</h2>

      <a rel="nofollow noopener noreferrer" target="_blank" v-for="link in links" :key="link.name" :href="link.link" class="mr-3 inline-block bg-primary hover:bg-transparent text-white hover:text-primary border border-primary hover:border-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">{{ link.name }}</a>

      <h2 class="text-3xl mb-4">Contact Form</h2>
      <form name="contact" method="post" v-on:submit.prevent="handleSubmit" action="/success/" data-netlify="true" class="mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Name
          </label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:text-white" id="name" name="name" type="text" placeholder="Your name" v-model="formData.name" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Email
          </label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:text-white" id="email" name="email" type="email" placeholder="Your email" v-model="formData.email" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Message
          </label>
          <textarea class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:text-white" id="message" name="message" placeholder="Your message" rows="5" v-model="formData.message" required/>
        </div>
        <input type="hidden" name="form-name" value="contact"/>
        <div>
          <button class="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary hover:border-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
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
