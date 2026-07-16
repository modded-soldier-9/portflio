'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'circle' | 'rectangle' | 'none';

const PenCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [hasDrawn, setHasDrawn] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const shapeStart = useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevData = canvas.width > 0 && canvas.height > 0
      ? ctx.getImageData(0, 0, canvas.width, canvas.height)
      : null;

    const w = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    canvas.width = w;
    canvas.height = h;

    if (prevData) ctx.putImageData(prevData, 0, 0);
  }, []);

  useEffect(() => {
    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(document.documentElement);
    window.addEventListener('resize', resizeCanvas);
    return () => { observer.disconnect(); window.removeEventListener('resize', resizeCanvas); };
  }, [resizeCanvas]);

  const getPos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDraw = (e: React.PointerEvent) => {
    if (tool === 'none') return;
    e.preventDefault();
    const pos = getPos(e);
    setIsDrawing(true);
    lastPos.current = pos;

    if (tool === 'circle' || tool === 'rectangle') {
      shapeStart.current = pos;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const draw = (e: React.PointerEvent) => {
    if (!isDrawing || tool === 'none') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const pos = getPos(e);

    if (tool === 'circle' || tool === 'rectangle') {
      if (!shapeStart.current || !snapshotRef.current) return;
      ctx.putImageData(snapshotRef.current, 0, 0);

      const sx = shapeStart.current.x;
      const sy = shapeStart.current.y;
      const w = pos.x - sx;
      const h = pos.y - sy;

      ctx.strokeStyle = 'oklch(50% 0.22 25)';
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.9;
      ctx.setLineDash([]);

      if (tool === 'circle') {
        const cx = sx + w / 2;
        const cy = sy + h / 2;
        const rx = Math.abs(w / 2);
        const ry = Math.abs(h / 2);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.rect(sx, sy, w, h);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      return;
    }

    if (!lastPos.current) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === 'pen') {
      ctx.strokeStyle = 'oklch(50% 0.22 25)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.9;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = 'oklch(88% 0.18 90)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'butt';
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.4;
    } else if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 28;
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
    if (isDrawing && (tool === 'circle' || tool === 'rectangle')) {
      if (!hasDrawn) setHasDrawn(true);
    }
    setIsDrawing(false);
    lastPos.current = null;
    shapeStart.current = null;
    snapshotRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const cursorClass = tool === 'none' ? '' : 'cursor-crosshair';

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 z-40 ${cursorClass}`}
        style={{
          pointerEvents: tool !== 'none' ? 'auto' : 'none',
          touchAction: 'none',
        }}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
      />

      {/* Toolbar — always visible, pulsing glow */}
      <div className="toolbar-dock">
        <div className="toolbar-inner">
          <ToolBtn active={tool === 'pen'} onClick={() => setTool(tool === 'pen' ? 'none' : 'pen')} label="Red pen" color="pen">
            <PenIcon />
          </ToolBtn>
          <ToolBtn active={tool === 'highlighter'} onClick={() => setTool(tool === 'highlighter' ? 'none' : 'highlighter')} label="Highlighter" color="highlight">
            <HighlightIcon />
          </ToolBtn>
          <ToolBtn active={tool === 'circle'} onClick={() => setTool(tool === 'circle' ? 'none' : 'circle')} label="Circle" color="pen">
            <CircleIcon />
          </ToolBtn>
          <ToolBtn active={tool === 'rectangle'} onClick={() => setTool(tool === 'rectangle' ? 'none' : 'rectangle')} label="Rectangle" color="pen">
            <RectIcon />
          </ToolBtn>
          <ToolBtn active={tool === 'eraser'} onClick={() => setTool(tool === 'eraser' ? 'none' : 'eraser')} label="Eraser" color="neutral">
            <EraserIcon />
          </ToolBtn>

          <div className="w-px h-5 bg-[var(--color-rule)] mx-1" />

          {hasDrawn && (
            <button onClick={clearCanvas} className="toolbar-text-btn" aria-label="Clear all">
              Clear
            </button>
          )}
          <button
            onClick={() => setTool('none')}
            className={`toolbar-text-btn ${tool === 'none' ? '!text-[var(--color-accent)]' : ''}`}
            aria-label="Browse mode"
          >
            Browse
          </button>
        </div>
      </div>

      {!hasDrawn && tool !== 'none' && (
        <div className="fixed top-20 right-4 z-50 animate-fade-up pointer-events-none">
          <div className="px-3 py-2 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)] shadow-md text-[11px] text-[var(--color-ink-muted)] max-w-[200px]">
            ✏️ Draw, circle, or highlight anything on this page. Click <strong>Browse</strong> to navigate.
          </div>
        </div>
      )}
    </>
  );
};

function ToolBtn({ active, onClick, label, children, color }: { active: boolean; onClick: () => void; label: string; children: React.ReactNode; color: 'pen' | 'highlight' | 'neutral' }) {
  const activeColors = { pen: 'bg-[oklch(50%_0.22_25)]', highlight: 'bg-[oklch(75%_0.15_90)]', neutral: 'bg-[var(--color-ink-faint)]' };
  return (
    <button onClick={onClick} aria-label={label} aria-pressed={active} className={`p-2 rounded-full transition-all ${active ? `${activeColors[color]} text-white scale-110` : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-3)]'}`}>
      {children}
    </button>
  );
}

const PenIcon = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13.5 3.5l3 3M4 13l9-9 3 3-9 9H4v-3z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const HighlightIcon = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="7" y="2" width="6" height="14" rx="1" transform="rotate(15 10 9)" /><path d="M6 16h8" strokeLinecap="round" /></svg>;
const CircleIcon = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="10" cy="10" rx="7" ry="7" /></svg>;
const RectIcon = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="14" height="12" rx="1" /></svg>;
const EraserIcon = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 13l6-6 3 3-6 6H7v-3z" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 17h12" strokeLinecap="round" /></svg>;

export default PenCanvas;
