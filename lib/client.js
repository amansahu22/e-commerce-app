import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "pznb8o5t",
  dataset: "production",
  apiVersion: "2022-04-23",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
});

const builder = imageUrlBuilder(client);
//with this sanity give us url of the images where they have stored

const urlFor = (source) => builder.image(source);

export { client, urlFor };
