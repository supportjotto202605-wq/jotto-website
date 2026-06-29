"use client";
import { useEffect, useState } from "react";

type Edge = -1 | 0 | 1;
interface PieceDef {
  col: number; row: number;
  edges: { t: Edge; r: Edge; b: Edge; l: Edge };
  color?: { fill: string; stroke: string; label: string; fromX: number; fromY: number; delay: number; };
}

const COLS = 4, ROWS = 2, W = 150, H = 150, TAB = 22;

function buildPieces(): PieceDef[] {
  const pieces: PieceDef[] = [];
  for (let row = 0; row < ROWS; row++)
    for (let col = 0; col < COLS; col++)
      pieces.push({ col, row, edges: { t: row===0?0:-1, r: col===COLS-1?0:1, b: row===ROWS-1?0:1, l: col===0?0:-1 } });
  return pieces;
}

function piecePath(t: Edge, r: Edge, b: Edge, l: Edge): string {
  const s: string[] = ["M 0 0"];
  const side = (x1:number,y1:number,x2:number,y2:number,nx:number,ny:number,e:Edge) => {
    if(e===0){s.push(`L ${x2} ${y2}`);return;}
    const dx=x2-x1,dy=y2-y1,off=TAB*1.9*e;
    const ax=x1+dx*0.36,ay=y1+dy*0.36,bx=x1+dx*0.64,by=y1+dy*0.64;
    const c1x=x1+dx*0.28+nx*off,c1y=y1+dy*0.28+ny*off;
    const c2x=x1+dx*0.72+nx*off,c2y=y1+dy*0.72+ny*off;
    s.push(`L ${ax.toFixed(2)} ${ay.toFixed(2)}`);
    s.push(`C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${bx.toFixed(2)} ${by.toFixed(2)}`);
    s.push(`L ${x2} ${y2}`);
  };
  side(0,0,W,0,0,-1,t); side(W,0,W,H,1,0,r); side(W,H,0,H,0,1,b); side(0,H,0,0,-1,0,l);
  s.push("Z");
  return s.join(" ");
}

const COLORED: Record<string, NonNullable<PieceDef["color"]>> = {
  "0,0": { fill: "#1a1408", stroke: "#C0392B", label: "REAL ESTATE", fromX: -300, fromY: -200, delay: 150 },
  "1,1": { fill: "#0a1018", stroke: "#4a7fa8", label: "TECHNOLOGY", fromX: -300, fromY: 200, delay: 300 },
  "3,1": { fill: "#1a0e08", stroke: "#8a5a3a", label: "OUTSOURCING", fromX: 300, fromY: 200, delay: 450 },
};

const PIECES = buildPieces().map(p => {
  const c = COLORED[`${p.col},${p.row}`];
  return c ? { ...p, color: c } : p;
});

export function PuzzleVisualization() {
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 300);
    return () => clearTimeout(t);
  }, []);

  const boardW = W * COLS, boardH = H * ROWS, framePad = 56;
  const frameW = boardW + framePad * 2, frameH = boardH + framePad * 2;

  return (
    <div style={{ backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
      <div style={{ position: "relative", width: frameW, height: frameH, border: "2px solid #C0392B", borderRadius: 6 }}>
        <div style={{ position: "absolute", left: "50%", top: -14, transform: "translateX(-50%)", padding: "0 16px", backgroundColor: "#0a0a0a", color: "#C0392B", fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.45em" }}>
          JOTTO
        </div>
        <div style={{ position: "absolute", left: framePad, top: framePad, width: boardW, height: boardH, backgroundColor: "#141414", borderRadius: 2 }}>
          {PIECES.map((p) => {
            const svgW = W + TAB * 2;
            const svgH = H + TAB * 2;
            const left = p.col * W - TAB;
            const top = p.row * H - TAB;
            return (
              <div
                key={`${p.col},${p.row}`}
                style={{
                  position: "absolute",
                  left,
                  top,
                  width: svgW,
                  height: svgH,
                  zIndex: p.color ? 2 : 1,
                  transform: p.color && !assembled ? `translate(${p.color.fromX}px, ${p.color.fromY}px)` : "translate(0,0)",
                  opacity: p.color && !assembled ? 0 : 1,
                  transition: p.color
                    ? `transform 900ms cubic-bezier(0.34, 1.56, 0.64, 1) ${p.color.delay}ms, opacity 400ms ease ${p.color.delay}ms`
                    : undefined,
                }}
              >
                <Piece piece={p} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Piece({ piece }: { piece: PieceDef }) {
  const { col, row, edges, color } = piece;
  const svgW = W + TAB * 2, svgH = H + TAB * 2;
  const isColored = !!color;
  const path = piecePath(edges.t, edges.r, edges.b, edges.l);
  const patternId = `jotto-grid-${col}-${row}`;

  return (
    <div style={{ width: svgW, height: svgH }}>
      <svg width={svgW} height={svgH} viewBox={`${-TAB} ${-TAB} ${svgW} ${svgH}`} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <pattern id={patternId} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M 14 0 L 0 0 0 14" fill="none" stroke={isColored ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.03)"} strokeWidth="1" />
          </pattern>
        </defs>
        <path d={path} fill={color?.fill ?? "#1a1a1a"} stroke={color?.stroke ?? "#2a2a2a"} strokeWidth={isColored ? 1.5 : 1} strokeLinejoin="round" />
        <path d={path} fill={`url(#${patternId})`} />
      </svg>
      {isColored && color && (
        <div style={{ position: "absolute", left: TAB, top: TAB, width: W, height: H, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: "ui-sans-serif, system-ui, sans-serif", textAlign: "center", padding: "0 8px" }}>
          <span style={{ color: "#f0ede8", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", lineHeight: 1.2, textTransform: "uppercase" }}>{color.label}</span>
        </div>
      )}
    </div>
  );
}

export default PuzzleVisualization;
