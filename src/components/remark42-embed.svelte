<svelte:head>
  <script async lang="javascript">
    var remark_config = {
      host: "https://remark.jakew.me",
      site_id: "jakew",
      components: ["embed"],
      show_rss_subsription: false,
      theme: (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light",
    };
    !(function (e, n) {
      for (var o = 0; o < e.length; o++) {
        var r = n.createElement("script"),
          c = ".js",
          d = n.head || n.body;
        "noModule" in r ? ((r.type = "module"), (c = ".mjs")) : (r.async = !0),
          (r.defer = !0),
          (r.src = remark_config.host + "/web/" + e[o] + c),
          d.appendChild(r);
      }
    })(remark_config.components || ["embed"], document);
  </script>
</svelte:head>

<div id="remark42"></div>
