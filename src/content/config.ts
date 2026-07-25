import { defineCollection, z } from "astro:content"

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional().default(""),
		date: z.coerce.date(),
		lang: z.enum(["fa", "en"]).default("fa"),
		tags: z.array(z.string()).default([]),
		cover: z.string().optional(),
		draft: z.boolean().default(false),
	}),
})

const books = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional().default(""),
		year: z.string().optional().default(""),
		kind: z.string().optional().default(""),
		lang: z.enum(["fa", "en"]).default("fa"),
		cover: z.string().optional(),
		link: z.string().optional(),
		status: z.string().optional().default(""),
		draft: z.boolean().default(false),
	}),
})

export const collections = { blog, books }
