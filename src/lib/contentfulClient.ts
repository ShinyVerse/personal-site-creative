import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  // Explicitly set host to use absolute URL and avoid url.parse() deprecation
  host: process.env.CONTENTFUL_HOST || "cdn.contentful.com",
});
