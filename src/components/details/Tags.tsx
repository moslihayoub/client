import React from 'react'

export interface TagProps {
    text: string;
}

function Tags({ text }: TagProps) {
    return (
        <div className="flex items-center h-[38px] sm:h-[74px] md:h-[38px] lg:h-[38px] xl:h-[38px] border-[1px] border-solid border-slate-300 rounded-[12px] sm:rounded-[24px] md:rounded-[12px] lg:rounded-[12px] xl:rounded-[12px] px-[16px] py-[6px] sm:p-[22px]">
            <p className='text-[14px] sm:text-[18px] md:text-[14px] lg:text-[14px] xl:text-[14px] font-semibold text-slate-800 font-bricolagegrotesque'>{text}</p>
        </div>
    )
}

export default Tags