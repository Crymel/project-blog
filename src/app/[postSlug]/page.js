import React from "react";
import dynamic from "next/dynamic";

import styles from "./postSlug.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "@/helpers/file-helpers";

import BlogHero from "@/components/BlogHero";

const CodeSnippet = dynamic(() =>
  import("@/components/CodeSnippet/CodeSnippet")
);
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: `${frontmatter?.title} • ${BLOG_TITLE}`,
    description: frontmatter?.abstract,
  };
}

const customComponents = {
  pre: (props) => CodeSnippet(props),
  DivisionGroupsDemo,
  CircularColorsDemo,
};

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const post = await loadBlogPost(postSlug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={new Date(post.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={{ ...customComponents }} />
      </div>
    </article>
  );
}

export default BlogPost;
