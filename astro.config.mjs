import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"

// ⚠️ اگر ریپو را «amhasani2a.github.io» بسازی، base همین "/" می‌ماند.
// اگر اسم ریپو چیز دیگری است (مثلاً "site")، base را به "/site/" تغییر بده.
export default defineConfig({
	site: "https://jobinhasani.ir",
	base: "/",
	trailingSlash: "ignore",
	integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
	i18n: {
		defaultLocale: "fa",
		locales: ["fa", "en"],
		routing: { prefixDefaultLocale: false },
	},
	markdown: {
		shikiConfig: { theme: "github-dark", wrap: true },
	},
})
