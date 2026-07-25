# سایت شخصی و وبلاگ — Astro + Tailwind + Sveltia CMS

سایت دوزبانه (فارسی RTL / انگلیسی LTR) با تم دارک/لایت، لیزی‌لودینگ، وبلاگ، رزومه، آثار ادبی، نمایش خودکار پروژه‌های گیت‌هاب و پنل مدیریت گرافیکی.

---

## ۱) راه‌اندازی سریع (محلی)

```bash
npm install
npm run dev       # http://localhost:4321
```

ساخت خروجی نهایی:

```bash
npm run build     # خروجی در پوشه dist/
npm run preview
```

---

## ۲) انتشار روی GitHub Pages

1. یک ریپوی جدید بساز: بهترین انتخاب `amhasani2a.github.io` (دامنهٔ ریشه).
2. تمام فایل‌های این پوشه را پوش کن (برنچ `main`).
3. در گیت‌هاب: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
4. همین. ورک‌فلوی `.github/workflows/deploy.yml` خودکار بیلد و منتشر می‌کند.

### اگر اسم ریپو چیز دیگری است

در `astro.config.mjs`:

```js
site: "https://amhasani2a.github.io",
base: "/NAME-OF-REPO/",
```

### دامنهٔ اختصاصی

فایل `public/CNAME` بساز و داخلش فقط دامنه را بنویس (مثلاً `hasani.dev`)، بعد در Settings → Pages دامنه را ثبت کن و `site` را هم همان بگذار.

---

## ۳) پنل مدیریت محتوا (CMS)

پنل گرافیکی روی مسیر **`/admin/`** قرار دارد (مثلاً `https://amhasani2a.github.io/admin/`).

با آن می‌توانی بدون کدزدن:

- تیتر و متن هر بخش صفحهٔ اصلی، معرفی، رزومه و مهارت‌ها را ویرایش کنی
- پست وبلاگ بسازی/حذف کنی (فارسی و انگلیسی جداگانه)
- کتاب/رمان اضافه کنی، جلد آپلود کنی
- ایمیل، شبکه‌های اجتماعی، پروژه‌های پین‌شده و لینک خبرنامه را تغییر دهی

هر ذخیره، یک کامیت روی ریپو می‌زند و سایت دوباره خودکار بیلد می‌شود.

### حالت الف) ویرایش محلی (بدون هیچ تنظیم اضافه)

در کروم/ادج: `npm run dev` بزن، برو به `http://localhost:4321/admin/` و گزینهٔ **“Work with Local Repository”** را بزن؛ پوشهٔ پروژه را انتخاب کن. همه‌چیز روی فایل‌های خودت ذخیره می‌شود.

### حالت ب) ویرایش آنلاین روی سایت منتشرشده

چون GitHub Pages سرور ندارد، برای لاگین گیت‌هاب یک OAuth کوچک لازم است (رایگان):

1. ریپوی `sveltia/sveltia-cms-auth` را در Cloudflare Workers دیپلوی کن (دکمهٔ Deploy در README آن ریپو).
2. در گیت‌هاب: Settings → Developer settings → **OAuth Apps → New OAuth App**
   - Homepage URL: آدرس سایت
   - Authorization callback URL: `https://<your-worker>.workers.dev/callback`
3. `GITHUB_CLIENT_ID` و `GITHUB_CLIENT_SECRET` را در متغیرهای Worker بگذار.
4. در `public/admin/config.yml` خط `base_url` را از حالت کامنت دربیاور و آدرس Worker را بگذار.

> اگر فعلاً حوصلهٔ این مرحله را نداری، فقط از حالت محلی (الف) استفاده کن و بعد پوش بده.

---

## ۴) ساختار پروژه

```
src/
  components/    Header, Footer, Hero, Section, About, Experience, Repos, PostCard, BookCard, Contact
  content/
    blog/fa|en/  پست‌های وبلاگ (Markdown)
    books/fa|en/ رمان‌ها و آثار
  data/          settings.json + profile.fa.json + profile.en.json  (محتوای ثابت صفحه‌ها)
  i18n/ui.ts     تمام متن‌های رابط کاربری دو زبان
  layouts/       Base.astro (SEO، تم، فونت، انیمیشن اسکرول)
  pages/         فارسی در ریشه، انگلیسی در /en
  styles/        global.css — توکن‌های رنگ، کامپوننت‌ها، انیمیشن‌ها
public/
  admin/         پنل Sveltia CMS
  uploads/       تصاویر آپلودشده از پنل
```

---

## ۵) نکته‌های فنی

- **لیزی‌لودینگ:** تصاویر `loading="lazy"`؛ انیمیشن ورود بخش‌ها و دریافت مخازن گیت‌هاب فقط وقتی نزدیک دید کاربر می‌شوند (IntersectionObserver) اجرا می‌شود؛ نتیجهٔ گیت‌هاب ۱ ساعت در localStorage کش می‌شود.
- **پروژه‌ها:** از `https://api.github.com/users/amhasani2a/repos` خوانده می‌شود؛ فورک‌ها و آرشیوها حذف می‌شوند و مرتب‌سازی بر اساس ستاره و آخرین پوش است. برای ثابت کردن ترتیب، نام مخزن‌ها را در `pinnedRepos` بگذار.
- **تم:** پیش‌فرض دارک؛ انتخاب کاربر در localStorage ذخیره می‌شود و پرش رنگ (FOUC) ندارد.
- **دوزبانه:** فارسی `/` — انگلیسی `/en/`. دکمهٔ FA/EN در هدر.
- **دسترسی‌پذیری:** پرش به محتوا، فوکوس قابل‌دید، هدف‌های لمسی ۴۴پیکسل، احترام به `prefers-reduced-motion`.
- **SEO:** سایت‌مپ، RSS در `/rss.xml`، تگ‌های OpenGraph.

---

## ۶) کارهای بعدی پیشنهادی

- در `src/data/settings.json` ایمیل و لینک‌های شبکه‌های اجتماعی واقعی را بگذار.
- برای خبرنامه، آدرس فرم Buttondown / Mailchimp / Formspree را در `newsletterAction` بگذار.
- رزومهٔ PDF را در `public/` بگذار و لینکش را در `resumeUrl` ثبت کن.
