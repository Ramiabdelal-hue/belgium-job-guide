# دليل نشر المشروع على Vercel 🚀

## الخطوات المطلوبة

### 1️⃣ التحضيرات قبل النشر

#### أ) تأكد من رفع الملفات على GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### ب) تأكد من وجود قاعدة بيانات PostgreSQL
- إذا لم يكن لديك، سجل في [Neon](https://neon.tech) (مجاني)
- أنشئ قاعدة بيانات جديدة
- احصل على:
  - `DATABASE_URL` (Pooled Connection)
  - `DIRECT_DATABASE_URL` (Direct Connection)

---

### 2️⃣ ربط المشروع مع Vercel

#### الطريقة الأولى: من موقع Vercel (الأسهل)

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "Sign Up" أو "Login" باستخدام حساب GitHub
3. اضغط "Add New Project"
4. اختر المستودع (Repository) من GitHub
5. اضغط "Import"

#### الطريقة الثانية: من سطر الأوامر

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel
```

---

### 3️⃣ إعداد متغيرات البيئة (Environment Variables)

في صفحة إعدادات المشروع على Vercel، أضف المتغيرات التالية:

#### متغيرات قاعدة البيانات (إجبارية)
```
DATABASE_URL=postgresql://user:password@host-pooler.neon.tech/database?sslmode=require&pgbouncer=true
DIRECT_DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
```

#### متغيرات التطبيق (إجبارية)
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
```

#### متغيرات الدفع (اختيارية - إذا كنت تستخدم Mollie)
```
MOLLIE_API_KEY=test_xxxxxxxxxxxxx
```

#### متغيرات رفع الملفات (اختيارية)
```
MAX_VIDEO_SIZE_MB=100
MAX_AUDIO_SIZE_MB=10
MAX_IMAGE_SIZE_MB=5
```

**ملاحظة مهمة:** 
- اضغط على "Add" بعد كل متغير
- تأكد من اختيار "Production, Preview, and Development" لكل متغير

---

### 4️⃣ إعدادات البناء (Build Settings)

Vercel سيكتشف تلقائياً أنه مشروع Next.js، لكن تأكد من:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

### 5️⃣ تشغيل Migrations على قاعدة البيانات

بعد النشر الأول، يجب تشغيل migrations:

#### الطريقة الأولى: من جهازك المحلي
```bash
# تأكد من وجود متغيرات البيئة في ملف .env
DATABASE_URL="your-production-database-url"
DIRECT_DATABASE_URL="your-production-direct-url"

# شغل migrations
npx prisma migrate deploy

# (اختياري) أضف بيانات تجريبية
npm run seed
```

#### الطريقة الثانية: من Vercel CLI
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

---

### 6️⃣ التحقق من النشر

1. افتح رابط المشروع: `https://your-app.vercel.app`
2. تحقق من:
   - ✅ الصفحة الرئيسية تعمل
   - ✅ تسجيل الدخول يعمل
   - ✅ قاعدة البيانات متصلة
   - ✅ الصور والفيديوهات تظهر

---

## 🔧 حل المشاكل الشائعة

### مشكلة: "Module not found"
```bash
# تأكد من تثبيت جميع الحزم
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### مشكلة: "Database connection failed"
- تحقق من صحة `DATABASE_URL` و `DIRECT_DATABASE_URL`
- تأكد من أن قاعدة البيانات تقبل اتصالات من الخارج
- في Neon، تأكد من تفعيل "Pooling"

### مشكلة: "Build failed"
- تحقق من Logs في Vercel Dashboard
- تأكد من أن `next.config.js` يحتوي على:
  ```js
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ```

### مشكلة: الصور لا تظهر
- إذا كنت تستخدم ملفات محلية، يجب رفعها على خدمة تخزين سحابية مثل:
  - Cloudinary (مجاني)
  - AWS S3
  - Vercel Blob Storage

---

## 📝 ملاحظات مهمة

1. **قاعدة البيانات**: Vercel لا يوفر قاعدة بيانات، يجب استخدام خدمة خارجية (Neon مجاني وممتاز)

2. **الملفات المرفوعة**: Vercel Serverless لا يحفظ الملفات بشكل دائم، استخدم:
   - Vercel Blob Storage
   - Cloudinary
   - AWS S3

3. **التحديثات التلقائية**: كل push على GitHub سيؤدي لنشر تلقائي

4. **النطاق المخصص**: يمكنك ربط نطاقك الخاص من إعدادات Vercel

5. **الأداء**: Vercel يوفر CDN عالمي تلقائياً

---

## 🎯 الخطوات السريعة (ملخص)

```bash
# 1. رفع على GitHub
git push origin main

# 2. اذهب إلى vercel.com
# 3. Import من GitHub
# 4. أضف Environment Variables
# 5. Deploy

# 6. شغل Migrations
npx prisma migrate deploy
```

---

## 🔗 روابط مفيدة

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Neon Database](https://neon.tech)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**تم! 🎉 مشروعك الآن على الإنترنت**
