import { useId } from 'react';
import type { ServiceArt as ArtKey } from '@/data/services';
import { SPARK_BOTTOM, SPARK_TOP } from '@/components/common/SparkMark';

/*
 * Service artworks: abstract, art-directed compositions drawn in code so they stay crisp,
 * weigh almost nothing and share one visual language (black, hairlines, faceted orange light).
 */

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#FF9810" stopOpacity="0.55" />
        <stop offset="0.5" stopColor="#FF800D" stopOpacity="0.12" />
        <stop offset="1" stopColor="#FF800D" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}facet`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFA912" />
        <stop offset="1" stopColor="#FF800D" />
      </linearGradient>
      <linearGradient id={`${id}stone`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a2826" />
        <stop offset="1" stopColor="#0a0a0a" />
      </linearGradient>
      <pattern id={`${id}grid`} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.05" />
      </pattern>
    </defs>
  );
}

const Frame = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <>
    <Defs id={id} />
    <rect width="800" height="600" fill="#0b0b0b" />
    <rect width="800" height="600" fill={`url(#${id}grid)`} />
    {children}
  </>
);

const art: Record<ArtKey, (id: string) => React.ReactNode> = {
  identity: (id) => (
    <Frame id={id}>
      <circle cx="430" cy="300" r="250" fill={`url(#${id}glow)`} />
      {/* construction drawing of the spark mark */}
      <g stroke="#fff" strokeOpacity="0.18" fill="none">
        <circle cx="430" cy="300" r="210" />
        <circle cx="430" cy="300" r="140" strokeDasharray="4 6" />
        <path d="M120 300H740M430 40V560M220 90 640 510M640 90 220 510" />
      </g>
      <g transform="translate(300 110) scale(0.52)">
        <path d={SPARK_TOP} fill={`url(#${id}facet)`} />
        <path d={SPARK_BOTTOM} fill="#FF800D" />
        <path d={SPARK_TOP} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      </g>
      <g fill="#FFA912">
        {[[350, 228], [552, 110], [314, 326], [388, 280], [300, 492]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="4" />
        ))}
      </g>
      <text x="60" y="560" fill="#fff" fillOpacity="0.4" fontSize="13" fontFamily="Sora" letterSpacing="3">CONSTRUCTION 1:1</text>
    </Frame>
  ),
  web: (id) => (
    <Frame id={id}>
      <ellipse cx="420" cy="330" rx="320" ry="220" fill={`url(#${id}glow)`} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${130 + i * 70} ${90 + i * 60})`} opacity={0.35 + i * 0.32}>
          <rect width="440" height="290" rx="10" fill="#111" stroke="#fff" strokeOpacity="0.18" />
          <rect width="440" height="26" rx="10" fill="#191919" />
          {[14, 30, 46].map((x) => <circle key={x} cx={x} cy="13" r="4" fill="#fff" fillOpacity="0.25" />)}
          <rect x="28" y="62" width="230" height="22" fill="#fff" fillOpacity="0.85" />
          <rect x="28" y="92" width="170" height="22" fill="#FF800D" />
          <rect x="28" y="134" width="190" height="6" fill="#fff" fillOpacity="0.25" />
          <rect x="28" y="148" width="150" height="6" fill="#fff" fillOpacity="0.25" />
          <rect x="28" y="180" width="96" height="28" rx="14" fill="#FF800D" />
          <rect x="280" y="54" width="132" height="200" fill={`url(#${id}stone)`} stroke="#FF9810" strokeOpacity="0.4" />
        </g>
      ))}
    </Frame>
  ),
  interface: (id) => (
    <Frame id={id}>
      <circle cx="400" cy="300" r="260" fill={`url(#${id}glow)`} />
      <g transform="translate(300 70)">
        <rect width="200" height="420" rx="34" fill="#0d0d0d" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
        <rect x="70" y="14" width="60" height="8" rx="4" fill="#fff" fillOpacity="0.2" />
        <rect x="20" y="50" width="110" height="14" fill="#fff" fillOpacity="0.85" />
        <rect x="20" y="80" width="160" height="110" rx="14" fill={`url(#${id}facet)`} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(20 ${210 + i * 58})`}>
            <rect width="160" height="46" rx="12" fill="#1a1a1a" />
            <circle cx="24" cy="23" r="11" fill="#FF800D" fillOpacity={0.9 - i * 0.25} />
            <rect x="46" y="15" width="80" height="6" fill="#fff" fillOpacity="0.6" />
            <rect x="46" y="27" width="56" height="5" fill="#fff" fillOpacity="0.25" />
          </g>
        ))}
      </g>
      <g stroke="#FFA912" strokeOpacity="0.7" fill="none" strokeDasharray="3 5">
        <path d="M120 140C200 140 220 230 300 230" />
        <path d="M680 380C600 380 590 300 500 300" />
      </g>
      <g fill="#111" stroke="#fff" strokeOpacity="0.25">
        <rect x="40" y="110" width="80" height="60" rx="10" />
        <rect x="680" y="350" width="90" height="60" rx="10" />
      </g>
    </Frame>
  ),
  growth: (id) => (
    <Frame id={id}>
      <circle cx="610" cy="150" r="200" fill={`url(#${id}glow)`} />
      <g stroke="#fff" strokeOpacity="0.1">
        {[150, 250, 350, 450].map((y) => <path key={y} d={`M60 ${y}H760`} />)}
      </g>
      <path d="M60 480 180 440 270 455 360 380 450 395 540 290 630 240 700 160" fill="none" stroke="#FF800D" strokeWidth="3" />
      <path d="M60 480 180 440 270 455 360 380 450 395 540 290 630 240 700 160V520H60Z" fill="#FF800D" fillOpacity="0.08" />
      <path d="M60 500 180 488 270 492 360 470 450 474 540 450 630 440 700 420" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 6" />
      <circle cx="700" cy="160" r="9" fill="#FFA912" />
      <circle cx="700" cy="160" r="22" fill="none" stroke="#FFA912" strokeOpacity="0.5" />
      {[[180, 440], [360, 380], [540, 290]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill="#fff" />)}
    </Frame>
  ),
  search: (id) => (
    <Frame id={id}>
      <circle cx="400" cy="300" r="280" fill={`url(#${id}glow)`} />
      <g fill="none" stroke="#fff">
        {[60, 120, 180, 240].map((r, i) => <circle key={r} cx="400" cy="300" r={r} strokeOpacity={0.24 - i * 0.04} />)}
      </g>
      <path d="M400 300 L620 160" stroke="#FF800D" strokeWidth="2" />
      <path d="M400 300 L620 160 A260 260 0 0 1 660 300 Z" fill="#FF800D" fillOpacity="0.12" />
      {[[300, 210, 0.3], [520, 380, 0.3], [250, 400, 0.3], [470, 190, 0.5], [580, 210, 1]].map(([x, y, o]) => (
        <circle key={`${x}`} cx={x} cy={y} r={o === 1 ? 9 : 5} fill={o === 1 ? '#FFA912' : '#fff'} fillOpacity={o} />
      ))}
      <g transform="translate(470 120)">
        <rect width="230" height="56" rx="10" fill="#141414" stroke="#FF9810" strokeOpacity="0.6" />
        <rect x="16" y="14" width="150" height="8" fill="#FFA912" />
        <rect x="16" y="32" width="190" height="6" fill="#fff" fillOpacity="0.3" />
      </g>
    </Frame>
  ),
  content: (id) => (
    <Frame id={id}>
      <circle cx="400" cy="300" r="260" fill={`url(#${id}glow)`} />
      {[
        [110, 120, -8, '#191919'],
        [270, 80, 4, '#FF800D'],
        [450, 130, -3, '#f5f2ec'],
        [190, 300, 6, '#f5f2ec'],
        [380, 300, -6, '#191919'],
        [560, 290, 5, '#FFA912'],
      ].map(([x, y, r, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect width="150" height="190" fill={c as string} stroke="#fff" strokeOpacity="0.12" />
          <rect x="16" y="20" width="80" height="10" fill={c === '#f5f2ec' ? '#141210' : '#fff'} fillOpacity="0.8" />
          <rect x="16" y="38" width="110" height="10" fill={c === '#f5f2ec' ? '#141210' : '#fff'} fillOpacity="0.8" />
          <rect x="16" y="150" width="60" height="5" fill={c === '#f5f2ec' ? '#141210' : '#fff'} fillOpacity="0.4" />
        </g>
      ))}
    </Frame>
  ),
  lens: (id) => (
    <Frame id={id}>
      <circle cx="400" cy="300" r="270" fill={`url(#${id}glow)`} />
      <circle cx="400" cy="300" r="200" fill="#0d0d0d" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="400" cy="300" r="185" fill="none" stroke="#fff" strokeOpacity="0.1" strokeDasharray="2 8" />
      {Array.from({ length: 7 }, (_, i) => (
        <path
          key={i}
          transform={`rotate(${i * (360 / 7)} 400 300)`}
          d="M400 300 L400 130 A170 170 0 0 1 532 194 Z"
          fill={i % 2 ? '#1c1a18' : '#24211e'}
          stroke="#FF800D"
          strokeOpacity="0.35"
        />
      ))}
      <circle cx="400" cy="300" r="46" fill={`url(#${id}facet)`} />
      <circle cx="384" cy="284" r="10" fill="#fff" fillOpacity="0.7" />
    </Frame>
  ),
  automation: (id) => (
    <Frame id={id}>
      <circle cx="400" cy="300" r="260" fill={`url(#${id}glow)`} />
      <g fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.5">
        <path d="M140 160H300V300H460V160H640" />
        <path d="M300 300V440H500V300" />
      </g>
      <path d="M140 160H300V300H460V160H640" fill="none" stroke="#FF800D" strokeWidth="2.5" strokeDasharray="10 380" />
      {[
        [140, 160, 'IN'],
        [300, 300, ''],
        [460, 160, ''],
        [640, 160, 'OUT'],
        [300, 440, ''],
        [500, 440, ''],
      ].map(([x, y, l], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x="-34" y="-24" width="68" height="48" rx="10" fill={i === 1 || i === 2 ? '#FF800D' : '#141414'} stroke="#fff" strokeOpacity="0.3" />
          {l && <text y="5" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Sora" letterSpacing="2">{l}</text>}
        </g>
      ))}
    </Frame>
  ),
  transform: (id) => (
    <Frame id={id}>
      <circle cx="420" cy="300" r="270" fill={`url(#${id}glow)`} />
      {/* wireframe cube becoming solid */}
      <g transform="translate(170 300)" fill="none" stroke="#fff" strokeOpacity="0.35">
        <path d="M0 -70 60 -105 120 -70 120 0 60 35 0 0Z M0 -70 60 -35 120 -70 M60 -35V35" />
      </g>
      <g transform="translate(340 300)" stroke="#FF9810" strokeOpacity="0.6">
        <path d="M0 -70 60 -105 120 -70 120 0 60 35 0 0Z" fill="#FF800D" fillOpacity="0.1" />
        <path d="M0 -70 60 -35 120 -70 M60 -35V35" fill="none" />
      </g>
      <g transform="translate(510 300)">
        <path d="M0 -70 60 -105 120 -70 60 -35Z" fill="#FFA912" />
        <path d="M0 -70 60 -35 60 35 0 0Z" fill="#FF800D" />
        <path d="M120 -70 60 -35 60 35 120 0Z" fill="#b85a06" />
      </g>
      <path d="M120 420H690" stroke="#fff" strokeOpacity="0.2" />
      {[170, 400, 570].map((x, i) => <text key={x} x={x} y="450" fill="#fff" fillOpacity="0.45" fontSize="12" fontFamily="Sora" letterSpacing="2">{['TODAY', 'PHASE', 'NEXT'][i]}</text>)}
    </Frame>
  ),
};

export function ServiceArt({ art: key, className, title }: { art: ArtKey; className?: string; title?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 800 600" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} preserveAspectRatio="xMidYMid slice">
      {art[key](id)}
    </svg>
  );
}
