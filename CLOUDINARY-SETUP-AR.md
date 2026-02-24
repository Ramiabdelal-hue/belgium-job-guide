# دليل إعداد Cloudinary 📸

## 1️⃣ الحصول على بيانات Cloudinary

1. اذهب إلى [cloudinary.com/console](https://cloudinary.com/console)
2. ستجد في Dashboard:
   - **Cloud Name** (مثل: `dxxxxx`)
   - **API Key** (مثل: `123456789012345`)
   - **API Secret** (مثل: `abcdefghijklmnop`)

---

## 2️⃣ إضافة المتغيرات في Vercel

اذهب إلى Vercel Dashboard → Settings → Environment Variables

أضف:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**مهم**: اضغط Save ثم Redeploy المشروع

---

## 3️⃣ إضافة المتغيرات محلياً

في ملف `.env`:

```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 4️⃣ تثبيت الحزم المطلوبة

```bash
npm install cloudinary
```

---

## 5️⃣ كيفية الاستخدام

### في صفحة الأدمن (لرفع الملفات):

```tsx
import FileUploader from "@/components/FileUploader";

// رفع صورة
<FileUploader
  type="image"
  onUploadComplete={(url, publicId) => {
    console.log("Image URL:", url);
    // احفظ الرابط في قاعدة البيانات
  }}
  maxSizeMB={5}
/>

// رفع فيديو
<FileUploader
  type="video"
  onUploadComplete={(url, publicId) => {
    console.log("Video URL:", url);
  }}
  maxSizeMB={100}
/>

// رفع صوت
<FileUploader
  type="audio"
  onUploadComplete={(url, publicId) => {
    console.log("Audio URL:", url);
  }}
  maxSizeMB={10}
/>
```

---

## 6️⃣ عرض الملفات

### صورة:
```tsx
<img src={imageUrl} alt="Description" />
```

### فيديو:
```tsx
<video src={videoUrl} controls />
```

### صوت:
```tsx
<audio src={audioUrl} controls />
```

---

## 7️⃣ المجلدات في Cloudinary

الملفات ستُحفظ في:
- `driving-app/images/` - الصور
- `driving-app/videos/` - الفيديوهات
- `driving-app/audio/` - الملفات الصوتية

---

## 8️⃣ الحدود المجانية في Cloudinary

- **التخزين**: 25 GB
- **Bandwidth**: 25 GB/شهر
- **Transformations**: 25,000/شهر

**أكثر من كافي لمشروعك!** ✅

---

## 🔧 API Endpoint

تم إنشاء `/api/upload` للرفع:

```typescript
// POST /api/upload
// Body: FormData with 'file' and 'type'
// Response: { success: true, url: string, publicId: string }
```

---

## 📝 ملاحظات مهمة

1. ✅ الملفات تُحفظ بشكل دائم على Cloudinary
2. ✅ CDN عالمي سريع
3. ✅ تحسين تلقائي للصور
4. ✅ دعم جميع صيغ الفيديو والصوت
5. ✅ آمن ومشفر (HTTPS)

---

## 🚀 الخطوات السريعة

```bash
# 1. ثبت الحزمة
npm install cloudinary

# 2. أضف المتغيرات في .env
# 3. أضف المتغيرات في Vercel
# 4. Redeploy على Vercel
# 5. استخدم FileUploader في صفحات الأدمن
```

---

**جاهز للاستخدام!** 🎉
