# خطوات سريعة للنشر على Vercel ⚡

## 1. رفع التحديثات على GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

## 2. الذهاب إلى Vercel
1. افتح [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط **"Add New Project"**
4. اختر المستودع الخاص بك
5. اضغط **"Import"**

## 3. إضافة متغيرات البيئة (مهم جداً!)

في صفحة الإعدادات، أضف:

### إجباري:
```
DATABASE_URL = postgresql://user:pass@host-pooler.neon.tech/db?sslmode=require&pgbouncer=true
DIRECT_DATABASE_URL = postgresql://user:pass@host.neon.tech/db?sslmode=require
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
JWT_SECRET = any-random-long-string-here-123456789
```

### اختياري (إذا تستخدم Mollie):
```
MOLLIE_API_KEY = test_xxxxxxxxxxxxx
```

## 4. اضغط Deploy

انتظر 2-3 دقائق حتى ينتهي البناء

## 5. تشغيل Database Migrations

من جهازك:
```bash
# أنشئ ملف .env.production
echo 'DATABASE_URL="your-production-url"' > .env.production
echo 'DIRECT_DATABASE_URL="your-direct-url"' >> .env.production

# شغل migrations
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

## 6. افتح موقعك! 🎉

رابطك: `https://your-project-name.vercel.app`

---

## ملاحظات مهمة:

✅ **قاعدة البيانات**: استخدم [Neon.tech](https://neon.tech) (مجاني)

✅ **الملفات (صور/فيديو)**: Vercel لا يحفظ الملفات، استخدم:
   - Cloudinary (مجاني)
   - Vercel Blob Storage
   - AWS S3

✅ **التحديثات**: كل push على GitHub = نشر تلقائي جديد

✅ **المشاكل**: شوف Logs في Vercel Dashboard

---

**محتاج مساعدة؟** شوف الملف الكامل: `VERCEL-DEPLOYMENT-GUIDE-AR.md`
