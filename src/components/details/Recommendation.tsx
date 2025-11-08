import React from 'react'
import Zone from '../../svgs/icons/Zone';

interface RecommendationProps {
    title: string;
    description: string;
    image: string;
}

interface Inputprops {
    type: 'Hotels' | 'Services' | 'Experiences';
    cards : RecommendationProps[];
}
function Recommendation({ type, cards }: Inputprops) {
  return (
    <div className='flex flex-col gap-3 items-start justify-center w-full mb-5'>
        <div className='flex flex-row gap-2 items-center justify-between w-full mb-[16px]'>
            <p className='text-[24px] font-bold font-outfit'>{type} recommandés</p>
            <button className='text-sm bg-cyan-500 hover:bg-slate-800 transition-all duration-300 ease-in-out text-white pl-[15px] pr-[8px] py-[6px] rounded-[12px] w-[163px] h-[36px] flex flex-row items-center justify-center gap-[12px]'>
                <p className='text-[16px] font-medium font-outfit w-full'>Affiche la zone</p>
                <div className='w-6 h-6 flex items-center justify-center'>
                    <Zone />
                </div>
            </button>
        </div>
        <div className='flex flex-row items-start justify-start gap-2 overflow-x-auto scrollbar-hide w-full'>
            {cards.map((card) => (
                <div key={card.title} className='flex flex-col gap-2 flex-shrink-0 w-[220px] px-4'>
                    <img src={card.image} alt={card.title} className='w-full h-[134px] object-cover justify-center rounded-[24px]' />
                    <p className='text-[20px] font-bold font-outfit'>{card.title}</p>
                    <p className='text-[16px] leading-[24px] text-slate-700 font-outfit'>{card.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Recommendation