import { useId } from 'react';
import { SPARK_BOTTOM, SPARK_TOP, SPARK_TOP_HI, SPARK_TOP_SHADE, SPARK_BOTTOM_HI } from '@/components/common/SparkMark';

/*
 * Project artboards drawn in code. The FLINTORA artboards depict our own site and intro.
 * The Halden, Kesar and Loop artboards are concept work for fictional brands and are always
 * presented with a "Concept study" label.
 */

const Mark = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={SPARK_TOP} fill="#FF800D" />
    <path d={SPARK_TOP_SHADE} fill="#FF9810" />
    <path d={SPARK_TOP_HI} fill="#FFA912" />
    <path d={SPARK_BOTTOM} fill="#FF800D" />
    <path d={SPARK_BOTTOM_HI} fill="#FFA912" />
  </g>
);

const SunMark = ({ x, y, s, c = '#F5D9A8' }: { x: number; y: number; s: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c} strokeLinecap="round" fill="none">
    <path d="M-60 0A60 60 0 0 1 60 0" strokeWidth="5" />
    {Array.from({ length: 9 }, (_, i) => {
      const a = Math.PI + (i / 8) * Math.PI;
      return <path key={i} d={`M${Math.cos(a) * 74} ${Math.sin(a) * 74}L${Math.cos(a) * 104} ${Math.sin(a) * 104}`} strokeWidth="5" />;
    })}
    <path d="M-110 18H110" strokeWidth="5" />
  </g>
);

const boards: Record<string, (id: string) => React.ReactNode> = {
  flagship: (id) => (
    <>
      <defs>
        <radialGradient id={`${id}g`} cx="70%" cy="45%" r="55%">
          <stop offset="0" stopColor="#FF800D" stopOpacity="0.35" />
          <stop offset="1" stopColor="#040404" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="#0b0b0b" />
      <g transform="translate(130 110)">
        <rect width="1340" height="790" rx="18" fill="#040404" stroke="#fff" strokeOpacity="0.14" />
        <rect width="1340" height="790" rx="18" fill={`url(#${id}g)`} />
        <rect x="40" y="36" width="110" height="14" fill="#fff" fillOpacity="0.85" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={760 + i * 100} y="38" width="64" height="9" fill="#fff" fillOpacity="0.35" />)}
        <rect x="1180" y="28" width="120" height="30" rx="15" fill="#FF800D" />
        <text x="60" y="330" fill="#fff" fontFamily="Konexy, Sora" fontSize="118" letterSpacing="2">WE CREATE</text>
        <text x="60" y="450" fill="#fff" fontFamily="Konexy, Sora" fontSize="118" letterSpacing="2">WHAT IS NEXT.</text>
        <rect x="60" y="500" width="420" height="10" fill="#fff" fillOpacity="0.3" />
        <rect x="60" y="522" width="340" height="10" fill="#fff" fillOpacity="0.3" />
        <rect x="60" y="580" width="190" height="52" rx="26" fill="#FF800D" />
        <rect x="270" y="580" width="210" height="52" rx="26" fill="none" stroke="#fff" strokeOpacity="0.3" />
        <Mark x={930} y={170} s={0.62} />
        {[[880, 200, 26], [1210, 520, 18], [1130, 180, 12], [860, 600, 16]].map(([x, y, r]) => (
          <polygon key={x} points={`${x},${y - r} ${x + r},${y} ${x},${y + r * 0.8} ${x - r * 0.9},${y}`} fill="#1d1b19" stroke="#fff" strokeOpacity="0.15" />
        ))}
      </g>
    </>
  ),
  awakening: () => (
    <>
      <rect width="1600" height="1000" fill="#0b0b0b" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${90 + i * 360} 250)`}>
          <rect width="330" height="420" rx="12" fill="#040404" stroke="#fff" strokeOpacity="0.14" />
          <text x="20" y="400" fill="#fff" fillOpacity="0.5" fontFamily="Sora" fontSize="18" letterSpacing="3">{['01 DARKNESS', '02 STRIKE', '03 SPARK', '04 REVEAL'][i]}</text>
          {i === 0 && Array.from({ length: 26 }, (_, k) => <circle key={k} cx={30 + ((k * 97) % 270)} cy={40 + ((k * 61) % 300)} r={1 + (k % 3)} fill="#FF9810" fillOpacity={0.3 + (k % 4) * 0.15} />)}
          {i === 1 && (
            <>
              <polygon points="40,190 110,150 150,200 120,250 60,240" fill="#1f1d1b" stroke="#FF9810" strokeOpacity="0.5" />
              <polygon points="290,170 230,140 180,195 215,250 280,235" fill="#1f1d1b" stroke="#FF9810" strokeOpacity="0.5" />
              <path d="M0 200H40M290 190H330" stroke="#FF9810" strokeOpacity="0.4" />
            </>
          )}
          {i === 2 && (
            <>
              <circle cx="165" cy="190" r="70" fill="#FF800D" fillOpacity="0.25" />
              <circle cx="165" cy="190" r="18" fill="#FFE7C2" />
              {Array.from({ length: 22 }, (_, k) => {
                const a = (k / 22) * Math.PI * 2;
                return <path key={k} d={`M${165 + Math.cos(a) * 30} ${190 + Math.sin(a) * 30}L${165 + Math.cos(a) * (70 + (k % 4) * 22)} ${190 + Math.sin(a) * (70 + (k % 4) * 22)}`} stroke="#FFA912" strokeWidth="2" />;
              })}
            </>
          )}
          {i === 3 && (
            <>
              <circle cx="165" cy="170" r="105" fill="none" stroke="#FF9810" strokeOpacity="0.45" strokeDasharray="3 6" />
              <Mark x={128} y={100} s={0.16} />
              <text x="165" y="320" textAnchor="middle" fill="#fff" fontFamily="Konexy, Sora" fontSize="34" letterSpacing="2">FLINTORA</text>
            </>
          )}
        </g>
      ))}
    </>
  ),
  halden: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dfd2" />
          <stop offset="1" stopColor="#cdbba6" />
        </linearGradient>
        <radialGradient id={`${id}l`} cx="50%" cy="30%" r="60%">
          <stop offset="0" stopColor="#ffe4bd" />
          <stop offset="1" stopColor="#b9926a" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}w)`} />
      <path d="M560 1000V420A240 240 0 0 1 1040 420V1000Z" fill={`url(#${id}l)`} />
      <path d="M560 1000V420A240 240 0 0 1 1040 420V1000" fill="none" stroke="#8a6b4c" strokeOpacity="0.4" strokeWidth="3" />
      <path d="M0 860H1600" stroke="#8a6b4c" strokeOpacity="0.2" />
      <rect x="760" y="760" width="80" height="240" fill="#6e553e" fillOpacity="0.25" />
      <text x="90" y="130" fill="#2b2118" fontFamily="Georgia, serif" fontSize="44" letterSpacing="6">HALDEN ATELIER</text>
      <text x="90" y="175" fill="#2b2118" fillOpacity="0.6" fontFamily="Sora" fontSize="18" letterSpacing="3">ARCHITECTURE · INTERIORS</text>
      <text x="1290" y="940" fill="#2b2118" fillOpacity="0.6" fontFamily="Sora" fontSize="18" letterSpacing="3">01 / 12  STONE HOUSE</text>
    </>
  ),
  'halden-screens': (id) => (
    <>
      <defs>
        <radialGradient id={`${id}l`} cx="50%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffe4bd" />
          <stop offset="1" stopColor="#a8825c" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="#d9cdbd" />
      <g transform="translate(120 140)">
        <rect width="1000" height="640" rx="14" fill="#f1ebe2" stroke="#2b2118" strokeOpacity="0.15" />
        <text x="40" y="60" fill="#2b2118" fontFamily="Georgia, serif" fontSize="22" letterSpacing="4">HALDEN</text>
        {['Projects', 'Studio', 'Contact'].map((t, i) => <text key={t} x={700 + i * 100} y="60" fill="#2b2118" fillOpacity="0.6" fontFamily="Sora" fontSize="16">{t}</text>)}
        <rect x="40" y="100" width="560" height="500" fill={`url(#${id}l)`} />
        <path d="M200 600V330A120 120 0 0 1 440 330V600" fill="#f1ebe2" fillOpacity="0.35" />
        <text x="640" y="160" fill="#2b2118" fontFamily="Georgia, serif" fontSize="44">Stone House</text>
        <text x="640" y="200" fill="#2b2118" fillOpacity="0.6" fontFamily="Sora" fontSize="16">A home carved from light and limestone.</text>
        {[0, 1, 2, 3].map((i) => <rect key={i} x="640" y={260 + i * 26} width={300 - i * 40} height="8" fill="#2b2118" fillOpacity="0.2" />)}
        <text x="640" y="560" fill="#2b2118" fontFamily="Sora" fontSize="15" letterSpacing="2">NEXT PROJECT  →</text>
      </g>
      <g transform="translate(1180 120)">
        <rect width="320" height="660" rx="44" fill="#1b1612" />
        <rect x="14" y="14" width="292" height="632" rx="34" fill="#f1ebe2" />
        <text x="40" y="80" fill="#2b2118" fontFamily="Georgia, serif" fontSize="18" letterSpacing="3">HALDEN</text>
        <rect x="40" y="110" width="240" height="300" fill={`url(#${id}l)`} />
        <text x="40" y="460" fill="#2b2118" fontFamily="Georgia, serif" fontSize="28">Stone House</text>
        <rect x="40" y="485" width="200" height="7" fill="#2b2118" fillOpacity="0.2" />
        <rect x="40" y="503" width="160" height="7" fill="#2b2118" fillOpacity="0.2" />
      </g>
    </>
  ),
  kesar: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5c0f0b" />
          <stop offset="0.45" stopColor="#9a1f12" />
          <stop offset="1" stopColor="#4a0c09" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="#efe3cf" />
      <ellipse cx="800" cy="880" rx="620" ry="40" fill="#5c3a1c" fillOpacity="0.15" />
      {[
        [420, 330, 1],
        [700, 250, 1.2],
        [1010, 330, 1],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect width="220" height="440" rx="14" fill={`url(#${id}t)`} />
          <rect width="220" height="34" rx="10" fill="#2e0705" />
          <SunMark x={110} y={190} s={0.62} />
          <text x="110" y="270" textAnchor="middle" fill="#F5D9A8" fontFamily="Georgia, serif" fontSize="22" letterSpacing="5">KESAR</text>
          <text x="110" y="296" textAnchor="middle" fill="#F5D9A8" fontFamily="Georgia, serif" fontSize="14" letterSpacing="6">COAST</text>
          <text x="110" y="400" textAnchor="middle" fill="#F5D9A8" fillOpacity="0.7" fontFamily="Sora" fontSize="11" letterSpacing="3">{['SAFFRON', 'CARDAMOM', 'PEPPER'][i]}</text>
        </g>
      ))}
    </>
  ),
  'kesar-system': () => (
    <>
      <rect width="1600" height="1000" fill="#efe3cf" />
      <g transform="translate(120 120)">
        <rect width="620" height="760" fill="#7a1810" />
        <SunMark x={310} y={330} s={1.4} />
        <text x="310" y="520" textAnchor="middle" fill="#F5D9A8" fontFamily="Georgia, serif" fontSize="56" letterSpacing="10">KESAR</text>
        <text x="310" y="570" textAnchor="middle" fill="#F5D9A8" fontFamily="Georgia, serif" fontSize="26" letterSpacing="14">COAST</text>
      </g>
      {[
        ['#7A1810', 'Dawn Red'],
        ['#C2410C', 'Saffron'],
        ['#F5D9A8', 'Thread Gold'],
        ['#2E0705', 'Night Clay'],
      ].map(([c, n], i) => (
        <g key={c} transform={`translate(${820 + (i % 2) * 340} ${120 + Math.floor(i / 2) * 250})`}>
          <rect width="300" height="200" fill={c} />
          <text y="236" fill="#2b1a10" fontFamily="Sora" fontSize="18">{n}</text>
          <text x="300" y="236" textAnchor="end" fill="#2b1a10" fillOpacity="0.6" fontFamily="Sora" fontSize="16">{c}</text>
        </g>
      ))}
      <text x="820" y="760" fill="#2b1a10" fontFamily="Georgia, serif" fontSize="64">Picked before</text>
      <text x="820" y="840" fill="#2b1a10" fontFamily="Georgia, serif" fontStyle="italic" fontSize="64">sunrise.</text>
    </>
  ),
  'kesar-posters': () => (
    <>
      <rect width="1600" height="1000" fill="#1a0f0b" />
      {[
        ['#7A1810', '05:42', 'SAFFRON'],
        ['#C2410C', '06:10', 'CARDAMOM'],
        ['#F5D9A8', '06:31', 'PEPPER'],
      ].map(([c, time, name], i) => {
        const dark = c === '#F5D9A8';
        const ink = dark ? '#2b1a10' : '#F5D9A8';
        return (
          <g key={name} transform={`translate(${110 + i * 480} 110)`}>
            <rect width="420" height="780" fill={c} />
            <text x="34" y="80" fill={ink} fontFamily="Sora" fontSize="16" letterSpacing="4">KESAR COAST</text>
            <text x="34" y="380" fill={ink} fontFamily="Georgia, serif" fontSize="120">{time}</text>
            <SunMark x={210} y={560} s={0.9} c={ink} />
            <text x="34" y="700" fill={ink} fontFamily="Georgia, serif" fontStyle="italic" fontSize="34">Picked before sunrise.</text>
            <text x="34" y="740" fill={ink} fillOpacity="0.7" fontFamily="Sora" fontSize="14" letterSpacing="4">{name}</text>
          </g>
        );
      })}
    </>
  ),
  loop: () => (
    <>
      <rect width="1600" height="1000" fill="#0b0b0b" />
      {['Enquiry', 'Qualify', 'Proposal', 'Project', 'Invoice'].map((t, i) => {
        const x = 170 + i * 315;
        const auto = i !== 2;
        return (
          <g key={t}>
            {i < 4 && <path d={`M${x + 90} 500H${x + 225}`} stroke="#FF800D" strokeWidth="3" strokeDasharray={auto ? '0' : '8 8'} />}
            <circle cx={x} cy="500" r="90" fill={auto ? '#141414' : '#FF800D'} stroke={auto ? '#FF9810' : '#FFA912'} strokeWidth="2" />
            <text x={x} y="508" textAnchor="middle" fill={auto ? '#fff' : '#040404'} fontFamily="Sora" fontSize="24">{t}</text>
            <text x={x} y="640" textAnchor="middle" fill="#fff" fillOpacity="0.45" fontFamily="Sora" fontSize="16" letterSpacing="3">{auto ? 'AUTOMATED' : 'HUMAN DECISION'}</text>
          </g>
        );
      })}
      <text x="170" y="250" fill="#fff" fontFamily="Konexy, Sora" fontSize="64" letterSpacing="2">LOOP DESK</text>
    </>
  ),
  'loop-flow': () => (
    <>
      <rect width="1600" height="1000" fill="#f5f2ec" />
      {[
        ['Email arrives', 0],
        ['Copy to sheet', 1],
        ['Check fit', 0],
        ['Draft proposal', 0],
        ['Chase reply', 1],
        ['Create invoice', 1],
        ['Send reminder', 1],
      ].map(([t, auto], i) => {
        const x = 110 + (i % 4) * 360;
        const y = 220 + Math.floor(i / 4) * 360;
        return (
          <g key={t as string} transform={`translate(${x} ${y})`}>
            <rect width="300" height="170" rx="16" fill={auto ? '#FF800D' : '#fff'} stroke="#141210" strokeOpacity="0.15" />
            <text x="28" y="60" fill="#141210" fontFamily="Sora" fontSize="15" letterSpacing="3">{`STEP ${i + 1}`}</text>
            <text x="28" y="110" fill="#141210" fontFamily="Sora" fontSize="28">{t}</text>
            <text x="28" y="146" fill="#141210" fillOpacity="0.6" fontFamily="Sora" fontSize="15">{auto ? 'Automate' : 'Keep human'}</text>
          </g>
        );
      })}
    </>
  ),
  'loop-dashboard': () => (
    <>
      <rect width="1600" height="1000" fill="#0b0b0b" />
      <g transform="translate(120 100)">
        <rect width="1360" height="800" rx="18" fill="#111" stroke="#fff" strokeOpacity="0.12" />
        <text x="50" y="80" fill="#fff" fontFamily="Sora" fontSize="30">Live enquiries</text>
        {['New', 'Qualified', 'Proposal sent', 'Won'].map((t, i) => (
          <g key={t} transform={`translate(${50 + i * 320} 130)`}>
            <rect width="290" height="96" rx="12" fill={i === 2 ? '#FF800D' : '#191919'} />
            <text x="24" y="40" fill={i === 2 ? '#040404' : '#fff'} fillOpacity="0.7" fontFamily="Sora" fontSize="16">{t}</text>
            <rect x="24" y="58" width={60 + i * 20} height="14" fill={i === 2 ? '#040404' : '#fff'} fillOpacity="0.8" />
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r} transform={`translate(50 ${280 + r * 96})`}>
            <rect width="1260" height="80" rx="10" fill="#151515" />
            <circle cx="40" cy="40" r="16" fill="#FF9810" fillOpacity={0.9 - r * 0.15} />
            <rect x="80" y="26" width={260 - r * 20} height="12" fill="#fff" fillOpacity="0.75" />
            <rect x="80" y="48" width="180" height="8" fill="#fff" fillOpacity="0.25" />
            <rect x="620" y="28" width="150" height="24" rx="12" fill="none" stroke="#FF9810" strokeOpacity="0.6" />
            <rect x="1040" y="22" width="190" height="36" rx="18" fill={r === 0 ? '#FF800D' : '#222'} />
          </g>
        ))}
      </g>
    </>
  ),
};

export function ProjectArt({ art, className, title }: { art: string; className?: string; title?: string }) {
  const id = useId().replace(/:/g, '');
  const draw = boards[art];
  if (!draw) return null;
  return (
    <svg viewBox="0 0 1600 1000" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} preserveAspectRatio="xMidYMid slice">
      {draw(id)}
    </svg>
  );
}
