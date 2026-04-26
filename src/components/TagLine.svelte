<script lang="ts">
  const taglines = [
    "Coder, maker, and builder of things",
    "I code things, I build things, I write about both",
    "Making things with code and occasionally solder",
    "Code, hardware, and whatever else catches my eye"
  ];

  const tagline = taglines[Math.floor(Math.random() * taglines.length)];
</script>

<p class="text-xl">{tagline}</p>
