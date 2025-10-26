import React from "react";

interface StatItem {
  icon: string; // SVG or image path
  value: number | string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div
      className="
        flex flex-wrap justify-center
        items-start content-start
        gap-[4%]
        w-full max-w-[95%] mx-auto
      "
    >
      {stats.map((item, index) => (
        <div
          key={index}
          className="
            flex flex-col items-center
            w-[46%] 
            aspect-[4/5]
            px-[5%] py-[6%]
            bg-white rounded-[24px]
            shadow-[0_2px_14px_-2px_rgba(0,0,0,0.08)]
            transition-transform duration-300 ease-in-out
            hover:scale-[1.03]
          "
        >
          {/* Icon */}
          <img
            src={item.icon}
            alt={item.label}
            className="w-[55%] h-auto object-contain mb-[3%]"
          />

          {/* Separator line */}
          <div className="w-[25%] h-[1.5px] bg-gray-200 my-[3%]"></div>

          {/* Number */}
          <p className="text-[6vw] font-extrabold text-[#0090FF] leading-tight">
            {item.value}
          </p>

          {/* Label */}
          <p className="text-[4vw] font-semibold text-gray-900 text-center">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
