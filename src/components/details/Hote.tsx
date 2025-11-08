import React from 'react'

export interface HoteInfoProps {
    name: string;
    userImg: string;
    description: string;
    anciennete: number;
}

function Hote({ name, userImg, description, anciennete }: HoteInfoProps) {
  return (
    <div className='flex flex-col gap-[16px] items-start justify-center rounded-[26px] bg-slate-50 w-full p-[32px]'>
        <p className='text-[24px] font-bold font-outfit leading-[36px]'>Hôte {name}</p>
        <div className='flex flex-row gap-[16px]'>
            <img src={userImg} alt={name} className='w-[128px] h-[128px] rounded-full' />
            <div className='flex flex-col items-start justify-center gap-[6px]'>
                <p className='text-[20px] font-semibold font-outfit leading-[32px]'>Hebergé par {name}</p>
                <p className='text-[20px] text-normal text-slate-800 font-outfit leading-[32px]'>Depuis {anciennete} ans</p>
            </div>
        </div>
        <div className='flex flex-col'>
            <p className='text-[16px] text-normal text-slate-700 whitespace-pre-line font-outfit'>{description}</p>
        </div>
    </div>
  )
}

export default Hote