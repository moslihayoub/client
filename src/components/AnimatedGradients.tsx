import svgPaths from "../svgs/Background/Dark";
import { motion } from "motion/react";

function Group1() {
  return (
    <motion.div 
      className="absolute bottom-[-42.22%] left-0 right-[-11.77%] top-[-13.75%]" 
      data-name="group 1"
      animate={{
        x: [0, 100, -80, 120, -60, 0],
        y: [0, -100, 80, -120, 60, 0],
        scale: [1, 1.3, 0.8, 1.2, 0.9, 1],
        rotate: [0, 15, -10, 20, -15, 0],
      }}
      transition={{
        duration: 10.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="absolute bottom-0 left-[-12.56%] right-0 top-[-16.04%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2131 1838">
          <g filter="url(#filter0_f_4002_2680)" id="group 1">
            <path d={svgPaths.p3d9bc00} fill="var(--fill-0, #00A3FF)" id="shape 1" />
            <path d={svgPaths.p25272580} fill="var(--fill-0, #DB00FF)" id="shape 2" />
            <path d={svgPaths.p3476fa30} fill="var(--fill-0, #000AFF)" id="shape 3" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1971.98" id="filter0_f_4002_2680" width="2265.01" x="0.289604" y="0.145653">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4002_2680" stdDeviation="67.5" />
            </filter>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

function Group2() {
  return (
    <motion.div 
      className="absolute bottom-[-42.22%] left-0 mix-blend-color-dodge right-[-11.77%] top-[-13.75%]" 
      data-name="group 2"
      animate={{
        x: [0, -120, 90, -100, 70, 0],
        y: [0, 110, -90, 130, -70, 0],
        scale: [1, 0.7, 1.4, 0.85, 1.25, 1],
        rotate: [0, -20, 15, -25, 10, 0],
      }}
      transition={{
        duration: 13,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="absolute bottom-0 left-[-11.77%] right-0 top-[-15.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2116 1823">
          <g filter="url(#filter0_f_4002_2675)" id="group 2" style={{ mixBlendMode: "color-dodge" }}>
            <path d={svgPaths.p10404c00} fill="var(--fill-0, #0057FF)" id="shape 1" />
            <path d={svgPaths.p1112cc80} fill="var(--fill-0, #DB00FF)" id="shape 2" />
            <path d={svgPaths.p16306d80} fill="var(--fill-0, #000AFF)" id="shape 3" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1941.98" id="filter0_f_4002_2675" width="2235.01" x="0.289604" y="0.145653">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4002_2675" stdDeviation="60" />
            </filter>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

export default function AnimatedGradients() {
  return (
    <div className="bg-[#232324] size-full z-0 inset-0 fixed" data-name="Animated gradients">
      <div className="relative size-full">
        <Group1 />
        <Group2 />
        <motion.div 
          className="absolute bg-gradient-to-b blur-[30px] bottom-[70.3%] filter from-[rgba(2,6,23,0.6)] left-0 right-0 to-[rgba(2,6,23,0)] top-0"
          animate={{
            opacity: [0.6, 0.9, 0.4, 0.7, 0.6],
          }}
          transition={{
            duration: 7.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[rgba(255,255,255,0.08)] border-solid inset-[-8px] pointer-events-none" />
    </div>
  );
}