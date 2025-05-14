import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { satoriAstroOG } from "satori-astro";
import truncate from "truncate";
import { html } from "satori-html";
import fs from "node:fs/promises";
import path from "node:path";

const posts = await getCollection('ghostPosts');

const items: {
  [route: string]: { title: string, description?: string }
} = {
  ...Object.fromEntries(posts.map((p) => [p.data.slug, {
    title: p.data.title,
    description: p.data.excerpt
  }])),
  main: {
    title: 'Jake Walker'
  }
}

async function loadFont(url: string): Promise<ArrayBuffer> {
  const fontFile = await fetch(url);
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();
  return fontData;
}

async function loadImage(path: string) {
  const data = await fs.readFile(path, { encoding: "utf8" });
  const b64Image = Buffer.from(data).toString("base64");
  const ext = path.split(".").pop();
  const uri = `data:image/${ext};base64,${b64Image}`;
  return uri;
}

export function getStaticPaths() {
  return Object.keys(items).map((x) => (
    {
      params: { route: `${x}.png` }
    }
  ));
}

export const GET: APIRoute = async ({ params, request }) => {
  let routeName = params.route;

  if (routeName === undefined) {
    return new Response("Not found", { status: 404 });
  }

  routeName = routeName.split(".")[0];

  const info = items[routeName];

  return await satoriAstroOG({
    template: html`
      <div style="
        background: linear-gradient(90deg, rgb(140, 20, 255), rgb(171, 115, 255));
        display: flex; flex-direction: column; justify-items: center; align-items: flex-start;
        font-family: 'Inter Regular'; height: 100%;
        color: white;
        padding: 4em;
      ">
        <img style="width: 164px; height: 164px; background: white; border-radius: 999px; margin-left: auto;" src="https://gateway.pinata.cloud/ipfs/bafkreiaefpkbox44yc6dzdg4mle24shc6u2cdlyuaegvl3n65vaudmsqfi"/>
        <div style="flex: 1; display: flex;"></div>
        <h1 style="font-family: 'Inter Medium'; font-size: ${routeName === 'main' ? '8em' : '5em'};">${info.title}</h1>
        <p style="font-size: 3em; ${info.description == null ? 'display: none;' : ''}">${info.description != null ? info.description : ''}</p>
      </div>
    `,
    width: 1200,
    height: 630
  }).toResponse({
    satori: {
      fonts: [
        {
          name: "Inter Regular",
          data: await loadFont("https://cdn.jsdelivr.net/gh/cygnus-rom/external_inter-fonts/Inter-Regular.ttf"),
          style: "normal"
        },
        {
          name: "Inter Medium",
          data: await loadFont("https://cdn.jsdelivr.net/gh/cygnus-rom/external_inter-fonts/Inter-Medium.ttf"),
          style: "normal"
        }
      ]
    }
  });
}

// export const { getStaticPaths, GET } = OGImageRoute({
//   param: 'route',
//   pages: ,
//   getImageOptions: (path, page) => ({
//     title: page.title,
//     description: truncate(page.description, 100),
//     logo: {
//       path: './src/assets/memojiWhite.png',
//       size: [164]
//     },
//     bgGradient: [[140, 20, 255], [171, 115, 255]],
//     font: {
//       title: {
//         families: ['Inter'],
//         weight: 'Medium'
//       },
//       description: {
//         families: ['Inter'],
//         weight: 'Normal'
//       }
//     },
//     fonts: [
//       'https://cdn.jsdelivr.net/gh/cygnus-rom/external_inter-fonts/Inter-Regular.ttf',
//       'https://cdn.jsdelivr.net/gh/cygnus-rom/external_inter-fonts/Inter-Medium.ttf'
//     ]
//   })
// });

