"use client";

import { useState } from "react";
import { FaUpload, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface FileUploaderProps {
  type: "image" | "video" | "audio";
  onUploadComplete: (url: string, publicId: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileUploader({
  type,
  onUploadComplete,
  accept,
  maxSizeMB = 100,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التحقق من حجم الملف
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`حجم الملف كبير جداً. الحد الأقصى ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      // محاكاة التقدم
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("فشل الرفع");
      }

      const data = await response.json();
      setSuccess(true);
      onUploadComplete(data.url, data.publicId);

      setTimeout(() => {
        setSuccess(false);
        setProgress(0);
      }, 2000);
    } catch (err) {
      setError("حدث خطأ أثناء رفع الملف");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const getAcceptType = () => {
    if (accept) return accept;
    switch (type) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "audio":
        return "audio/*";
      default:
        return "*/*";
    }
  };

  const getLabel = () => {
    switch (type) {
      case "image":
        return "رفع صورة";
      case "video":
        return "رفع فيديو";
      case "audio":
        return "رفع صوت";
      default:
        return "رفع ملف";
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <>
              <FaSpinner className="w-8 h-8 mb-2 text-blue-500 animate-spin" />
              <p className="text-sm text-gray-600">جاري الرفع... {progress}%</p>
              <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : success ? (
            <>
              <FaCheckCircle className="w-8 h-8 mb-2 text-green-500" />
              <p className="text-sm text-green-600">تم الرفع بنجاح!</p>
            </>
          ) : (
            <>
              <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">{getLabel()}</span>
              </p>
              <p className="text-xs text-gray-500">الحد الأقصى: {maxSizeMB}MB</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept={getAcceptType()}
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
          <FaTimesCircle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
