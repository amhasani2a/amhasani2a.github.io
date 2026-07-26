import { getCollection, type CollectionEntry } from "astro:content"
import type { Lang } from "../i18n/ui"

const isProd = import.meta.env.PROD

export function readingMinutes(body: string) {
	const words = body.trim().split(/\s+/).length
	return Math.max(1, Math.round(words / 200))
}

/** slug in the repo is "fa/my-post" — strip the language folder */
export function cleanSlug(slug: string) {
	return slug.replace(/^(fa|en)\//, "")
}

export async function getPosts(lang: Lang): Promise<CollectionEntry<"blog">[]> {
	const all = await getCollection("blog")
	return all
		.filter((entry) => (entry.data.lang ?? "fa") === lang)
		.filter((entry) => !(isProd && entry.data.draft))
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

