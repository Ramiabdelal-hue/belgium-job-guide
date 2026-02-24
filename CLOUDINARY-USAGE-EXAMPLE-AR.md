# مثال استخدام FileUploader في صفحة الأدمن

## 📝 كيفية استخدام FileUploader

### 1️⃣ استيراد المكون:

```tsx
import FileUploader from "@/components/FileUploader";
import { useState } from "react";
```

### 2️⃣ إنشاء state لحفظ الروابط:

```tsx
const [videoUrls, setVideoUrls] = useState<string[]>([]);
const [imageUrl, setImageUrl] = useState("");
const [audioUrl, setAudioUrl] = useState("");
```

### 3️⃣ استخدام المكون:

#### رفع صورة:
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    رفع صورة
  </label>
  <FileUploader
    type="image"
    onUploadComplete={(url, publicId) => {
      setImageUrl(url);
      console.log("تم رفع الصورة:", url);
      // احفظ url في قاعدة البيانات
    }}
    maxSizeMB={5}
  />
  {imageUrl && (
    <div className="mt-3">
      <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
    </div>
  )}
</div>
```

#### رفع فيديو:
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    رفع فيديو
  </label>
  <FileUploader
    type="video"
    onUploadComplete={(url, publicId) => {
      setVideoUrls([...videoUrls, url]);
      console.log("تم رفع الفيديو:", url);
    }}
    maxSizeMB={100}
  />
  {videoUrls.length > 0 && (
    <div className="mt-3 space-y-2">
      {videoUrls.map((url, idx) => (
        <video key={idx} src={url} controls className="w-full max-w-md rounded-lg" />
      ))}
    </div>
  )}
</div>
```

#### رفع ملف صوتي:
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    رفع ملف صوتي
  </label>
  <FileUploader
    type="audio"
    onUploadComplete={(url, publicId) => {
      setAudioUrl(url);
      console.log("تم رفع الصوت:", url);
    }}
    maxSizeMB={10}
  />
  {audioUrl && (
    <div className="mt-3">
      <audio src={audioUrl} controls className="w-full max-w-md" />
    </div>
  )}
</div>
```

---

## 🎯 مثال كامل - صفحة إضافة سؤال:

```tsx
"use client";

import { useState } from "react";
import FileUploader from "@/components/FileUploader";

export default function AddQuestionPage() {
  const [question, setQuestion] = useState({
    textNL: "",
    textFR: "",
    textAR: "",
    videoUrls: [] as string[],
    audioUrl: "",
  });

  const handleSave = async () => {
    // احفظ السؤال مع الروابط في قاعدة البيانات
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });

    if (response.ok) {
      alert("تم حفظ السؤال بنجاح!");
      // إعادة تعيين النموذج
      setQuestion({
        textNL: "",
        textFR: "",
        textAR: "",
        videoUrls: [],
        audioUrl: "",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">إضافة سؤال جديد</h1>

      {/* حقول النص */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            السؤال بالهولندية
          </label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={3}
            value={question.textNL}
            onChange={(e) => setQuestion({ ...question, textNL: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            السؤال بالفرنسية
          </label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={3}
            value={question.textFR}
            onChange={(e) => setQuestion({ ...question, textFR: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            السؤال بالعربية
          </label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={3}
            value={question.textAR}
            onChange={(e) => setQuestion({ ...question, textAR: e.target.value })}
          />
        </div>
      </div>

      {/* رفع الفيديوهات */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          رفع فيديو
        </label>
        <FileUploader
          type="video"
          onUploadComplete={(url) => {
            setQuestion({
              ...question,
              videoUrls: [...question.videoUrls, url],
            });
          }}
          maxSizeMB={100}
        />
        
        {/* عرض الفيديوهات المرفوعة */}
        {question.videoUrls.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-gray-700">
              الفيديوهات المرفوعة ({question.videoUrls.length}):
            </p>
            {question.videoUrls.map((url, idx) => (
              <div key={idx} className="relative">
                <video src={url} controls className="w-full max-w-md rounded-lg" />
                <button
                  onClick={() => {
                    setQuestion({
                      ...question,
                      videoUrls: question.videoUrls.filter((_, i) => i !== idx),
                    });
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* رفع الصوت */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          رفع ملف صوتي
        </label>
        <FileUploader
          type="audio"
          onUploadComplete={(url) => {
            setQuestion({ ...question, audioUrl: url });
          }}
          maxSizeMB={10}
        />
        
        {question.audioUrl && (
          <div className="mt-4">
            <audio src={question.audioUrl} controls className="w-full max-w-md" />
            <button
              onClick={() => setQuestion({ ...question, audioUrl: "" })}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              حذف الصوت
            </button>
          </div>
        )}
      </div>

      {/* زر الحفظ */}
      <button
        onClick={handleSave}
        className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600"
      >
        حفظ السؤال
      </button>
    </div>
  );
}
```

---

## ✅ الفوائد:

1. ✅ رفع مباشر على Cloudinary
2. ✅ الملفات تُحفظ بشكل دائم
3. ✅ CDN سريع عالمياً
4. ✅ معاينة فورية للملفات
5. ✅ شريط تقدم أثناء الرفع
6. ✅ رسائل نجاح/خطأ واضحة

---

## 🔗 الخطوة التالية:

بدلاً من رفع الملفات كـ `File` في `FormData`، الآن:
1. ارفع الملف على Cloudinary باستخدام `FileUploader`
2. احصل على `url` من Cloudinary
3. احفظ `url` في قاعدة البيانات (نص عادي)

**لا حاجة لحفظ الملفات على السيرفر!** 🎉
