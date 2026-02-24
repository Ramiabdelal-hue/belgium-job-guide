# خطوات سريعة لإعداد Cloudinary ⚡

## 📋 ما تحتاجه من Cloudinary:

اذهب إلى [console.cloudinary.com](https://console.cloudinary.com)

ستجد في الصفحة الرئيسية:

```
Cloud Name: dxxxxx
API Key: 123456789012345
API Secret: abcdefghijklmnop_qrstuv
```

---

## ⚙️ الإعداد في 3 خطوات:

### 1. أضف في ملف `.env` المحلي:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnop_qrstuv
```

### 2. أضف في Vercel Environment Variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dxxxxx
CLOUDINARY_API_KEY = 123456789012345
CLOUDINARY_API_SECRET = abcdefghijklmnop_qrstuv
```

### 3. Redeploy على Vercel

```bash
git add .
git commit -m "Add Cloudinary config"
git push origin main
```

---

## 🎯 كيفية الاستخدام:

### في صفحة الأدمن:

```tsx
import FileUploader from "@/components/FileUploader";

// رفع صورة
<FileUploader
  type="image"
  onUploadComplete={(url) => {
    // احفظ url في قاعدة البيانات
    console.log("Image uploaded:", url);
  }}
/>

// رفع فيديو
<FileUploader
  type="video"
  onUploadComplete={(url) => {
    console.log("Video uploaded:", url);
  }}
/>
```

---

## ✅ تم!

الآن يمكنك رفع الصور والفيديوهات مباشرة على Cloudinary من لوحة الأدمن.

**الملفات ستُحفظ بشكل دائم ولن تُحذف!** 🎉
