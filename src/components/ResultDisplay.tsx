import { useState } from 'react';
import { useStore } from '../store/useStore';
import { copyToClipboard, generateFlaticonUrl } from '../lib/utils';

export function ResultDisplay() {
  const { analysisResult } = useStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  if (!analysisResult) return null;

  const keywords = lang === 'zh' ? analysisResult.chineseKeywords : analysisResult.englishKeywords;

  const handleCopy = async (keyword: string, index: number) => {
    await copyToClipboard(keyword);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    await copyToClipboard(keywords.join(' '));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 顶部：风格 + 主题 + 语言切换 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{
            fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 100,
            background: 'var(--bg-muted)', border: '1px solid var(--border)',
            color: 'var(--text-2)',
          }}>
            <i className="ri-brush-line" style={{ marginRight: 4 }} />{analysisResult.style}
          </span>
          <span style={{
            fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 100,
            background: 'var(--bg-muted)', border: '1px solid var(--border)',
            color: 'var(--text-2)',
          }}>
            <i className="ri-price-tag-3-line" style={{ marginRight: 4 }} />{analysisResult.theme}
          </span>
        </div>

        {/* 语言切换 */}
        <div style={{
          display: 'flex', gap: 2, padding: 3, borderRadius: 10,
          background: 'var(--bg-muted)', border: '1px solid var(--border)',
        }}>
          {(['zh', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 8,
                cursor: 'pointer', transition: 'all 0.16s', border: 'none',
                background: lang === l
                  ? 'linear-gradient(135deg, #7C3AED, #6366F1)'
                  : 'transparent',
                color: lang === l ? 'white' : 'var(--text-2)',
              }}
            >
              {l === 'zh' ? '中文' : 'EN'}
            </button>
          ))}
        </div>
      </div>

      {/* 分割线 */}
      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* 关键词区域 */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
          关键词 · 点击复制
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleCopy(keyword, index)}
              className={`keyword-tag${copiedIndex === index ? ' copied' : ''}`}
            >
              {copiedIndex === index
                ? <><i className="ri-check-line" />{keyword}</>
                : keyword
              }
            </button>
          ))}
        </div>
      </div>

      {/* 分割线 */}
      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* 操作按钮 */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleCopyAll}
          className="btn-secondary"
          style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}
        >
          <i className={copiedIndex === -1 ? 'ri-check-line' : 'ri-file-copy-line'} />
          {copiedIndex === -1 ? '已复制' : '复制全部'}
        </button>
        <a
          href={generateFlaticonUrl(keywords)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}
        >
          <span>在 Flaticon 搜索</span>
          <i className="ri-arrow-right-up-line" />
        </a>
      </div>
    </div>
  );
}
