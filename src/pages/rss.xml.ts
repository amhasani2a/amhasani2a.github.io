import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"

export const prerender = true

export async function GET(context: APIContext) {
	const entries = await getCollection("blog")
	const posts = entries
		.filter((entry) => (entry.data.lang ?? "fa") === "fa")
		.filter((entry) => entry.data.draft !== true)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

	const site = context.site ? context.site.toString() : "/"

	return rss({
		title: "امیرمحمد حسنی",
		description: "نوشته‌هایی دربارهٔ روایت، نشر و توسعهٔ نرم‌افزار",
		site,
		items: posts.map((post) => ({
			title: String(post.data.title ?? ""),
			description: String(post.data.description ?? ""),
			pubDate: post.data.date,
			link: "/blog/" + post.slug.replace(/^(fa|en)\//, "") + "/",
		})),
		customData: "<language>fa-IR</language>",
	})
}
