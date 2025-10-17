import svgPaths from "../svgs/Background/SvgBgHp3";
import { motion } from "motion/react";

function Group2() {
  return (
    <motion.div
      className="absolute inset-[-27.79%_-2.52%_-28.08%_-15.02%]"
      animate={{
        x: [0, 50, -40, 0],
        y: [0, -60, 40, 0],
        rotate: [0, 8, -8, 0],
        scale: [1, 1.05, 0.95, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div 
        className="absolute inset-[-24.3%_-25.68%_-23.06%_-22.93%]"
        animate={{
          filter: [
            "hue-rotate(0deg) saturate(1.3)",
            "hue-rotate(30deg) saturate(1.5)",
            "hue-rotate(-20deg) saturate(1.4)",
            "hue-rotate(40deg) saturate(1.6)",
            "hue-rotate(0deg) saturate(1.3)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2517 2206">
          <g filter="url(#filter0_f_1_254)" id="Group 2">
            <path d={svgPaths.p13291500} fill="var(--fill-0, #F3ACFF)" id="Vector 596" />
            <path d={svgPaths.pca38900} fill="var(--fill-0, #FF6CDF)" id="Vector 597" />
            <path d={svgPaths.p3cffab80} fill="var(--fill-0, #D96CFF)" id="Vector 599" />
            <path d={svgPaths.p1ba47080} fill="var(--fill-0, #5CEBFF)" id="Vector 598" />
            <path d={svgPaths.p2be94c00} fill="var(--fill-0, #5C9DFF)" id="Vector 600" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2205.12" id="filter0_f_1_254" width="2515.34" x="0.833069" y="0.405785">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_254" stdDeviation="235.422" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}

function Group3() {
  return (
    <motion.div
      className="absolute inset-[-27.79%_-2.52%_-28.08%_-15.02%] mix-blend-multiply"
      animate={{
        x: [0, -45, 55, 0],
        y: [0, 50, -35, 0],
        rotate: [0, -6, 6, 0],
        scale: [1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div 
        className="absolute inset-[-24.3%_-25.68%_-23.06%_-22.93%]"
        animate={{
          filter: [
            "hue-rotate(0deg) saturate(1.4)",
            "hue-rotate(-35deg) saturate(1.6)",
            "hue-rotate(45deg) saturate(1.5)",
            "hue-rotate(-25deg) saturate(1.7)",
            "hue-rotate(0deg) saturate(1.4)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2517 2206">
          <g filter="url(#filter0_f_1_247)" id="Group 3" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.pc580840} fill="var(--fill-0, #F3ACFF)" id="Vector 596" />
            <path d={svgPaths.pca38900} fill="var(--fill-0, #FF6CDF)" id="Vector 597" />
            <path d={svgPaths.p3cffab80} fill="var(--fill-0, #D96CFF)" id="Vector 599" />
            <path d={svgPaths.p1ba47080} fill="var(--fill-0, #5CEBFF)" id="Vector 598" />
            <path d={svgPaths.p2be94c00} fill="var(--fill-0, #5C9DFF)" id="Vector 600" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2205.12" id="filter0_f_1_247" width="2515.34" x="0.833069" y="0.405792">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_247" stdDeviation="235.422" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function BgHomepage3() {
  return (
    <div className="bg-white relative size-full" data-name="Animated gradients">
      <div className="relative size-full">
        <Group2 />
        <Group3 />
        <motion.div
          className="absolute bg-gradient-to-b blur-[50px] bottom-[70.3%] filter from-[#ffffff] left-0 right-0 to-[rgba(255,255,255,0)] top-0"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div aria-hidden="true" className="absolute border-[26.158px] border-solid border-white inset-[-26.158px] pointer-events-none" />
    </div>
  );
}