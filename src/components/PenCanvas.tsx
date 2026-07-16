'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'none';

const PenCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [hasDrawn, setHasDrawn] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save current drawing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;

    // Restore drawing
    ctx.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(document.body);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  const getPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left + window.scrollX,
      y: e.clientY - rect.top + window.scrollY,
    };
  };

  const startDraw = (e: React.PointerEvent) => {
    if (tool === 'none') return;
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.PointerEvent) => {
    if (!isDrawing || tool === 'none') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPos.current) return;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === 'pen') {
      ctx.strokeStyle = 'oklch(50% 0.22 25)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.85;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = 'oklch(85% 0.18 90)';
      ctx.lineWidth = 16;
      ctx.lineCap = 'square';
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.35;
    } else if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
    }

    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    lastPos.current = pos;
    if (!hasDrawn) setHasDrawn(true);
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const cursorStyle = tool === 'pen'
    ? 'crosshair'
    : tool === 'highlighter'
    ? 'text'
    : tool === 'eraser'
    ? 'cell'
    : 'auto';

  return (
    <>
      {/* Drawing canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-30"
        style={{
          pointerEvents: tool !== 'none' ? 'auto' : 'none',
          cursor: cursorStyle,
          touchAction: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
      />

      {/* Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] shadow-lg backdrop-blur-sm">
        <ToolBtn
          active={tool === 'pen'}
          onClick={() => setTool(tool === 'pen' ? 'none' : 'pen')}
          label="Red pen"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13.5 3.5l3 3M4 13l9-9 3 3-9 9H4v-3z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ToolBtn>

        <ToolBtn
          active={tool === 'highlighter'}
          onClick={() => setTool(tool === 'highlighter' ? 'none' : 'highlighter')}
          label="Highlighter"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="7" y="2" width="6" height="14" rx="1" transform="rotate(15 10 9)" />
            <path d="M6 16h8" strokeLinecap="round" />
          </svg>
        </ToolBtn>

        <ToolBtn
          active={tool === 'eraser'}
          onClick={() => setTool(tool === 'eraser' ? 'none' : 'eraser')}
          label="Eraser"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 13l6-6 3 3-6 6H7v-3z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 17h12" strokeLinecap="round" />
          </svg>
        </ToolBtn>

        <div className="w-px h-5 bg-[var(--color-rule)] mx-1" />

        {hasDrawn && (
          <button
            onClick={clearCanvas}
            className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Clear all marks"
          >
            Clear
          </button>
        )}

        <button
          onClick={() => setTool('none')}
          className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
            tool === 'none' ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]'
          }`}
          aria-label="Browse mode (disable pen)"
        >
          Browse
        </button>
      </div>

      {/* Hint on first load */}
      {!hasDrawn && tool === 'pen' && (
        <div className="fixed top-20 right-6 z-50 animate-fade-up">
          <div className="px-3 py-2 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)] shadow-md text-[11px] text-[var(--color-ink-muted)] max-w-[180px]">
            Draw on this page with the red pen &mdash; mark what interests you.
          </div>
        </div>
      )}
    </>
  );
};

function ToolBtn({ active, onClick, label, children }: {
  active: boolean; onClick: () => void; label: string; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`p-2 rounded-full transition-colors ${
        active
          ? 'bg-[var(--color-accent)] text-white'
          : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-3)]'
      }`}
    >
      {children}
    </button>
  );
}

export default PenCanvas;
