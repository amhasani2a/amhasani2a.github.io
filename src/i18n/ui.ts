export type Lang = "fa" | "en"

export const languages: Record<Lang, string> = {
	fa: "فارسی",
	en: "English",
}

export const ui = {
	fa: {
		dir: "rtl",
		"nav.home": "خانه",
		"nav.about": "درباره",
		"nav.resume": "رزومه",
		"nav.projects": "نمونه‌کار",
		"nav.blog": "وبلاگ",
		"nav.articles": "مقاله‌ها",
		"nav.contact": "تماس",
		"cta.readMore": "ادامه",
		"cta.viewAll": "مشاهده همه",
		"cta.loadMore": "نمایش بیشتر",
		"section.about": "درباره من",
		"section.skills": "مهارت‌ها",
		"section.resume": "تجربه کاری",
		"section.projects": "پروژه‌های گیت‌هاب",
		"section.blog": "تازه‌ترین نوشته‌ها",
		"section.articles": "مقاله‌های من",
		"section.contact": "تماس و خبرنامه",
		"projects.subtitle": "مستقیم از گیت‌هاب خوانده می‌شود",
		"projects.featured": "پروژه‌ی شاخص",
		"projects.error": "فعلاً امکان دریافت مخازن نیست. پروفایل گیت‌هاب را ببینید.",
		"projects.stars": "ستاره",
		"projects.updated": "آخرین به‌روزرسانی",
		"blog.empty": "هنوز نوشته‌ای منتشر نشده.",
		"blog.min": "دقیقه مطالعه",
		"articles.subtitle": "مستقیم از فید نویسندگی من خوانده می‌شود",
		"articles.empty": "فعلاً مقاله‌ای برای نمایش نیست.",
		"articles.source": "منتشرشده در",
		"newsletter.placeholder": "ایمیل شما",
		"newsletter.button": "عضویت",
		"footer.rights": "تمام حقوق محفوظ است.",
		"back": "بازگشت",
		"404.title": "صفحه پیدا نشد",
		"404.text": "آدرسی که دنبالش بودید وجود ندارد.",
		"theme": "تغییر تم",
	},
	en: {
		dir: "ltr",
		"nav.home": "Home",
		"nav.about": "About",
		"nav.resume": "Resume",
		"nav.projects": "Projects",
		"nav.blog": "Blog",
		"nav.articles": "Articles",
		"nav.contact": "Contact",
		"cta.readMore": "Read more",
		"cta.viewAll": "View all",
		"cta.loadMore": "Load more",
		"section.about": "About me",
		"section.skills": "Skills",
		"section.resume": "Experience",
		"section.projects": "GitHub projects",
		"section.blog": "Latest writing",
		"section.articles": "My articles",
		"section.contact": "Contact & newsletter",
		"projects.subtitle": "Fetched live from GitHub",
		"projects.featured": "Featured project",
		"projects.error": "Could not load repositories right now. Visit the GitHub profile.",
		"projects.stars": "stars",
		"projects.updated": "Updated",
		"blog.empty": "No posts published yet.",
		"blog.min": "min read",
		"articles.subtitle": "Pulled straight from my author feed",
		"articles.empty": "No articles to show right now.",
		"articles.source": "Published on",
		"newsletter.placeholder": "Your email",
		"newsletter.button": "Subscribe",
		"footer.rights": "All rights reserved.",
		"back": "Back",
		"404.title": "Page not found",
		"404.text": "The page you were looking for does not exist.",
		"theme": "Toggle theme",
	},
} as const

export function t(lang: Lang) {
	return (key: keyof (typeof ui)["fa"]) => ui[lang][key] ?? ui.fa[key]
}

/** Locale-aware path helper: fa -> /blog , en -> /en/blog */
export function localePath(lang: Lang, path = "/") {
	const clean = "/" + String(path).replace(/^\/+/, "")
	const withLang = lang === "en" ? "/en" + (clean === "/" ? "" : clean) : clean
	const base = import.meta.env.BASE_URL.replace(/\/$/, "")
	return (base + (withLang || "/")) || "/"
}

export function formatDate(date: Date, lang: Lang) {
	return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date)
}
