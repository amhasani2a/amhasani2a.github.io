# ۵ دقیقه تا بالا آمدن سایت

1. ریپو بساز با اسم **`amhasani2a.github.io`** (حتماً Public).
2. محتوای این پوشه را داخل ریپو بریز و پوش کن:
   ```bash
   git init
   git add .
   git commit -m "init: personal site"
   git branch -M main
   git remote add origin git@github.com:amhasani2a/amhasani2a.github.io.git
   git push -u origin main
   ```
3. در گیت‌هاب: **Settings → Pages → Source = GitHub Actions**.
4. تب **Actions** را ببین؛ پس از حدود ۲ دقیقه سایت روی `https://amhasani2a.github.io` بالا می‌آید.

## ویرایش محتوا با پنل گرافیکی

- **سریع‌ترین راه (بدون تنظیم):** `npm install && npm run dev` ← بعد در کروم برو به `localhost:4321/admin/` و گزینهٔ *Work with Local Repository* را بزن.
- **ویرایش آنلاین روی خود سایت:** مرحلهٔ OAuth در `README.md` بخش ۳ توضیح داده شده.

## مهم‌ترین فایل‌هایی که شاید بخواهی دستی عوض کنی

| چه چیزی | کجا |
| --- | --- |
| ایمیل، شبکه‌های اجتماعی، یوزرنیم گیت‌هاب | `src/data/settings.json` |
| متن معرفی، رزومه، مهارت‌ها | `src/data/profile.fa.json` و `profile.en.json` |
| پست‌های وبلاگ | `src/content/blog/fa` و `src/content/blog/en` |
| رمان‌ها و آثار | `src/content/books/fa` و `en` |
| رنگ‌ها و استایل | `src/styles/global.css` (متغیرهای `--c-*`) |
| متن منوها و دکمه‌ها | `src/i18n/ui.ts` |
