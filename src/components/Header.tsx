import { useState } from 'react';
import { SettingsDialog } from './SettingsDialog';
import { useTheme } from '../hooks/useTheme';

export function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  // 判断当前实际生效的主题（system 需要读取系统偏好）
  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <>
      <header style={{
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30,
              background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="ri-sparkling-2-fill" style={{ color: 'white', fontSize: 15 }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.2px' }}>
              IconFinder
            </span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              className="icon-btn"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="切换主题"
            >
              <i className={isDark ? 'ri-sun-line' : 'ri-moon-line'} style={{ fontSize: 15 }} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setSettingsOpen(true)}
              aria-label="设置"
            >
              <i className="ri-settings-4-line" style={{ fontSize: 15 }} />
            </button>
          </div>
        </div>
      </header>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
