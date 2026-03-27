import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-lg',
        'bg-slate-100 dark:bg-slate-800',
        'hover:bg-slate-200 dark:hover:bg-slate-700',
        'transition-colors duration-200'
      )}
      aria-label="切换主题"
    >
      <i className={cn(
        'ri-sun-line text-xl',
        'dark:hidden'
      )} />
      <i className={cn(
        'ri-moon-line text-xl',
        'hidden dark:block'
      )} />
    </button>
  );
}
