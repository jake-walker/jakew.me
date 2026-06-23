import type { APIRoute } from "astro";
import { renderOGImage } from "../../lib/og";
import { pageOGImages } from "../../lib/og-pages";

export function getStaticPaths() {
  return Object.keys(pageOGImages).map((route) => ({
    params: { route: `${route}.png` }
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const routeName = params.route?.split(".")[0];

  if (routeName === undefined || pageOGImages[routeName] === undefined) {
    return new Response("Not found", { status: 404 });
  }

  return await renderOGImage(pageOGImages[routeName]);
}
