import type { OGImageInfo } from "./og";

export const pageOGImages: Record<string, OGImageInfo> = {
  main: {
    title: "Jake Walker"
  },
  about: {
    title: "About",
    showAuthor: true
  },
  projects: {
    title: "Projects",
    showAuthor: true
  },
  shop: {
    title: "Shop",
    showAuthor: true
  }
};

export const getPageOGImagePath = (title?: string) => {
  if (title === undefined) {
    return "/og/main.png";
  }

  const route = title.toLowerCase().replaceAll(" ", "-");

  if (pageOGImages[route] === undefined) {
    return "/og/main.png";
  }

  return `/og/${route}.png`;
};
