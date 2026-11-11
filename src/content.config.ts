import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  work: defineCollection({
    // Load Markdown and MDX files in the src/content/work directory.
    loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
    schema: ({ image }) => z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: image(),
      img_dark: image().optional(),
      img_fit: z.enum(["cover", "contain"]).default("cover"),
      img_alt: z.string().optional(),
    }),
  }),
  blog: defineCollection({
    // Load Markdown and MDX files in the src/content/blog directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    schema: ({ image }) => z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: image(),
      img_dark: image().optional(),
      img_fit: z.enum(["cover", "contain"]).default("cover"),
      img_alt: z.string().optional(),
    }),
  }),
};
