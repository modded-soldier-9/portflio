'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'circle' | 'rectangle' | 'none';

const PenCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('none');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const shapeStart = useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);

  // Default to pen on desktop, none (browse) on mobile
  useEffect(() => {
    if (window.innerWidth >= 768) setTool('pen');
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevData = canvas.width > 0 && canvas.height > 0
      ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;

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

  // Use pageX/pageY — most accurate since canvas is at document origin
  const getPos = (e: React.PointerEvent) => ({ x: e.pageX, y: e.pageY });

  const startDraw = (e: React.PointerEvent) => {
    if (tool === 'none') return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pos = getPos(e);
    setIsDrawing(true);
    lastPos.current = pos;

    if (tool === 'circle' || tool === 'rectangle') {
      shapeStart.current = pos;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
      const sx = shapeStart.current.x, sy = shapeStart.current.y;
      const w = pos.x - sx, h = pos.y - sy;
      ctx.strokeStyle = 'oklch(50% 0.22 25)';
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.9;
      ctx.setLineDash([]);
      if (tool === 'circle') {
        ctx.beginPath();
        ctx.ellipse(sx + w/2, sy + h/2, Math.abs(w/2), Math.abs(h/2), 0, 0, Math.PI*2);
        ctx.stroke();
      } else {
        ctx.beginPath(); ctx.rect(sx, sy, w, h); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      return;
    }

    if (!lastPos.current) return;
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === 'pen') {
      ctx.strokeStyle = 'oklch(50% 0.22 25)'; ctx.lineWidth = 2.5;
      ctx.lineCap = 'round'; ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 0.9;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = 'oklch(88% 0.18 90)'; ctx.lineWidth = 18;
      ctx.lineCap = 'butt'; ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.4;
    } else if (tool === 'eraser') {
      ctx.strokeStyle = 'white'; ctx.lineWidth = 28;
      ctx.lineCap = 'round'; ctx.globalCompositeOperation = 'destination-out'; ctx.globalAlpha = 1;
    }
    ctx.stroke();
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    lastPos.current = pos;
    if (!hasDrawn) setHasDrawn(true);
  };

  const endDraw = () => {
    if (isDrawing && (tool === 'circle' || tool === 'rectangle') && !hasDrawn) setHasDrawn(true);
    setIsDrawing(false); lastPos.current = null;
    shapeStart.current = null; snapshotRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 z-40 ${tool !== 'none' ? 'cursor-crosshair' : ''}`}
        style={{ pointerEvents: tool !== 'none' ? 'auto' : 'none', touchAction: tool !== 'none' ? 'none' : 'auto' }}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerCancel={endDraw}
      />

      {/* Toolbar */}
      <div className="toolbar-dock" role="toolbar" aria-label="Drawing tools">
        <div className="toolbar-inner">
          <TBtn on={tool === 'pen'} click={() => setTool(tool === 'pen' ? 'none' : 'pen')} label="Pen" c="pen"><PenIco /></TBtn>
          <TBtn on={tool === 'highlighter'} click={() => setTool(tool === 'highlighter' ? 'none' : 'highlighter')} label="Highlight" c="hi"><HiIco /></TBtn>
          <TBtn on={tool === 'circle'} click={() => setTool(tool === 'circle' ? 'none' : 'circle')} label="Circle" c="pen"><CircIco /></TBtn>
          <TBtn on={tool === 'rectangle'} click={() => setTool(tool === 'rectangle' ? 'none' : 'rectangle')} label="Rectangle" c="pen"><RectIco /></TBtn>
          <TBtn on={tool === 'eraser'} click={() => setTool(tool === 'eraser' ? 'none' : 'eraser')} label="Erase" c="neutral"><EraseIco /></TBtn>
          <span className="toolbar-sep" />
          {hasDrawn && <button onClick={clearCanvas} className="toolbar-txt" aria-label="Clear">Clear</button>}
          <button onClick={() => setTool('none')} className={`toolbar-txt ${tool === 'none' ? 'toolbar-txt-active' : ''}`} aria-label="Browse">Browse</button>
        </div>
      </div>

      {showHint && !hasDrawn && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-fade-up pointer-events-none">
          <div className="px-4 py-2.5 rounded-lg bg-[var(--color-paper-2)] border border-[var(--color-accent)]/30 shadow-lg text-xs text-[var(--color-ink-muted)] text-center max-w-[260px]">
            <span className="text-[var(--color-accent)] font-semibold">✏️ Interactive resume</span> — use the toolbar below to draw, circle, or highlight. Click <strong>Browse</strong> to navigate.
          </div>
        </div>
      )}
    </>
  );
};

function TBtn({ on, click, label, children, c }: { on: boolean; click: () => void; label: string; children: React.ReactNode; c: 'pen'|'hi'|'neutral' }) {
  const bg = { pen: 'bg-[oklch(50%_0.22_25)]', hi: 'bg-[oklch(75%_0.15_90)]', neutral: 'bg-[var(--color-ink-faint)]' };
  return (
    <button onClick={click} aria-label={label} aria-pressed={on} className={`toolbar-btn ${on ? `${bg[c]} text-white toolbar-btn-active` : ''}`}>
      {children}
    </button>
  );
}

const PenIco = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13.5 3.5l3 3M4 13l9-9 3 3-9 9H4v-3z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const HiIco = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="7" y="2" width="6" height="14" rx="1" transform="rotate(15 10 9)"/><path d="M6 16h8" strokeLinecap="round"/></svg>;
const CircIco = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="10" cy="10" rx="7" ry="7"/></svg>;
const RectIco = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="14" height="12" rx="1"/></svg>;
const EraseIco = () => <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 13l6-6 3 3-6 6H7v-3z" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 17h12" strokeLinecap="round"/></svg>;

export default PenCanvas;
