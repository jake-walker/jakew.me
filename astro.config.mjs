// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import og from "astro-og";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jakew.me",
  output: "static",

  image: {
    domains: ["ghost.jakew.me", "jakew.me"],
    remotePatterns: [{ protocol: "https" }],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
    },
  },

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  redirects: {
    "/2014/10/26/raspberry-pi-pvr": "/raspberry-pi-pvr",
    "/2015/04/10/arduino-weather-logger": "/arduino-weather-logger",
    "/2015/10/04/hacking-the-5th-generation-kindle-fire":
      "/hacking-the-5th-generation-kindle-fire",
    "/2015/12/27/kindle-5g-custom-rom": "/kindle-5g-custom-rom",
    "/2016/02/29/pi-zero-impressions": "/pi-zero-impressions",
    "/2016/07/24/electron-introduction": "/electron-introduction",
    "/2018/01/19/st7735-pi": "/st7735-pi",
    "/2019/11/23/drone": "/drone",
    "/2020/02/28/wannacry-vm": "/wannacry-vm",
    "/2020/04/16/setting-up-a-raspberry-pi-headless":
      "/setting-up-a-raspberry-pi-headless",
    "/2020/10/19/wireguard-docker": "/wireguard-docker",
    "/2021/06/01/elecrow-5inch-balena": "/elecrow-5inch-balena",
    "/2021/08/14/zigbee-homeassistant": "/zigbee-homeassistant",
    "/2021/12/28/starship": "/starship",
    "/blog/cloudflare-workers": "/cloudflare-workers",
    "/contact": "/about/#contact",
    "/rss.xml": "/rss",
  },

  integrations: [icon(), mdx(), og(), sitemap()],

  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),
});
