import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { fileToBase64 } from '../lib/utils';
import type { UploadedImage } from '../types';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];

export function useImageUpload() {
  const { setUploadedImage, setError, reset } = useStore();

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return '仅支持 PNG、JPG、JPEG、SVG、WebP 格式';
    }
    if (file.size > MAX_FILE_SIZE) {
      return '文件大小不能超过 5MB';
    }
    return null;
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    reset();
    
    const error = validateFile(file);
    if (error) {
      setError(error);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      const preview = URL.createObjectURL(file);
      
      const uploadedImage: UploadedImage = {
        file,
        preview,
        base64,
      };
      
      setUploadedImage(uploadedImage);
      setError(null);
    } catch (err) {
      setError('文件读取失败，请重试');
    }
  }, [validateFile, setUploadedImage, setError, reset]);

  return { handleUpload, validateFile };
}
