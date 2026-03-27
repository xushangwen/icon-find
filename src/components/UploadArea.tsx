import { useCallback, useRef, useState } from 'react';
import { useImageUpload } from '../hooks/useImageUpload';
import { useStore } from '../store/useStore';

export function UploadArea() {
  const { uploadedImage } = useStore();
  const { handleUpload } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  if (uploadedImage) {
    return (
      <div className="card" style={{
        width: '100%',
        maxWidth: 320,
        margin: '0 auto',
        overflow: 'hidden',
        padding: 0,
      }}>
        <div style={{
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: 'var(--bg-muted)',
        }}>
          <img
            src={uploadedImage.preview}
            alt="上传的图标"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      style={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        minHeight: 280,
        borderRadius: 20,
        border: `2px dashed ${isDragging ? 'var(--border-accent)' : 'var(--border)'}`,
        background: isDragging ? 'var(--bg-muted)' : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.border = '2px dashed var(--border-accent)';
        (e.currentTarget as HTMLElement).style.background = 'var(--bg-muted)';
      }}
      onMouseLeave={e => {
        if (!isDragging) {
          (e.currentTarget as HTMLElement).style.border = '2px dashed var(--border)';
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }
      }}
    >
      {/* Icon */}
      <div style={{
        width: 64, height: 64,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(99,102,241,0.12) 100%)',
        border: '1px solid var(--border-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <i className="ri-upload-cloud-2-line" style={{
          fontSize: 28,
          background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-1)', marginBottom: 6 }}>
          拖拽图标到此处，或 <span className="gradient-text">点击上传</span>
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
          PNG · JPG · SVG · WebP &nbsp;·&nbsp; 最大 5MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
        onChange={onFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
}
