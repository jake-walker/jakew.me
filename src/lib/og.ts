import { DateTime } from "luxon";
import { satoriAstroOG } from "satori-astro";
import { html } from "satori-html";

const escapeHtml = (str: string) => str
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

async function loadFont(url: string): Promise<ArrayBuffer> {
  const fontFile = await fetch(url);
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();
  return fontData;
}

export interface OGImageInfo {
  title: string;
  featureImage?: string | null;
  publishedAt?: string | null;
  readingTime?: number;
  showAuthor?: boolean;
}

export async function renderOGImage(info: OGImageInfo) {
  const publishedDate = info.publishedAt == null
    ? null
    : DateTime.fromISO(info.publishedAt).setLocale("en-GB").toLocaleString(DateTime.DATE_MED);
  const meta = [
    info.showAuthor === true ? "Jake Walker" : null,
    publishedDate,
    info.readingTime == null ? null : `${info.readingTime} min read`
  ].filter((item) => item != null).join(" · ");
  const featureImageSrc = info.featureImage?.match(/\.(jpe?g|png)(\?.*)?$/i) ? info.featureImage : null;
  const featureImage = featureImageSrc == null ? "" : `
    <img style="
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    " src="${escapeHtml(featureImageSrc)}"/>
  `;
  const gradient = featureImageSrc == null
    ? "linear-gradient(90deg, rgb(140, 20, 255), rgb(171, 115, 255))"
    : "linear-gradient(90deg, rgba(140, 20, 255, 1.0), rgba(171, 115, 255, 0.7))";
  const template = `
    <div style="
      position: relative;
      overflow: hidden;
      background: rgb(140, 20, 255);
      display: flex; flex-direction: column; justify-items: center; align-items: flex-start;
      font-family: 'Gabarito Regular'; height: 100%;
      color: white;
      padding: 4em;
    ">
      ${featureImage}
      <div style="
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: ${gradient};
      "></div>
      <img style="position: relative; width: 164px; height: 164px; background: #ddcdff; border-radius: 999px; margin-left: auto;" src="https://ipfs.io/ipfs/bafkreiaefpkbox44yc6dzdg4mle24shc6u2cdlyuaegvl3n65vaudmsqfi"/>
      <div style="position: relative; flex: 1; display: flex;"></div>
      <h1 style="position: relative; margin: 0; line-height: 1.05; font-family: 'Gabarito Medium'; font-size: ${meta === "" ? "8em" : "5.2em"};">${info.title}</h1>
      <p style="position: relative; margin: 0.6em 0 0; font-size: 1.8em; color: rgba(255, 255, 255, 0.82); ${meta === "" ? "display: none;" : ""}">${meta}</p>
    </div>
  `;

  return await satoriAstroOG({
    template: html(template),
    width: 1200,
    height: 630
  }).toResponse({
    satori: {
      fonts: [
        {
          name: "Gabarito Regular",
          data: await loadFont("https://cdn.jsdelivr.net/gh/naipefoundry/gabarito/fonts/ttf/Gabarito-Regular.ttf"),
          style: "normal"
        },
        {
          name: "Gabarito Medium",
          data: await loadFont("https://cdn.jsdelivr.net/gh/naipefoundry/gabarito/fonts/ttf/Gabarito-Medium.ttf"),
          style: "normal"
        }
      ]
    }
  });
}
