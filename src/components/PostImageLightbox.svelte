<script lang="ts">
  import { onMount } from "svelte";

  const imageSelector =
    ".blog-post-content .kg-image-card > img, .blog-post-content .kg-gallery-image img, .blog-post-content p > img";

  let open = false;
  let src = "";
  let alt = "";

  const close = () => {
    open = false;
    src = "";
    alt = "";
  };

  const showImage = (image: HTMLImageElement) => {
    src = image.currentSrc || image.src;
    alt = image.alt;
    open = true;
  };

  onMount(() => {
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(imageSelector),
    ).filter((image) => !image.closest(".kg-bookmark-card"));

    const cleanups = images.map((image) => {
      const onClick = () => showImage(image);
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        showImage(image);
      };

      image.dataset.lightboxImage = "true";
      image.tabIndex = 0;
      image.role = "button";
      image.addEventListener("click", onClick);
      image.addEventListener("keydown", onKeyDown);

      return () => {
        delete image.dataset.lightboxImage;
        image.removeAttribute("tabindex");
        image.removeAttribute("role");
        image.removeEventListener("click", onClick);
        image.removeEventListener("keydown", onKeyDown);
      };
    });

    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  });
</script>

{#if open}
  <button class="lightbox-backdrop" type="button" aria-label="Close image" on:click={close}>
    <img class="lightbox-image" {src} {alt} />
  </button>
{/if}

<style>
  .lightbox-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 0;
    background: rgb(0 0 0 / 0.88);
    cursor: zoom-out;
  }

  .lightbox-image {
    max-width: min(100%, 90rem);
    max-height: 92vh;
    border-radius: 0.5rem;
    object-fit: contain;
  }
</style>
