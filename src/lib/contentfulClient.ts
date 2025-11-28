import { createClient } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_KEY;

if (!spaceId || !accessToken) {
  throw new Error(
    "Missing required Contentful environment variables: CONTENTFUL_SPACE_ID and/or CONTENTFUL_ACCESS_KEY",
  );
}

export const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  // Explicitly set host to use absolute URL and avoid url.parse() deprecation
  host: process.env.CONTENTFUL_HOST || "cdn.contentful.com",
});
