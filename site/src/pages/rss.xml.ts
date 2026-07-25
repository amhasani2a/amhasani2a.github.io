import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getPosts } from "../lib/content"
import profile from "../data/profile.fa.json"

export async function GET(context: APIContext) {
	const posts = await getPosts("fa")
	return rss({
		title: profile.name,
		description: profile.tagline,
		site: context.site ?? "/",
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/blog/${post.slug}/`,
		})),
		customData: `<language>fa-IR</language>`,
	})
}
