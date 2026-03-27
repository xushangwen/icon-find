import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useStore } from '../store/useStore';
import { validateApiKey } from '../lib/gemini';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { apiKey, setApiKey } = useStore();
  const [inputValue, setInputValue] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!inputValue.trim()) {
      setError('请输入 API Key');
      return;
    }
    if (!validateApiKey(inputValue)) {
      setError('格式有误，API Key 应以 AIzaSy 开头');
      return;
    }
    setApiKey(inputValue.trim());
    setError('');
    onOpenChange(false);
  };

  const handleClear = () => {
    setApiKey(null);
    setInputValue('');
    setError('');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }} />
        <Dialog.Content style={{
          position: 'fixed',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 50,
          width: '100%', maxWidth: 440,
          padding: '0 16px',
        }}>
          <div className="card" style={{ padding: 28 }}>
            {/* 标题 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <Dialog.Title style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>
                  API Key 配置
                </Dialog.Title>
                <Dialog.Description style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  数据仅存储在本地浏览器
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="icon-btn">
                  <i className="ri-close-line" style={{ fontSize: 15 }} />
                </button>
              </Dialog.Close>
            </div>

            {/* 输入框 */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-2)', marginBottom: 8 }}>
                Gemini API Key
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showKey ? 'text' : 'password'}
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(''); }}
                  placeholder="AIzaSy..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 14px',
                    borderRadius: 10,
                    border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'var(--border)'}`,
                    background: 'var(--bg-muted)',
                    color: 'var(--text-1)',
                    fontSize: 13,
                    fontFamily: 'Space Grotesk, monospace',
                    outline: 'none',
                    transition: 'border-color 0.16s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--border-accent)'}
                  onBlur={e => e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'var(--border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-3)', fontSize: 14,
                  }}
                >
                  <i className={showKey ? 'ri-eye-off-line' : 'ri-eye-line'} />
                </button>
              </div>
              {error
                ? <p style={{ fontSize: 12, color: 'rgb(239,68,68)', marginTop: 6 }}>{error}</p>
                : <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>
                    前往{' '}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                      style={{ color: '#7C3AED', textDecoration: 'none' }}>
                      Google AI Studio
                    </a>{' '}
                    免费获取
                  </p>
              }
            </div>

            {/* 按钮 */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleSave} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
                保存
              </button>
              {apiKey && (
                <button onClick={handleClear} className="btn-secondary" style={{ fontSize: 14 }}>
                  清除
                </button>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
