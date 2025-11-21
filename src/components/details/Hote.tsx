import React from 'react'

export interface HoteInfoProps {
    name: string;
    restaurantName?: string;
    userImg: string;
    description: string;
    anciennete: number;
    type: 'Hotel' | 'Service' | 'Experience' | 'Health';
}

function Hote({ name, restaurantName, userImg, description, anciennete, type }: HoteInfoProps) {
  // For Service and Hotel: show title, name with "Depuis X ans", description below
  // For Experience and Health: no title, name and description side by side with image
  
  if (type === 'Service' || type === 'Hotel') {
    return (
      <div className="flex flex-col bg-slate-50 rounded-[26px] gap-[16px] items-start w-full p-[32px]">
        <p className="text-2xl font-bold font-bricolagegrotesque text-slate-800 leading-[36px]">
          Hôte {name}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-[16px] items-center flex-1">
            <img 
              src={userImg} 
              alt={name} 
              className="w-[128px] h-[128px] rounded-full shrink-0 object-cover" 
            />
            <div className="flex flex-col gap-[6px] items-start justify-center flex-1">
              <p className="text-xl font-semibold font-bricolagegrotesque text-slate-800 leading-[32px]">
                {restaurantName ? restaurantName : name}
              </p>
              <p className="text-xl font-normal font-bricolagegrotesque text-slate-800 leading-[32px]">
                Depuis {anciennete} ans
              </p>
            </div>
          </div>
        </div>
        <p className="text-base font-normal font-bricolagegrotesque text-slate-700 leading-[24px] whitespace-pre-line">
          {description}
        </p>
      </div>
    );
  }

  // For Experience and Health
  return (
    <div className="flex flex-col bg-slate-50 rounded-[26px] gap-[16px] items-start w-full p-[32px]">
      <div className="flex gap-[16px] items-start w-full">
        <img 
          src={userImg} 
          alt={name} 
          className="w-[128px] h-[128px] rounded-full shrink-0 object-cover" 
        />
        <div className="flex flex-col gap-[6px] items-start justify-center flex-1">
          <p className="text-xl font-semibold font-bricolagegrotesque text-slate-800 leading-[32px]">
            {restaurantName ? restaurantName : name}
          </p>
          <p className="text-xl font-normal font-vendsans text-slate-800 leading-[32px] whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hote