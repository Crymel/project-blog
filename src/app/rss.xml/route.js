import rss from "rss";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE, BLOG_DESC } from "@/constants";

export async function GET(request) {
  try {
    const host = request.headers.get("host");
    const baseURL = `https://${host}`;
    const posts = await getBlogPostList();

    const feed = new rss({
      title: BLOG_TITLE,
      description: BLOG_DESC,
      feed_url: `${baseURL}/rss.xml`,
      site_url: baseURL,
      language: "en",
      pubDate: new Date(),
    });

    posts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.abstract,
        url: `${baseURL}/${post.slug}`,
        date: post.publishedOn,
      });
    });

    return new Response(feed.xml(), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
