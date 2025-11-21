import React from 'react'

export interface TagProps {
    text: string;
}

function Tags({ text }: TagProps) {
    return (
        <div className="flex items-center h-[74px] gap-2 border-[1px] border-solid border-slate-300 rounded-[24px] p-[22px]">
            <p className='text-[18px] font-semibold text-slate-800 font-bricolagegrotesque'>{text}</p>
        </div>
    )
}

export default Tags