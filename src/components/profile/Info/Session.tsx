import React from "react";

export interface SessionItem {
  id: string;
  deviceName: string;
  date: string;
  location: string;
  deviceType: 'mobile' | 'laptop' | 'desktop';
  isCurrent?: boolean;
}

export interface SessionProps {
  sessions?: SessionItem[];
}

const Session: React.FC<SessionProps> = ({ sessions }) => {
  // Default sessions if none provided
  const defaultSessions: SessionItem[] = [
    {
      id: '1',
      deviceName: 'Session en cours',
      date: 'Le 09/11/2025 à 19:34',
      location: 'Casablanca',
      deviceType: 'mobile',
      isCurrent: true
    },
    {
      id: '2',
      deviceName: 'Mac_AM',
      date: 'Le 22/08/2025 à 09:22',
      location: 'Rabat',
      deviceType: 'laptop'
    },
    {
      id: '3',
      deviceName: 'PC Workshop',
      date: 'Le 22/08/2025 à 09:22',
      location: 'Agadir',
      deviceType: 'desktop'
    }
  ];

  const sessionList = sessions || defaultSessions;

  const getDeviceIcon = (type: 'mobile' | 'laptop' | 'desktop') => {
    switch (type) {
      case 'mobile':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="2" width="14" height="20" rx="2" stroke="#0EA5E9" strokeWidth="1.5" />
            <path d="M9 18H15" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'laptop':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9C3 7.11438 3 6.17157 3.58579 5.58579C4.17157 5 5.11438 5 7 5H17C18.8856 5 19.8284 5 20.4142 5.58579C21 6.17157 21 7.11438 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z" stroke="#0EA5E9" strokeWidth="1.5" />
            <path opacity="0.5" d="M22 21H2" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity="0.5" d="M15 15H9" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'desktop':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="20" height="14" rx="2" stroke="#0EA5E9" strokeWidth="1.5" />
            <path d="M8 22H16" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 18V22" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="6" y="8" width="12" height="6" rx="1" fill="#0EA5E9" opacity="0.2" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col w-full gap-[34px] items-center px-[19px] py-[20px] rounded-[24px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.12)]">
      {/* Title */}
      <p className="text-[18px] font-bricolagegrotesque font-medium leading-[28px] text-slate-950 w-full">
        Historique de l'appareil
      </p>

      {/* Sessions List */}
      <div className="flex flex-col gap-[22px] items-start w-full">
        {sessionList.map((session) => (
          <div key={session.id} className="flex items-center w-full">
            {/* Left side - Session Info */}
            <div className="flex flex-[1_0_0] flex-col items-start justify-center min-w-0">
              {/* Device Name with Icon */}
              <div className="flex gap-[4px] items-center">
                <div className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
                  {getDeviceIcon(session.deviceType)}
                </div>
                <p className="text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500 whitespace-nowrap">
                  {session.deviceName}
                </p>
              </div>

              {/* Date */}
              <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600">
                {session.date}
              </p>

              {/* Location */}
              <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-500">
                {session.location}
              </p>
            </div>

            {/* Right side - Disconnect Button */}
            <button className="bg-slate-200 h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] flex-shrink-0 hover:bg-slate-300 transition-colors duration-200">
              <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-slate-500 whitespace-nowrap">
                Déconnexion
              </p>
            </button>
          </div>
        ))}

        {/* Divider */}
        <div className="w-full px-0 py-[12px]">
          <div className="h-[1px] bg-slate-300 w-full"></div>
        </div>

        {/* Disconnect All Accounts */}
        <div className="flex items-center w-full">
          <p className="flex-[1_0_0] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-red-500 min-w-0">
            Déconnexion tous les comptes
          </p>
          <button className="bg-red-100 h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] flex-shrink-0 hover:bg-red-200 transition-colors duration-200">
            <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-red-500 whitespace-nowrap">
              Déconnexion
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Session;
