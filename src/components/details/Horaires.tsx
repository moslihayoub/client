import React from 'react';

interface HorairesProps {
  jourDebut: string;
  jourFin: string;
  heureDebut: string;
  heureFin: string;
  phoneNumber?: string;
}

function Horaires({ jourDebut, jourFin, heureDebut, heureFin, phoneNumber = '0522 67 67 89' }: HorairesProps) {
  // Format time from "08:00" to "8h" or "09:00" to "9h"
  const formatTime = (time: string): string => {
    const [hours] = time.split(':');
    const hour = parseInt(hours, 10);
    return `${hour}h`;
  };

  // Format day range
  const formatDayRange = (start: string, end: string): string => {
    return `Du ${start.toLowerCase()} au ${end.toLowerCase()}`;
  };

  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-[40px] items-start w-full mb-[40px]">
      {/* Horaires Section */}
      <div className="flex flex-1 flex-col gap-[16px] items-start w-full">
        <p className="text-2xl font-bold font-bricolagegrotesque text-slate-800 leading-[36px]">
          Horaires
        </p>
        <div className="flex flex-col gap-[10px] items-start w-full">
          {/* Main schedule */}
          <div className="flex gap-[12px] items-center w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-base font-semibold text-slate-700 font-bricolagegrotesque leading-[24px]">
              {formatDayRange(jourDebut, jourFin)}, de {formatTime(heureDebut)} à {formatTime(heureFin)}
            </p>
          </div>
          {/* Saturday schedule (optional - can be made dynamic later) */}
          <div className="flex gap-[16px] items-start w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-base font-semibold text-slate-700 font-bricolagegrotesque leading-[24px]">
              Samedi, de 9h à 12h
            </p>
          </div>
        </div>
      </div>

      {/* Urgence Section */}
      <div className="flex flex-1 flex-col gap-[16px] items-start w-full">
        <p className="text-2xl font-bold font-bricolagegrotesque text-slate-800 leading-[36px]">
          Urgence
        </p>
        <div className="flex flex-col gap-[10px] items-start w-full">
          <div className="flex gap-[12px] items-center w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-base font-semibold text-slate-700 font-bricolagegrotesque leading-[24px]">
              En cas d'urgence, veuillez nous contacter au numéro suivant
            </p>
          </div>
          <div className="flex flex-col gap-[10px] items-start pl-[34px] w-full">
            <button className="bg-emerald-500 hover:bg-emerald-600 rounded-xl px-[15px] py-[6px] flex gap-[4px] items-center justify-center transition-colors">
              <p className="text-base font-medium text-white font-bricolagegrotesque leading-[24px]">
                Contactez-nous au {phoneNumber}
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.718 3.09179C5.944 1.80079 7.972 2.04179 8.986 3.47579L10.246 5.25979C11.057 6.40679 10.989 7.99979 10.021 9.01979L9.776 9.27679L9.774 9.28279C9.761 9.31879 9.729 9.43479 9.761 9.65479C9.828 10.1098 10.179 11.0358 11.607 12.5388C13.039 14.0468 13.907 14.4018 14.31 14.4678C14.4071 14.4899 14.5081 14.4875 14.604 14.4608L15.012 14.0308C15.886 13.1108 17.248 12.9298 18.347 13.5618L20.257 14.6618C21.89 15.6018 22.27 17.9008 20.965 19.2748L19.545 20.7698C19.102 21.2368 18.497 21.6358 17.75 21.7098C15.926 21.8898 11.701 21.6548 7.272 16.9908C3.138 12.6398 2.353 8.85479 2.254 7.00579C2.205 6.09179 2.612 5.30879 3.148 4.74379L4.718 3.09179ZM7.761 4.34179C7.249 3.61779 6.328 3.57379 5.805 4.12479L4.235 5.77679C3.905 6.12679 3.73 6.52679 3.752 6.92579C3.832 8.43579 4.483 11.8778 8.359 15.9578C12.423 20.2378 16.168 20.3578 17.603 20.2168C17.886 20.1888 18.178 20.0308 18.457 19.7368L19.877 18.2418C20.491 17.5958 20.33 16.4338 19.509 15.9618L17.599 14.8618C17.086 14.5668 16.485 14.6578 16.1 15.0638L15.644 15.5438L15.117 15.0428C15.644 15.5428 15.644 15.5438 15.643 15.5448L15.642 15.5458L15.639 15.5498L15.632 15.5558L15.618 15.5698C15.5761 15.611 15.5305 15.6485 15.482 15.6818C15.402 15.7378 15.296 15.8008 15.161 15.8538C14.885 15.9628 14.521 16.0208 14.07 15.9478C13.192 15.8058 12.042 15.1748 10.52 13.5718C8.992 11.9638 8.407 10.7648 8.277 9.87179C8.21 9.41779 8.263 9.05479 8.361 8.77979C8.41552 8.62659 8.49308 8.4826 8.591 8.35279L8.621 8.31579L8.635 8.30079L8.641 8.29379L8.644 8.29079L8.646 8.28979C8.646 8.28979 8.646 8.28779 9.179 8.79279L8.647 8.28779L8.934 7.98579C9.379 7.51679 9.444 6.72279 9.022 6.12579L7.761 4.34179Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Horaires;
