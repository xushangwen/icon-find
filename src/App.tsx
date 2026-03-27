import { useEffect } from 'react';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ResultDisplay } from './components/ResultDisplay';
import { useStore } from './store/useStore';
import { useTheme } from './hooks/useTheme';
import { analyzeIcon } from './lib/gemini';

function App() {
  useTheme();

  const {
    apiKey,
    uploadedImage,
    analysisResult,
    isAnalyzing,
    error,
    setIsAnalyzing,
    setAnalysisResult,
    setError,
    reset,
  } = useStore();

  useEffect(() => {
    if (!uploadedImage || !apiKey || analysisResult || isAnalyzing) return;

    const analyze = async () => {
      setIsAnalyzing(true);
      setError(null);
      try {
        const result = await analyzeIcon(uploadedImage.base64, apiKey);
        setAnalysisResult(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : '分析失败，请重试');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyze();
  }, [uploadedImage, apiKey, analysisResult, isAnalyzing, setIsAnalyzing, setAnalysisResult, setError]);

  const hasResult = uploadedImage !== null;

  return (
    <div className="app-bg">
      <Header />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ─── 初始状态：居中 Hero ─── */}
        {!hasResult && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80, gap: 48 }}>
            {/* 标题 */}
            <div style={{ textAlign: 'center', maxWidth: 480 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--text-3)',
                marginBottom: 16,
              }}>
                <i className="ri-sparkling-2-line" style={{ color: '#7C3AED' }} />
                Powered by Gemini AI
              </div>
              <h1 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-1)',
                marginBottom: 14,
              }}>
                上传图标
                <br />
                <span className="gradient-text">AI 生成关键词</span>
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6 }}>
                识别图标风格与含义，直接在 Flaticon 搜到相似素材
              </p>
            </div>

            {/* 上传区域 */}
            <div style={{ width: '100%', maxWidth: 480 }}>
              <UploadArea />
            </div>

            {/* 错误 */}
            {error && <ErrorBanner message={error} />}

            {/* 首次使用提示 */}
            {!apiKey && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 10,
                background: 'rgba(124,58,237,0.07)',
                border: '1px solid var(--border-accent)',
                fontSize: 13, color: 'var(--text-2)',
              }}>
                <i className="ri-key-2-line" style={{ color: '#7C3AED' }} />
                请先在右上角 <strong style={{ color: 'var(--text-1)' }}>设置</strong> 中配置 Gemini API Key
              </div>
            )}
          </div>
        )}

        {/* ─── 有图片状态：双栏布局 ─── */}
        {hasResult && (
          <div style={{ paddingTop: 40 }}>
            {/* 顶部操作栏 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
                {isAnalyzing ? 'AI 正在识别中...' : analysisResult ? '识别完成' : '正在处理...'}
              </p>
              <button
                onClick={reset}
                className="btn-secondary"
                style={{ fontSize: 13, padding: '7px 16px', borderRadius: 10 }}
              >
                <i className="ri-restart-line" />
                重新上传
              </button>
            </div>

            {/* 双栏：图片 + 结果 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 300px) 1fr',
              gap: 20,
              alignItems: 'start',
            }}
              className="result-grid"
            >
              {/* 左栏：图片预览 */}
              <UploadArea />

              {/* 右栏：分析结果 */}
              <div>
                {error && <ErrorBanner message={error} />}
                {isAnalyzing && <LoadingSpinner />}
                {analysisResult && !isAnalyzing && <ResultDisplay />}
                {!isAnalyzing && !analysisResult && !error && (
                  <div className="card" style={{ padding: 28, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-3)' }}>准备分析...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 响应式样式 */}
      <style>{`
        @media (max-width: 640px) {
          .result-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '12px 16px', borderRadius: 12, marginBottom: 16,
      background: 'rgba(239,68,68,0.07)',
      border: '1px solid rgba(239,68,68,0.25)',
    }}>
      <i className="ri-error-warning-line" style={{ color: 'rgb(239,68,68)', fontSize: 16, flexShrink: 0, marginTop: 1 }} />
      <p style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5 }}>{message}</p>
    </div>
  );
}

export default App;
