import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Vazirmatn", "Inter", "system-ui", "sans-serif"],
				display: ["Fraunces", "Vazirmatn", "Georgia", "serif"],
				mono: ["JetBrains Mono", "Menlo", "Consolas", "monospace"],
			},
			colors: {
				canvas: "rgb(var(--c-canvas) / <alpha-value>)",
				surface: "rgb(var(--c-surface) / <alpha-value>)",
				raised: "rgb(var(--c-raised) / <alpha-value>)",
				line: "rgb(var(--c-border) / <alpha-value>)",
				ink: "rgb(var(--c-text) / <alpha-value>)",
				muted: "rgb(var(--c-muted) / <alpha-value>)",
				accent: "rgb(var(--c-accent) / <alpha-value>)",
				sage: "rgb(var(--c-accent-2) / <alpha-value>)",
			},
			maxWidth: { content: "1180px", prose: "720px" },
			borderRadius: { xl: "14px" },
		},
	},
	plugins: [typography],
}
