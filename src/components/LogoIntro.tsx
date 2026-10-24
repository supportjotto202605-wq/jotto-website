"use client";

export default function LogoIntro() {
  return (
    <div className="jl-wrap">
      <style>{`
.jl-ink{fill:#f0ede8;fill-opacity:0;stroke:#f0ede8;stroke-width:26;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1}
.jl-p1{animation:jl-ink1 8.5s cubic-bezier(.4,0,.2,1) 1 forwards}
.jl-p2{animation:jl-ink2 8.5s cubic-bezier(.4,0,.2,1) 1 forwards}
.jl-p3{animation:jl-ink3 8.5s cubic-bezier(.4,0,.2,1) 1 forwards}
.jl-p4{animation:jl-ink4 8.5s cubic-bezier(.4,0,.2,1) 1 forwards}
@keyframes jl-ink1{0%,1.65%{stroke-dashoffset:1;fill-opacity:0;stroke-opacity:1}18.12%{stroke-dashoffset:0;fill-opacity:0;stroke-opacity:1}23.06%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}88.24%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}100%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}}
@keyframes jl-ink2{0%,11.53%{stroke-dashoffset:1;fill-opacity:0;stroke-opacity:1}34.59%{stroke-dashoffset:0;fill-opacity:0;stroke-opacity:1}39.53%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}88.24%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}100%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}}
@keyframes jl-ink3{0%,32.94%{stroke-dashoffset:1;fill-opacity:0;stroke-opacity:1}42.82%{stroke-dashoffset:0;fill-opacity:0;stroke-opacity:1}46.94%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}88.24%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}100%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}}
@keyframes jl-ink4{0%,38.71%{stroke-dashoffset:1;fill-opacity:0;stroke-opacity:1}48.59%{stroke-dashoffset:0;fill-opacity:0;stroke-opacity:1}52.71%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}88.24%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}100%{stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0}}

.jl-bug{transform-origin:479px 225px;animation:jl-fly 8.5s linear 1 forwards}
@keyframes jl-fly{
0%{transform:translate(-506px,40px) rotate(32deg);opacity:1}
6.59%{transform:translate(-386px,-150px) rotate(145deg)}
14%{transform:translate(-266px,20px) rotate(34deg)}
21.41%{transform:translate(-136px,-170px) rotate(141deg)}
28.82%{transform:translate(-46px,-60px) rotate(235deg)}
36.24%{transform:translate(-216px,60px) rotate(313deg)}
42.82%{transform:translate(-346px,-60px) rotate(440deg)}
49.41%{transform:translate(-166px,-90px) rotate(488deg)}
56%{transform:translate(-26px,20px) rotate(412deg)}
61.76%{transform:translate(0,0) rotate(360deg);opacity:1}
88.24%{transform:translate(0,0) rotate(360deg);opacity:1}
95.29%{transform:translate(0,0) rotate(360deg);opacity:1}
100%{transform:translate(0,0) rotate(360deg);opacity:1}}
.jl-wing{transform-box:fill-box;animation:jl-flap .07s ease-in-out infinite alternate}
.jl-wingL{transform-origin:right center}
.jl-wingR{transform-origin:left center;animation-name:jl-flapr}
@keyframes jl-flap{from{transform:rotate(-30deg)}to{transform:rotate(18deg)}}
@keyframes jl-flapr{from{transform:rotate(30deg)}to{transform:rotate(-18deg)}}
.jl-wings{opacity:.8;animation:jl-wingvis 8.5s linear 1 forwards}
@keyframes jl-wingvis{0%,59.29%{opacity:.8}61.76%,100%{opacity:0}}
.jl-antL,.jl-antR{transform-box:fill-box;animation:jl-ant 8.5s ease-in-out 1 forwards}
.jl-antL{transform-origin:right bottom}
.jl-antR{transform-origin:left bottom;animation-name:jl-antr}
@keyframes jl-ant{0%,67.06%{transform:rotate(0)}70.59%{transform:rotate(-22deg)}74.12%{transform:rotate(8deg)}77.65%,100%{transform:rotate(0)}}
@keyframes jl-antr{0%,68.82%{transform:rotate(0)}72.35%{transform:rotate(22deg)}75.88%{transform:rotate(-8deg)}79.41%,100%{transform:rotate(0)}}
@media (prefers-reduced-motion:reduce){.jl-ink{animation:none!important;fill-opacity:1!important;stroke-opacity:0!important}.jl-bug,.jl-wing,.jl-antL,.jl-antR{animation:none!important;opacity:1!important;transform:none!important}.jl-wings{display:none}}
      `}</style>
      <svg viewBox="0 0 500 300" width="100%" style={{ display: "block", maxWidth: 1200, margin: "0 auto" }} role="img" aria-label="Jotto ロゴ"><g>
  <g transform="translate(-164.415438,428.365043) scale(0.052241,-0.051736)">
    <path className="jl-ink jl-p1" pathLength="1" d="M6173 8256 l-28 -24 -5 -2134 c-6 -2319 -3 -2185 -60 -2401 -150 -567 -569 -943 -1138 -1021 -596 -83 -1142 157 -1423 626 -86 143 -149 338 -174 540 -12 101 -17 115 -40 135 -36 32 -85 30 -126 -4 l-32 -27 6 -91 c11 -163 66 -370 143 -533 191 -407 592 -706 1089 -812 144 -31 420 -38 575 -16 272 40 467 112 665 244 118 79 304 259 391 377 116 158 221 399 264 608 46 221 45 167 45 2395 l0 2114 -28 24 c-37 32 -87 32 -124 0z"/>
    <path className="jl-ink jl-p3" pathLength="1" d="M8653 7500 c-45 -18 -53 -56 -53 -239 l0 -170 -235 -3 c-228 -3 -235 -4 -257 -26 -32 -31 -31 -92 1 -126 l24 -26 234 0 233 0 0 -444 c0 -504 6 -569 64 -685 38 -74 128 -166 197 -201 73 -38 156 -53 259 -47 129 7 207 37 235 90 l20 37 -20 37 c-29 54 -58 61 -147 35 -201 -60 -355 17 -404 200 -11 42 -14 151 -14 516 l0 462 259 0 260 0 20 26 c31 39 28 89 -8 125 l-29 29 -251 0 -251 0 0 184 0 184 -31 26 c-31 27 -66 32 -106 16z"/>
    <path className="jl-ink jl-p4" pathLength="1" d="M10423 7500 c-45 -18 -53 -56 -53 -239 l0 -170 -225 -3 c-218 -3 -225 -4 -247 -26 -30 -29 -32 -100 -4 -131 18 -20 28 -21 247 -21 l228 0 4 -492 c3 -418 6 -500 19 -539 64 -185 194 -302 376 -339 41 -9 98 -11 165 -7 205 12 304 78 255 170 -28 53 -52 56 -170 26 -116 -30 -204 -24 -295 22 -46 23 -78 48 -100 77 -62 82 -63 96 -63 614 l0 468 260 0 c246 0 261 1 280 20 43 43 34 112 -19 143 -25 15 -62 17 -275 17 l-246 0 0 181 0 181 -29 29 c-30 30 -65 36 -108 19z"/>
    <path className="jl-ink jl-p2" pathLength="1" d="M7592 5249 c-215 -28 -452 -134 -613 -274 -253 -221 -408 -492 -464 -812 -19 -110 -19 -181 0 -308 18 -123 45 -212 94 -320 146 -314 433 -556 802 -674 300 -96 719 -89 1037 18 336 113 580 292 1157 852 l131 126 45 -41 c25 -23 121 -111 215 -196 527 -482 733 -632 1007 -734 206 -77 397 -104 597 -86 221 21 383 74 552 180 476 298 677 860 507 1418 -51 165 -175 375 -295 497 -179 184 -437 313 -686 345 -307 38 -631 -26 -881 -174 -155 -91 -255 -174 -507 -420 -131 -127 -211 -204 -475 -458 l-81 -77 -36 32 c-19 18 -102 93 -184 167 -251 229 -265 242 -417 375 -82 71 -192 162 -245 202 -261 195 -543 320 -807 358 -107 16 -349 18 -453 4z m539 -203 c167 -44 306 -109 479 -223 152 -100 265 -194 628 -519 178 -159 332 -295 341 -303 15 -13 3 -28 -134 -161 -646 -629 -883 -781 -1330 -851 -117 -19 -380 -16 -490 5 -108 21 -262 69 -330 104 -204 102 -408 299 -499 479 -115 230 -133 491 -50 743 29 87 117 249 179 329 102 133 282 280 420 341 161 73 267 91 500 86 163 -4 203 -8 286 -30z m3629 -6 c408 -103 709 -463 761 -911 40 -348 -73 -655 -326 -887 -183 -168 -392 -249 -666 -259 -287 -11 -501 52 -754 222 -133 90 -271 205 -574 480 -73 66 -174 157 -224 202 -50 45 -93 86 -95 91 -3 9 595 589 748 725 130 116 225 182 345 242 203 100 325 127 555 120 104 -2 169 -10 230 -25z"/>
  </g>
  <g className="jl-bug">
    <g transform="translate(466, 210) rotate(25, 16, 19) scale(0.8)">
      <g>
        <g><path d="M7 15L1 11M6 21L0 21M7 27L1 31" stroke="#000" strokeWidth="1.4" strokeLinecap="round" fill="none"/></g>
        <g><path d="M25 15L31 11M26 21L32 21M25 27L31 31" stroke="#000" strokeWidth="1.4" strokeLinecap="round" fill="none"/></g>
        <g className="jl-wings"><g transform="rotate(-35 2 17)"><ellipse className="jl-wing jl-wingL" cx="2" cy="17" rx="10" ry="4.5" fill="#fff"/></g><g transform="rotate(35 30 17)"><ellipse className="jl-wing jl-wingR" cx="30" cy="17" rx="10" ry="4.5" fill="#fff"/></g></g>
        <circle cx="16" cy="6" r="4" fill="#000000"/>
        <path className="jl-antL" d="M14 3L12 2" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path className="jl-antR" d="M18 3L20 2" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <ellipse cx="16" cy="19" rx="10" ry="12" fill="#C0392B"/>
        <line x1="16" y1="8" x2="16" y2="31" stroke="#000000" strokeWidth="2"/>
        <circle cx="11" cy="14" r="2" fill="#000000"/>
        <circle cx="10" cy="22" r="2.5" fill="#000000"/>
        <circle cx="12" cy="28" r="1.5" fill="#000000"/>
        <circle cx="21" cy="14" r="2" fill="#000000"/>
        <circle cx="22" cy="22" r="2.5" fill="#000000"/>
        <circle cx="20" cy="28" r="1.5" fill="#000000"/>
      </g>
    </g>
  </g>
</g></svg>
    </div>
  );
}
