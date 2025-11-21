import React, { useState } from 'react';

function Security() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex flex-col gap-[14px] items-center px-[19px] py-[20px] rounded-[24px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.12)] w-full">
      {/* Title */}
      <p className="text-[18px] font-bricolagegrotesque font-medium leading-[28px] text-slate-950 w-full">
        Connexion et sécurité
      </p>

      {/* Form Fields */}
      <div className="flex flex-col gap-[22px] items-start w-full">
        {/* New Password Input */}
        <div className="relative w-full">
          <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
              placeholder=""
            />
          </div>
          <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
            Nouveau mot de passe
          </label>
        </div>

        {/* Confirm Password Input */}
        <div className="relative w-full">
          <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
              placeholder=""
            />
          </div>
          <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
            Confirmer le mot de passe
          </label>
        </div>

        {/* Divider */}
        <div className="w-full px-[12px] py-[12px]">
          <div className="h-[1px] bg-slate-200 w-full"></div>
        </div>

        {/* Google Connection */}
        <div className="flex gap-[22px] items-center w-full">
          <div className="flex flex-1 flex-col items-start justify-center">
            <div className="flex gap-[8px] items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <p className="text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                Google
              </p>
            </div>
            <div className="pl-[32px] w-full">
              <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600">
                Connecté
              </p>
            </div>
          </div>
          <button className="bg-slate-200 h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity">
            <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-slate-500">
              Déconnexion
            </p>
          </button>
        </div>

        {/* Meta Connection */}
        <div className="flex gap-[22px] items-center w-full">
          <div className="flex flex-1 flex-col items-start justify-center">
            <div className="flex gap-[8px] items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              <p className="text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                Meta
              </p>
            </div>
            <div className="pl-[32px] w-full">
              <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600">
                Connecté
              </p>
            </div>
          </div>
          <button className="bg-slate-200 h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity">
            <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-slate-500">
              Déconnexion
            </p>
          </button>
        </div>

        {/* X-Twitter Connection */}
        <div className="flex gap-[22px] items-center w-full">
          <div className="flex flex-1 flex-col items-start justify-center">
            <div className="flex gap-[8px] items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" className="text-slate-800"/>
              </svg>
              <p className="text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                X-Twitter
              </p>
            </div>
            <div className="pl-[32px] w-full">
              <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600">
                Connecté
              </p>
            </div>
          </div>
          <button className="bg-slate-200 h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity">
            <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-slate-500">
              Déconnexion
            </p>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full px-[12px] py-[12px]">
          <div className="h-[1px] bg-slate-200 w-full"></div>
        </div>

        {/* Deactivate Account */}
        <div className="flex gap-[22px] items-center w-full">
          <div className="flex flex-1 flex-col items-start justify-center">
            <div className="flex gap-[8px] items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M12 21C15.866 21 19 19.2091 19 17C19 14.7909 15.866 13 12 13C8.13401 13 5 14.7909 5 17C5 19.2091 8.13401 21 12 21Z" stroke="#EF4444" strokeWidth="1.5"/>
              </svg>
              <p className="text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-red-500">
                Désactivez le compte
              </p>
            </div>
            <div className="pl-[32px] w-full">
              <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600">
                Connecté
              </p>
            </div>
          </div>
          <button className="bg-red-100 h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity">
            <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-red-500">
              Désactiver
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Security;
