import settings from "../data/settings.json"
import type { Lang } from "../i18n/ui"

export type Article = {
	title: string
	link: string
	date: Date
	excerpt: string
	image: string
	categories: string[]
}

const FEED_TIMEOUT = 15000

let cached: Article[] | null = null

function unwrap(input: string) {
	return input.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
}

function decodeEntities(input: string) {
	return input
		.replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-fA-F]+);/g, (_match, code: string) => String.fromCodePoint(parseInt(code, 16)))
		.replace(/&nbsp;/g, " ")
		.replace(/&zwnj;/g, "\u200c")
		.replace(/&laquo;/g, "\u00ab")
		.replace(/&raquo;/g, "\u00bb")
		.replace(/&hellip;/g, "\u2026")
		.replace(/&mdash;/g, "\u2014")
		.replace(/&ndash;/g, "\u2013")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&#039;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&")
}

function readTag(block: string, name: string) {
	const pattern = new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">", "i")
	const match = block.match(pattern)
	return match ? unwrap(match[1]).trim() : ""
}

function readTags(block: string, name: string) {
	const pattern = new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">", "gi")
	const values: string[] = []
	let match = pattern.exec(block)
	while (match) {
		const value = decodeEntities(unwrap(match[1])).trim()
		if (value) values.push(value)
		match = pattern.exec(block)
	}
	return values
}

function readAttribute(block: string, name: string, attribute: string) {
	const pattern = new RegExp("<" + name + "[^>]*\\s" + attribute + "=[\"']([^\"']+)[\"']", "i")
	const match = block.match(pattern)
	return match ? decodeEntities(match[1]) : ""
}

function stripTags(input: string) {
	return decodeEntities(unwrap(input).replace(/<[^>]*>/g, " "))
		.replace(/\s+/g, " ")
		.trim()
}

function findImage(sources: string[]) {
	for (const source of sources) {
		if (!source) continue
		const match = unwrap(source).match(/<img[^>]*\ssrc=["']([^"']+)["']/i)
		if (match) return decodeEntities(match[1])
	}
	return ""
}

function shorten(input: string, max: number) {
	const text = stripTags(input)
	if (text.length <= max) return text
	return text.slice(0, max).replace(/\s+\S*$/, "") + "\u2026"
}

function parseFeed(xml: string): Article[] {
	const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || []
	return blocks
		.map((block) => {
			const content = readTag(block, "content:encoded")
			const description = readTag(block, "description")
			const raw = readTag(block, "pubDate") || readTag(block, "dc:date") || readTag(block, "updated")
			const parsed = raw ? new Date(raw) : new Date(Number.NaN)
			const image =
				readAttribute(block, "media:content", "url") ||
				readAttribute(block, "media:thumbnail", "url") ||
				readAttribute(block, "enclosure", "url") ||
				findImage([content, description])
			return {
				title: decodeEntities(readTag(block, "title")),
				link: decodeEntities(readTag(block, "link")) || readAttribute(block, "link", "href"),
				date: Number.isNaN(parsed.valueOf()) ? new Date() : parsed,
				excerpt: shorten(description || content, 220),
				image,
				categories: readTags(block, "category").slice(0, 3),
			}
		})
		.filter((article) => article.title !== "" && article.link !== "")
		.sort((a, b) => b.date.valueOf() - a.date.valueOf())
}

export async function getArticles(limit = 24): Promise<Article[]> {
	if (cached) return cached.slice(0, limit)
	const feed = String(settings.articlesFeed || "")
	if (!feed) return []
	const controller = new AbortController()
	const timer = setTimeout(() => controller.abort(), FEED_TIMEOUT)
	try {
		const response = await fetch(feed, {
			headers: {
				Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
				"User-Agent": "Mozilla/5.0 (compatible; PortfolioBuild/1.0)",
			},
			signal: controller.signal,
		})
		if (!response.ok) throw new Error("feed responded " + response.status)
		const articles = parseFeed(await response.text())
		cached = articles
		console.log("[articles] loaded " + articles.length + " items from feed")
		return articles.slice(0, limit)
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error)
		console.warn("[articles] feed unavailable, section will be empty: " + reason)
		return []
	} finally {
		clearTimeout(timer)
	}
}

export function articlesSource(lang: Lang) {
	return lang === "en" ? String(settings.articlesSiteEn || "") : String(settings.articlesSiteFa || "")
}
