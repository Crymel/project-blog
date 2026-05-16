import React from "react";
import dynamic from "next/dynamic";

import styles from "./postSlug.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

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
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

const customComponents = {
  pre: (props) => CodeSnippet(props),
  DivisionGroupsDemo,
  CircularColorsDemo,
};

import { loadBlogPost } from "@/helpers/file-helpers";
async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={new Date(frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ ...customComponents }} />
      </div>
    </article>
  );
}

export default BlogPost;
