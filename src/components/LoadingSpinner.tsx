export function LoadingSpinner() {
  return (
    <div className="card" style={{
      padding: 36,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
    }}>
      {/* 动态点阵 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)', marginBottom: 4 }}>
          Gemini AI 正在分析
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
          识别图标特征，生成精准关键词...
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
