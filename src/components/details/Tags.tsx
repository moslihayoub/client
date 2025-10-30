import React from 'react'

export interface TagProps {
    text: string;
    Icon: React.ComponentType;
}

function Tags({ text, Icon }: TagProps) {
    return (
        <div className="flex items-center h-[74px] gap-2 border-[1px] border-solid border-slate-300 rounded-[24px] p-[22px]">
            <Icon />
            <p className='text-lg font-normal text-slate-700'>{text}</p>
        </div>
    )
}

export default Tags