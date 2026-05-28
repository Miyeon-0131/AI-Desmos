export type GraphPaperPixelBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function getGraphPaperPixelBounds(calculator: any): GraphPaperPixelBounds | null {
  const pb = calculator?.graphpaperBounds?.pixelCoordinates;
  if (!pb || pb.width <= 0 || pb.height <= 0) return null;

  return {
    left: pb.left,
    top: pb.top,
    width: pb.width,
    height: pb.height,
  };
}

export function clientToMathCoords(
  calculator: any,
  calculatorRect: DOMRect,
  clientX: number,
  clientY: number,
): { x: number; y: number } | null {
  if (typeof calculator?.pixelsToMath !== 'function') return null;

  const px = clientX - calculatorRect.left;
  const py = clientY - calculatorRect.top;
  const math = calculator.pixelsToMath({ x: px, y: py });

  if (typeof math?.x !== 'number' || typeof math?.y !== 'number') return null;
  if (!Number.isFinite(math.x) || !Number.isFinite(math.y)) return null;

  return { x: math.x, y: math.y };
}

export function mathToOverlayCoords(
  calculator: any,
  graphBounds: GraphPaperPixelBounds,
  mathX: number,
  mathY: number,
): { x: number; y: number } | null {
  if (typeof calculator?.mathToPixels !== 'function') return null;

  const pix = calculator.mathToPixels({ x: mathX, y: mathY });
  if (typeof pix?.x !== 'number' || typeof pix?.y !== 'number') return null;

  return {
    x: pix.x - graphBounds.left,
    y: pix.y - graphBounds.top,
  };
}

export function getAdaptiveSampleDistance(points: { x: number; y: number }[]): number {
  if (points.length < 2) return 0.01;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  const diagonal = Math.hypot(maxX - minX, maxY - minY);
  return Math.max(0.003, diagonal / 450);
}
