import React from 'react'

export interface HoteInfoProps {
    name: string;
    userImg: string;
    description: string;
    anciennete: number;
}

function Hote({ name, userImg, description, anciennete }: HoteInfoProps) {
  return (
    <div className='flex flex-col gap-3 items-start justify-center rounded-md bg-slate-50 w-full p-4'>
        <p className='text-lg font-bold'>Hôte {name}</p>
        <div className='flex flex-row gap-2'>
            <img src={userImg} alt={name} className='w-20 h-20 rounded-full' />
            <div className='flex flex-col items-start justify-center gap-2'>
                <p className='text-lg font-bold'>Hebergé par {name}</p>
                <p className='text-sm text-bold text-gray-500'>Depuis {anciennete} ans</p>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-sm text-bold text-gray-500 whitespace-pre-line'>{description}</p>
        </div>
    </div>
  )
}

export default Hote