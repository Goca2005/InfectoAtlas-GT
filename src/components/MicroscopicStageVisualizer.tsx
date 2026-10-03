import React from 'react';
import { AtlasParasiteStage } from '../types/microscopyAtlas';

interface MicroscopicStageVisualizerProps {
  stage: AtlasParasiteStage;
  size?: 'sm' | 'md' | 'lg';
  showAnnotations?: boolean;
}

export const MicroscopicStageVisualizer: React.FC<MicroscopicStageVisualizerProps> = ({
  stage,
  size = 'md',
  showAnnotations = false
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44 sm:w-48 sm:h-48',
    lg: 'w-64 h-64 sm:w-72 sm:h-72'
  }[size];

  // Render SVG illustration matching exact biological staining and morphology
  const renderStainedMorphology = () => {
    switch (stage.id) {
      // 1. Plasmodium vivax ring
      case 'pv-stage-ring':
        return (
          <g>
            {/* Enlarged reticulocyte */}
            <circle cx="100" cy="100" r="68" fill="#fecdd3" opacity="0.85" stroke="#f43f5e" strokeWidth="1.5" />
            {/* Schüffner stippling dots */}
            {[
              [60, 80], [75, 65], [90, 60], [130, 75], [145, 95], [140, 130],
              [120, 150], [80, 140], [65, 115], [85, 95], [115, 75], [135, 115]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="#e11d48" opacity="0.6" />
            ))}
            {/* Ring trophozoite */}
            <circle cx="95" cy="105" r="22" fill="none" stroke="#0284c7" strokeWidth="3.5" />
            {/* Ruby red chromatin dot */}
            <circle cx="114" cy="95" r="5" fill="#dc2626" />
            {/* Central vacuole */}
            <circle cx="93" cy="106" r="16" fill="#fff1f2" />
          </g>
        );

      // 2. Plasmodium vivax amoeboid
      case 'pv-stage-ameboid':
        return (
          <g>
            {/* Enlarged reticulocyte */}
            <circle cx="100" cy="100" r="72" fill="#ffe4e6" stroke="#fb7185" strokeWidth="1.5" />
            {/* Heavy Schüffner dots */}
            {[
              [50, 90], [65, 65], [85, 50], [120, 55], [145, 75], [155, 110],
              [140, 145], [105, 160], [70, 150], [55, 125], [80, 75], [125, 80],
              [135, 130], [75, 125], [110, 140]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2" fill="#be123c" opacity="0.75" />
            ))}
            {/* Irregular amoeboid strands (blue) */}
            <path
              d="M 75,90 C 65,115 80,140 105,135 C 130,130 145,110 135,85 C 125,70 100,75 90,65 C 80,60 70,80 75,90 Z"
              fill="#38bdf8"
              opacity="0.85"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            {/* Chromatin mass */}
            <circle cx="115" cy="90" r="6" fill="#b91c1c" />
            {/* Hemozoin pigment granules */}
            <circle cx="88" cy="102" r="2.5" fill="#451a03" />
            <circle cx="95" cy="115" r="2" fill="#451a03" />
            <circle cx="118" cy="112" r="2.5" fill="#451a03" />
          </g>
        );

      // 3. Plasmodium vivax schizont
      case 'pv-stage-schizont':
        return (
          <g>
            {/* Very distended host cell */}
            <circle cx="100" cy="100" r="74" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Multiple merozoites cluster */}
            {[
              [80, 75], [100, 70], [120, 75], [70, 95], [130, 95],
              [75, 118], [95, 130], [118, 122], [85, 95], [115, 95],
              [100, 112], [65, 80], [135, 80], [100, 58]
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="7" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                <circle cx={x} cy={y} r="3" fill="#b91c1c" />
              </g>
            ))}
            {/* Central clustered hemozoin mass */}
            <circle cx="100" cy="95" r="7" fill="#291404" />
            <circle cx="103" cy="92" r="3" fill="#5c2e0b" />
          </g>
        );

      // 4. Plasmodium falciparum ring
      case 'pf-stage-ring':
        return (
          <g>
            {/* Normal-sized erythrocytes */}
            <circle cx="100" cy="100" r="54" fill="#fee2e2" stroke="#f87171" strokeWidth="1.5" />
            {/* Multiple fine delicate rings (poly-infection) */}
            {/* Ring 1 - central */}
            <circle cx="90" cy="95" r="11" fill="none" stroke="#0284c7" strokeWidth="2" />
            <circle cx="98" cy="89" r="2.5" fill="#dc2626" />
            {/* Ring 2 - double chromatin dots */}
            <circle cx="118" cy="108" r="10" fill="none" stroke="#0284c7" strokeWidth="2" />
            <circle cx="124" cy="102" r="2" fill="#dc2626" />
            <circle cx="127" cy="106" r="2" fill="#dc2626" />
            {/* Forme appliquée (marginal) */}
            <path d="M 60,78 A 8 8 0 0 1 72,70" fill="none" stroke="#0284c7" strokeWidth="2" />
            <circle cx="68" cy="68" r="2.2" fill="#dc2626" />
          </g>
        );

      // 5. Plasmodium falciparum gametocyte
      case 'pf-stage-gametocyte':
        return (
          <g>
            {/* Faint stretched erythrocyte membrane */}
            <path
              d="M 65,55 C 80,45 130,55 145,120 C 135,100 100,75 65,55 Z"
              fill="#fee2e2"
              opacity="0.5"
            />
            {/* Crescent / Banana body */}
            <path
              d="M 55,60 C 95,45 140,80 145,145 C 120,130 80,105 55,60 Z"
              fill="#0ea5e9"
              stroke="#0369a1"
              strokeWidth="2.5"
            />
            {/* Central chromatin & hemozoin block */}
            <ellipse cx="100" cy="95" rx="12" ry="7" fill="#b91c1c" transform="rotate(35 100 95)" />
            <circle cx="98" cy="94" r="3.5" fill="#2d1502" />
            <circle cx="104" cy="97" r="2.5" fill="#2d1502" />
          </g>
        );

      // 6. Entamoeba histolytica cyst
      case 'eh-stage-cyst':
        return (
          <g>
            {/* Spherical cyst with refractile double wall (Lugol amber) */}
            <circle cx="100" cy="100" r="58" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
            <circle cx="100" cy="100" r="54" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
            {/* 4 small vesicular nuclei with central pinpoint karyosome */}
            {[
              [82, 80], [118, 80], [80, 118], [120, 115]
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="8.5" fill="#fffbeb" stroke="#b45309" strokeWidth="1.2" />
                <circle cx={x} cy={y} r="2" fill="#78350f" />
              </g>
            ))}
            {/* Chromatoidal bar with blunt rounded cigar ends */}
            <rect x="76" y="94" width="48" height="11" rx="5.5" fill="#92400e" opacity="0.8" />
          </g>
        );

      // 7. Entamoeba histolytica trophozoite
      case 'eh-stage-trophozoite':
        return (
          <g>
            {/* Ameba body with clear pseudopod */}
            <path
              d="M 60,95 C 50,60 85,50 120,60 C 150,70 160,110 145,135 C 130,160 85,155 65,135 C 45,115 70,110 60,95 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            {/* Clear hyaline ectoplasm pseudopod */}
            <path
              d="M 120,60 C 145,55 165,70 155,95 C 145,85 135,75 120,60 Z"
              fill="#e0f2fe"
              opacity="0.9"
            />
            {/* Nucleus with central dot */}
            <circle cx="85" cy="85" r="10" fill="#f0f9ff" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="85" cy="85" r="2.2" fill="#0c4a6e" />
            {/* Erythrophagocytosis: ingested red blood cells */}
            <circle cx="115" cy="100" r="9" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <circle cx="102" cy="120" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <circle cx="128" cy="118" r="7.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <circle cx="88" cy="115" r="6" fill="#f87171" stroke="#b91c1c" strokeWidth="0.8" />
          </g>
        );

      // 8. Giardia duodenalis cyst
      case 'gd-stage-cyst':
        return (
          <g>
            {/* Oval refractile cyst */}
            <ellipse cx="100" cy="100" rx="46" ry="60" fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
            {/* Retraction halo */}
            <ellipse cx="100" cy="100" rx="40" ry="53" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="3 2" />
            {/* 4 clustered nuclei at anterior pole */}
            {[
              [88, 70], [112, 70], [86, 88], [114, 88]
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />
                <circle cx={x} cy={y} r="1.5" fill="#713f12" />
              </g>
            ))}
            {/* Longitudinal axonemes (S-shaped curved fibers) */}
            <path d="M 100,60 Q 93,100 100,140" fill="none" stroke="#a16207" strokeWidth="2" />
            <path d="M 94,95 Q 106,105 102,120" fill="none" stroke="#a16207" strokeWidth="1.5" />
          </g>
        );

      // 9. Giardia duodenalis trophozoite
      case 'gd-stage-trophozoite':
        return (
          <g>
            {/* Pear/Kite shaped body */}
            <path
              d="M 100,45 C 135,55 135,100 115,130 C 105,145 100,165 100,165 C 100,165 95,145 85,130 C 65,100 65,55 100,45 Z"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            {/* Ventral sucking disc */}
            <path
              d="M 78,65 C 78,55 122,55 122,65 C 122,95 78,95 78,65 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="1.5"
            />
            {/* Two symmetrical nuclei (eyes / glasses) */}
            <ellipse cx="88" cy="74" rx="8" ry="11" fill="#f0f9ff" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="88" cy="74" r="3" fill="#0c4a6e" />
            <ellipse cx="112" cy="74" rx="8" ry="11" fill="#f0f9ff" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="112" cy="74" r="3" fill="#0c4a6e" />
            {/* Median axostyle and flagella */}
            <line x1="100" y1="50" x2="100" y2="165" stroke="#0369a1" strokeWidth="2" />
            {/* Posterior flagella */}
            <path d="M 100,165 Q 90,185 85,190" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 100,165 Q 110,185 115,190" fill="none" stroke="#0284c7" strokeWidth="1.5" />
          </g>
        );

      // 10. Ascaris lumbricoides fertilized egg
      case 'al-stage-fertilized-egg':
        return (
          <g>
            {/* Outer golden brown mammillated albuminoid layer */}
            <ellipse cx="100" cy="100" rx="58" ry="50" fill="#92400e" opacity="0.2" />
            {/* Mammillated bumps */}
            {[
              0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340
            ].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 100 + 55 * Math.cos(rad);
              const y = 100 + 47 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="6.5" fill="#78350f" stroke="#451a03" strokeWidth="1" />;
            })}
            {/* Refractile thick inner shell */}
            <ellipse cx="100" cy="100" rx="46" ry="38" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
            {/* Dense unsegmented germinal mass */}
            <circle cx="100" cy="100" r="28" fill="#b45309" />
          </g>
        );

      // 11. Enterobius vermicularis D-shaped egg
      case 'ev-stage-egg':
        return (
          <g>
            {/* Perfectly transparent D-shaped double wall */}
            <path
              d="M 80,50 L 80,150 C 135,145 135,55 80,50 Z"
              fill="#f8fafc"
              stroke="#64748b"
              strokeWidth="3"
            />
            <path
              d="M 83,55 L 83,145 C 130,140 130,60 83,55 Z"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* Folded internal larva (coiled) */}
            <path
              d="M 90,65 C 115,70 120,95 110,110 C 100,125 90,120 90,135"
              fill="none"
              stroke="#475569"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        );

      // 12. Taenia sp. egg with radial striations
      case 'ts-stage-egg-general':
        return (
          <g>
            {/* Thick brown embryophore with radial striations */}
            <circle cx="100" cy="100" r="54" fill="#78350f" />
            {/* Radial wagon-wheel striations */}
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 100 + 42 * Math.cos(rad);
              const y1 = 100 + 42 * Math.sin(rad);
              const x2 = 100 + 54 * Math.cos(rad);
              const y2 = 100 + 54 * Math.sin(rad);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fef3c7" strokeWidth="2.5" />;
            })}
            {/* Inner hexacanth embryo (oncosphere) */}
            <circle cx="100" cy="100" r="40" fill="#fef3c7" stroke="#451a03" strokeWidth="1.5" />
            {/* 3 pairs of refringent hooklets (6 ganchos) */}
            <line x1="90" y1="92" x2="84" y2="85" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="93" y1="108" x2="87" y2="115" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="90" x2="100" y2="82" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="110" x2="100" y2="118" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="110" y1="92" x2="116" y2="85" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="107" y1="108" x2="113" y2="115" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      // 13. Trichuris trichiura barrel egg with polar plugs
      case 'tt-stage-egg':
        return (
          <g>
            {/* Symmetrical barrel/lemon body */}
            <path
              d="M 65,85 C 65,60 135,60 135,85 L 135,115 C 135,140 65,140 65,115 Z"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="3"
            />
            {/* Double smooth shell */}
            <path
              d="M 70,88 C 70,68 130,68 130,88 L 130,112 C 130,132 70,132 70,112 Z"
              fill="#fef3c7"
              stroke="#92400e"
              strokeWidth="2"
            />
            {/* Top hyaline polar plug */}
            <ellipse cx="100" cy="62" rx="10" ry="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Bottom hyaline polar plug */}
            <ellipse cx="100" cy="138" rx="10" ry="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Dense central embryo mass */}
            <ellipse cx="100" cy="100" rx="20" ry="24" fill="#92400e" />
          </g>
        );

      // 14. Trypanosoma cruzi trypomastigote
      case 'tc-stage-trypomastigote':
        return (
          <g>
            {/* Background RBCs */}
            <circle cx="55" cy="65" r="18" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
            <circle cx="145" cy="135" r="20" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
            <circle cx="65" cy="140" r="16" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
            {/* Classic C-shape slender body (Giemsa blue) */}
            <path
              d="M 125,65 C 75,55 60,115 110,135"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Undulating membrane edge */}
            <path
              d="M 125,65 Q 100,50 80,75 Q 65,100 85,125 Q 100,135 115,135"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
            />
            {/* Oval central red nucleus */}
            <circle cx="80" cy="95" r="5" fill="#dc2626" />
            {/* Extraordinarily large subterminal posterior kinetoplast */}
            <circle cx="120" cy="66" r="6" fill="#7f1d1d" stroke="#450a0a" strokeWidth="1" />
            {/* Anterior free flagellum */}
            <path d="M 110,135 Q 130,145 140,140" fill="none" stroke="#0284c7" strokeWidth="2" />
          </g>
        );

      // 15. Strongyloides stercoralis L1 larva
      case 'ss-stage-rhabditiform-larva':
        return (
          <g>
            {/* Elongated sinuous larva */}
            <path
              d="M 50,70 C 85,60 110,105 130,100 C 145,95 155,120 160,140"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Short buccal cavity at head */}
            <line x1="50" y1="70" x2="57" y2="68" stroke="#0f172a" strokeWidth="4" />
            {/* Rhabditoid esophagus (corpus, isthmus, bulb) */}
            <circle cx="75" cy="66" r="6.5" fill="#64748b" />
            {/* Prominent genital primordium in middle body */}
            <ellipse cx="112" cy="100" rx="5" ry="3.5" fill="#0f172a" />
          </g>
        );

      // 16. Cryptosporidium parvum oocyst (Kinyoun acid-fast)
      case 'cp-stage-oocyst':
        return (
          <g>
            {/* Light blue cytological background */}
            <rect x="25" y="25" width="150" height="150" rx="75" fill="#e0f2fe" opacity="0.6" />
            {/* Small bright magenta-fuchsia round oocysts */}
            <circle cx="85" cy="85" r="14" fill="#ec4899" stroke="#be185d" strokeWidth="2.5" />
            <circle cx="82" cy="82" r="3" fill="#831843" />
            <circle cx="120" cy="115" r="15" fill="#f43f5e" stroke="#9f1239" strokeWidth="2.5" />
            <circle cx="124" cy="112" r="3.5" fill="#881337" />
            <circle cx="105" cy="135" r="13" fill="#e11d48" stroke="#881337" strokeWidth="2.5" />
          </g>
        );

      // Default high-grade biological microscope slide
      default:
        return (
          <g>
            <circle cx="100" cy="100" r="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
            <ellipse cx="100" cy="100" rx="36" ry="26" fill="#38bdf8" opacity="0.6" />
            <circle cx="95" cy="95" r="8" fill="#0369a1" />
            <circle cx="95" cy="95" r="3" fill="#b91c1c" />
          </g>
        );
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Eyepiece / Objective circular view frame */}
      <div
        className={`${sizeClasses} relative rounded-full border-4 border-slate-800 bg-slate-950 p-0 shadow-lg overflow-hidden flex items-center justify-center shrink-0`}
      >
        {/* Subtle microscope field lens gradient & crosshair */}
        <div className="absolute inset-0 bg-radial from-slate-900 via-slate-950 to-black pointer-events-none" />

        {/* Reticle / micrometer crosshair guidelines */}
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="3 6" />
        </svg>

        {/* SVG Stained Biology */}
        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
          {renderStainedMorphology()}
        </svg>

        {/* Staining protocol badge */}
        <div className="absolute bottom-1.5 inset-x-0 text-center z-20 pointer-events-none">
          <span className="inline-block bg-slate-950/80 backdrop-blur-xs text-[9px] font-mono font-bold text-sky-300 px-1.5 py-0.5 rounded border border-sky-900/40">
            {stage.stainUsed.split('(')[0].trim().slice(0, 20)}
          </span>
        </div>
      </div>

      {showAnnotations && (
        <div className="mt-1 text-center">
          {stage.approximateDimensions && (
            <div className="text-[10px] font-mono text-slate-500 font-semibold">
              Dimensión de referencia: {stage.approximateDimensions}
            </div>
          )}
          <div className="text-[9px] text-slate-400 italic">
            Ilustración esquemática didáctica (no microfotografía óptica calibrada)
          </div>
        </div>
      )}
    </div>
  );
};
