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
        <div className='flex flex-row gap-2 items-center justify-between w-full mb-2'>
            <p className='text-2xl font-bold'>{type} recommandés</p>
            <button className='text-sm bg-cyan-500 text-white px-4 py-2 rounded-md w-[163px] h-[36px] flex flex-row items-center justify-center gap-2'>
                <p>Afficher la zone</p>
                <div className='w-6 h-6 flex items-center justify-center'>
                    <Zone />
                </div>
            </button>
        </div>
        <div className='flex flex-row items-start justify-start gap-2 overflow-x-auto scrollbar-hide w-full'>
            {cards.map((card) => (
                <div key={card.title} className='flex flex-col gap-2 flex-shrink-0 w-[220px] px-4'>
                    <img src={card.image} alt={card.title} className='w-full h-[134px] object-cover justify-center rounded-[24px]' />
                    <p className='text-xl font-bold'>{card.title}</p>
                    <p className='text-sm text-gray-500'>{card.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Recommendation