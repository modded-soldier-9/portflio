'use client';

import { useState, useCallback, useEffect } from 'react';

interface Mark {
  id: string;
  element: HTMLElement;
}

const PenCanvas = () => {
  const [marking, setMarking] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!marking) return;

    // Find the closest text-bearing element
    const target = e.target as HTMLElement;
    const el = target.closest('p, h1, h2, h3, li, span, a, label, td') as HTMLElement | null;
    if (!el) return;

    // Don't mark the toolbar or nav
    if (el.closest('.toolbar-dock') || el.closest('nav')) return;

    // Toggle: if already marked, unmark
    if (el.dataset.marked === 'true') {
      el.dataset.marked = '';
      el.style.removeProperty('background');
      el.style.removeProperty('border-bottom');
      el.style.removeProperty('border-radius');
      setMarks(prev => prev.filter(m => m.element !== el));
      return;
    }

    // Mark it
    const id = crypto.randomUUID();
    el.dataset.marked = 'true';
    el.style.background = 'oklch(50% 0.22 25 / 0.08)';
    el.style.borderBottom = '2px solid oklch(50% 0.22 25 / 0.7)';
    el.style.borderRadius = '2px';

    setMarks(prev => [...prev, { id, element: el }]);
  }, [marking]);

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [handleClick]);

  const undo = () => {
    const last = marks[marks.length - 1];
    if (!last) return;
    last.element.dataset.marked = '';
    last.element.style.removeProperty('background');
    last.element.style.removeProperty('border-bottom');
    last.element.style.removeProperty('border-radius');
    setMarks(prev => prev.slice(0, -1));
  };

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar-dock" role="toolbar" aria-label="Page annotation">
        <div className="toolbar-inner">
          <button
            onClick={() => setMarking(false)}
            aria-pressed={!marking}
            className={`toolbar-btn ${!marking ? 'toolbar-btn-active' : ''}`}
          >
            <BrowseIco />
            <span className="toolbar-label">Browse</span>
          </button>

          <button
            onClick={() => setMarking(true)}
            aria-pressed={marking}
            className={`toolbar-btn ${marking ? 'toolbar-btn-active toolbar-btn-mark' : ''}`}
          >
            <MarkIco />
            <span className="toolbar-label">Mark</span>
          </button>

          {marks.length > 0 && (
            <>
              <span className="toolbar-sep" />
              <button onClick={undo} className="toolbar-btn" aria-label="Undo last mark">
                <UndoIco />
                <span className="toolbar-label">Undo</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cursor indicator when in mark mode */}
      {marking && (
        <style>{`
          main * { cursor: crosshair !important; }
          main p:hover, main h1:hover, main h2:hover, main h3:hover,
          main li:hover, main a:hover, main span:hover, main label:hover {
            outline: 2px dashed oklch(50% 0.22 25 / 0.4) !important;
            outline-offset: 2px !important;
            border-radius: 2px !important;
          }
        `}</style>
      )}

      {/* Hint */}
      {showHint && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-fade-up pointer-events-none">
          <div className="px-4 py-2.5 rounded-lg bg-[var(--color-paper-2)] border border-[var(--color-accent)]/30 shadow-lg text-xs text-[var(--color-ink-muted)] text-center max-w-[280px]">
            <span className="text-[var(--color-accent)] font-semibold">Interactive resume</span> — switch to <strong>Mark</strong> to highlight sentences that interest you.
          </div>
        </div>
      )}
    </>
  );
};

const BrowseIco = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3l6 14 2-6 6-2L3 3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MarkIco = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13.5 3.5l3 3M4 13l9-9 3 3-9 9H4v-3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UndoIco = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 7h9a4 4 0 010 8H9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 4L4 7l3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default PenCanvas;
