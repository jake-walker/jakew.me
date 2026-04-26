import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://shop.jakew.me/graphql/", {
  headers: {
    "Authorization": `Basic ${btoa(import.meta.env.SHOP_APPLICATION_PASSWORD ?? "")}`
  }
});
