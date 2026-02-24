import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, uploadVideo, uploadAudio } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'image', 'video', 'audio'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    let result;

    // رفع حسب نوع الملف
    switch (type) {
      case 'image':
        result = await uploadImage(file);
        break;
      case 'video':
        result = await uploadVideo(file);
        break;
      case 'audio':
        result = await uploadAudio(file);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid file type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      url: (result as any).secure_url,
      publicId: (result as any).public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
