import { Fragment, type ReactNode } from 'react';

/**
 * Konexy (the brand display face) has no apostrophe, hyphen, colon, question or exclamation mark.
 * K draws an apostrophe that matches Konexy's stroke and sets the other marks in Sora, while keeping
 * the real characters available to screen readers.
 */
export function K({ children }: { children: string }) {
  const parts = children.split(/(['’?!:\-&])/);
  return (
    <>
      {parts.map((p, i) => {
        if (p === "'" || p === '’')
          return (
            <Fragment key={i}>
              <span className="k-apos" aria-hidden="true" />
              <span className="sr-only">’</span>
            </Fragment>
          );
        if (/^[?!:\-&]$/.test(p)) return <span key={i} className="k-glyph">{p}</span>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

// Konexy advance widths per character (in hundredths of an em), measured from the font file.
const KW: Record<string, number> = {
  A: 104, B: 96, C: 99, D: 101, E: 91, F: 90, G: 100, H: 102, I: 23, J: 83, K: 96, L: 87, M: 109, N: 97, O: 101, P: 92, Q: 105, R: 95, S: 93,
  T: 88, U: 97, V: 104, W: 141, X: 89, Y: 91, Z: 89, '0': 91, '1': 31, '2': 89, '3': 88, '4': 85, '5': 90, '6': 89, '7': 83, '8': 89, '9': 89,
  '.': 18, ',': 18, "'": 20, '’': 20, '?': 62, '!': 30, ':': 30, '-': 50, '&': 80,
};
/** Width in em of the widest single word, including Konexy letter-spacing (0.015em). */
export function widestWordEm(lines: string[]) {
  let max = 0;
  for (const word of lines.join(' ').toUpperCase().split(/\s+/)) {
    const w = [...word].reduce((n, ch) => n + (KW[ch] ?? 95) / 100 + 0.015, 0);
    max = Math.max(max, w);
  }
  return Math.max(max, 1);
}

/**
 * Display headline split into masked lines (animated by MaskReveal or CSS).
 * The wrapper is a size container: each line is capped so its widest word always fits the
 * column, so even very long words never overflow on narrow screens.
 */
export function Lines({ lines, accent }: { lines: string[]; accent?: number[] }): ReactNode {
  return (
    <span className="fit-box" style={{ ['--fit' as string]: widestWordEm(lines).toFixed(3) }}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span className={accent?.includes(i) ? 'text-spark' : undefined}>
            <K>{line}</K>
          </span>
          {i < lines.length - 1 && <span className="sr-only"> </span>}
        </span>
      ))}
    </span>
  );
}
