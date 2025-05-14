import { visit } from "unist-util-visit";
import type { Properties, Root } from 'hast';
import { VFile } from "vfile";
import type { AstroConfig } from "astro";
import { isRemoteAllowed } from "astro/assets/utils";

export function rehypeAnchorRewrite() {
  return function (tree: Root) {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' && typeof node.properties.href !== "string") return;

      const href = URL.parse(node.properties.href as string);

      if (href === null) return;

      href.searchParams.delete("ref");
      href.searchParams.set("ref", "jakew.me")

      node.properties.href = href.toString();
    });
  }
}

export function rehypeGhostVideoCard() {
  return function (tree: Root) {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'figure' || typeof node.properties.className !== 'object' || !node.properties.className?.includes('kg-video-card')) return;

      const container = node.children.find((n) => n.type === 'element' && n.tagName === 'div' && typeof n.properties.className === 'object' && n.properties.className?.includes('kg-video-container'));

      if (container === undefined || container.type !== 'element') {
        return;
      }

      const video = container.children.find((n) => n.type === 'element' && n.tagName === 'video');

      if (video === undefined || video.type !== 'element') {
        return;
      }

      const videoSrc = video.properties.src;

      node.tagName = 'video';
      node.properties = {
        src: videoSrc,
        controls: true,
      };
      node.children = [];
    });
  }
}


// Source: Astro - rehype-images.ts (https://vh7.uk/view/QwSU)
export function rehypeImages() {
  return function (tree: Root, file: VFile) {
    if (!file.data.astro?.localImagePaths?.length && !file.data?.astro?.remoteImagePaths?.length) {
      return;
    }

    const imageOccuranceMap = new Map();

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      if (typeof node.properties?.src !== 'string') return;

      const src = decodeURI(node.properties.src);
      let newProperties: Properties;

      if (file.data.astro?.localImagePaths?.includes(src)) {
        newProperties = { ...node.properties, src };
      } else if (file.data.astro?.remoteImagePaths?.includes(src)) {
        newProperties = {
          inferSize: 'width' in node.properties && 'height' in node.properties ? undefined : true,
          ...node.properties,
          src,
        };
      } else {
        return;
      }

      delete newProperties["srcset"];
      delete newProperties["sizes"];

      const index = imageOccuranceMap.get(node.properties.src) || 0;
      imageOccuranceMap.set(node.properties.src, index + 1);

      node.properties = { __ASTRO_IMAGE_: JSON.stringify({ ...newProperties, index }) };
    });
  }
}

// Based on: Astro - remark-collect-images.ts (https://vh7.uk/view/kWxY)
export function rehypeCollectImages(opts?: AstroConfig['image']) {
  const domains = opts?.domains ?? [];
  const remotePatterns = opts?.remotePatterns ?? [];

  return function (tree: Root, vfile: VFile) {
    const localImagePaths = new Set<string>();
    const remoteImagePaths = new Set<string>();

    visit(tree, 'element', (node) => {
      let url: string | undefined;
      if (node.tagName === 'img') {
        url = decodeURI(node.properties.src as string);
      }

      if (!url) return;

      if (URL.canParse(url)) {
        if (isRemoteAllowed(url, { domains, remotePatterns })) {
          remoteImagePaths.add(url);
        }
      } else if (!url.startsWith('/')) {
        localImagePaths.add(url);
      }
    });

    vfile.data.astro ??= {};
    vfile.data.astro.localImagePaths = Array.from(localImagePaths);
    vfile.data.astro.remoteImagePaths = Array.from(remoteImagePaths);
  }
}
