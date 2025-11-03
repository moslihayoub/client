import { motion } from "motion/react";
import svgPaths from "../svgs/Background/CyanBack";

export default function BgCyan() {
  return (
    <div className="block sm:hidden md:block lg:block xl:block bg-white size-full z-0 fixed inset-0" data-name="BgCyan">
      <div className="relative size-full">
        {/* First animated gradient layer - Bright and fast */}
        <motion.div
          className="absolute inset-[-27.79%_-2.52%_-28.08%_-15.02%] will-change-transform"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 25, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 5, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: "translateZ(0)", // Force GPU acceleration
          }}
        >
          <div className="absolute inset-[-24.3%_-25.68%_-23.06%_-22.93%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2517 2206">
              <g filter="url(#filter0_f_1_254)" id="Group 2">
                {/* Bright, fast animations with more visible colors */}
                <motion.path
                  d={svgPaths.p13291500}
                  fill="var(--fill-0, #F3ACFF)"
                  id="Vector 596"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.path
                  d={svgPaths.pca38900}
                  fill="var(--fill-0, #FF6CDF)"
                  id="Vector 597"
                  animate={{
                    scale: [1, 0.7, 1],
                    opacity: [0.6, 1, 0.6],
                    x: [0, -25, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.path
                  d={svgPaths.p3cffab80}
                  fill="var(--fill-0, #D96CFF)"
                  id="Vector 599"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                    x: [0, 15, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.path
                  d={svgPaths.p1ba47080}
                  fill="var(--fill-0, #5CEBFF)"
                  id="Vector 598"
                  animate={{
                    scale: [1, 1.2, 0.8, 1],
                    opacity: [0.6, 1, 0.4, 0.6],
                    x: [0, -20, 10, 0],
                    y: [0, 15, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.25,
                  }}
                />
                <motion.path
                  d={svgPaths.p2be94c00}
                  fill="var(--fill-0, #5C9DFF)"
                  id="Vector 600"
                  animate={{
                    scale: [1, 0.8, 1.3, 1],
                    opacity: [0.5, 1, 0.3, 0.5],
                    x: [0, 25, -15, 0],
                    y: [0, -10, 25, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.75,
                  }}
                />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2205.12" id="filter0_f_1_254" width="2515.34" x="0.833069" y="0.405785">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_1_254" stdDeviation="235.422" />
                </filter>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Second animated gradient layer with multiply blend - Fast and vibrant */}
        <motion.div
          className="absolute inset-[-27.79%_-2.52%_-28.08%_-15.02%] mix-blend-multiply will-change-transform"
          animate={{
            x: [0, -40, 35, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.95, 1.08, 1],
            rotate: [0, -4, 2, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{
            transform: "translateZ(0)", // Force GPU acceleration
          }}
        >
          <div className="absolute inset-[-24.3%_-25.68%_-23.06%_-22.93%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2517 2206">
              <g filter="url(#filter0_f_1_247)" id="Group 3" style={{ mixBlendMode: "multiply" }}>
                <motion.path
                  d={svgPaths.pc580840}
                  fill="var(--fill-0, #F3ACFF)"
                  id="Vector 596"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
                <motion.path
                  d={svgPaths.pca38900}
                  fill="var(--fill-0, #FF6CDF)"
                  id="Vector 597"
                  animate={{
                    scale: [1, 0.88, 1],
                    opacity: [0.95, 0.85, 0.95],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                />
                <motion.path
                  d={svgPaths.p3cffab80}
                  fill="var(--fill-0, #D96CFF)"
                  id="Vector 599"
                  animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                />
                <motion.path
                  d={svgPaths.p1ba47080}
                  fill="var(--fill-0, #5CEBFF)"
                  id="Vector 598"
                  animate={{
                    scale: [1, 1.1, 0.92, 1],
                    opacity: [0.95, 1, 0.9, 0.95],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                />
                <motion.path
                  d={svgPaths.p2be94c00}
                  fill="var(--fill-0, #5C9DFF)"
                  id="Vector 600"
                  animate={{
                    scale: [1, 0.9, 1.15, 1],
                    opacity: [0.9, 0.95, 0.85, 0.9],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2205.12" id="filter0_f_1_247" width="2515.34" x="0.833069" y="0.405792">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_1_247" stdDeviation="235.422" />
                </filter>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Animated gradient overlay - Faster pulse */}
        <motion.div
          className="absolute bg-gradient-to-b blur-[30px] bottom-[70.3%] filter from-[#ffffff] left-0 right-0 to-[rgba(255,255,255,0)] top-0"
          animate={{
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div aria-hidden="true" className="absolute border-[10px] border-solid border-white inset-[-10px] pointer-events-none" />
    </div>
  );
}
