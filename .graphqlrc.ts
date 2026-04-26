import dotenv from "dotenv";
dotenv.config();

export default {
  schema: "https://shop.jakew.me/graphql/",
  documents: ["src/**/*.{astro,ts,tsx}"],
  headers: {
    Authorization: `Basic ${btoa(process.env.SHOP_APPLICATION_PASSWORD!)}`
  }
}
