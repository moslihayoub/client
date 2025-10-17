import { motion } from "motion/react";
import svgPaths from "../svgs/Background/DarkBackSvg";

export default function DarkAnimatedBg() {
  return (
    <div className="bg-[#232324] size-full overflow-hidden z-0 fixed inset-0" data-name="Animated gradients">
      <div className="relative size-full">
        <div className="absolute bottom-[-42.22%] left-0 right-[-11.77%] top-[-13.75%]" data-name="group 1">
          <div className="absolute bottom-0 left-[-13.82%] right-0 top-[-16.52%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1832 1746">
              <g filter="url(#filter0_f_1_17)" id="group 1">
                {/* Cyan blob */}
                <motion.path
                  d={svgPaths.p31dd8780}
                  fill="#00A3FF"
                  id="shape 1"
                  animate={{
                    d: [
                      svgPaths.p31dd8780,
                      "M200.999 1150.85C80.316 1030.36 275.343 735.276 390.942 599.297C418.346 593.961 476.261 605.171 488.694 692.702C504.234 802.115 630.684 812.341 803.051 737.467C975.419 662.592 1320.97 580.832 1373.55 740.528C1426.12 900.224 1298.16 999.88 1111.84 1154.64C925.527 1309.39 901.252 1130.12 713.531 1261.79C525.81 1393.46 319.854 1338.46 200.999 1150.85Z",
                      svgPaths.p31dd8780,
                    ],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Magenta blob */}
                <motion.path
                  d={svgPaths.p385b9900}
                  fill="#DB00FF"
                  id="shape 2"
                  animate={{
                    d: [
                      svgPaths.p385b9900,
                      "M1590.76 750.069C1760.61 827.432 1610.38 1032.43 1597.36 1187.56C1532.88 1156.15 1386.56 1109.48 1317.11 1174.07C1230.29 1254.81 1147.51 1423.17 989.441 1478.8C831.376 1534.42 685.268 1253.16 707.205 1173.17C729.141 1093.18 809.906 966.423 800.324 1086.57C790.743 1206.72 979.886 1200.32 1176.71 1057.01C1373.53 913.695 1421.91 672.706 1590.76 750.069Z",
                      svgPaths.p385b9900,
                    ],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Blue blob */}
                <motion.path
                  d={svgPaths.p26ba000}
                  fill="#000AFF"
                  id="shape 3"
                  animate={{
                    d: [
                      svgPaths.p26ba000,
                      "M1420.64 660.964C1409.95 783.043 1244.49 919.434 1065.62 1049.5C1044.49 1041.23 1000.16 1003.76 991.962 920.082C981.715 815.485 850.355 722.324 656.47 720.251C462.585 718.177 434.888 687.002 500.253 480.392C565.617 273.782 699.163 119.546 714.328 162.935C729.493 206.324 972.047 337.668 1088.63 419.693C1205.22 501.719 1431.34 538.884 1420.64 660.964Z",
                      svgPaths.p26ba000,
                    ],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1879.76" id="filter0_f_1_17" width="1965.7" x="0.699219" y="0.585953">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_1_17" stdDeviation="67.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute bg-gradient-to-b blur-[30px] bottom-[70.3%] filter from-[rgba(2,6,23,0.6)] left-0 right-0 to-[rgba(2,6,23,0)] top-0" />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-[rgba(255,255,255,0.08)] border-solid inset-[-8px] pointer-events-none" />
    </div>
  );
}
