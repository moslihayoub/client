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
    <div className="flex flex-col gap-[40px] items-start w-full mb-[40px]">
      {/* Horaires Section */}
      <div className="flex flex-1 flex-col gap-[16px] items-start w-full">
        <p className="text-[24px] font-bold font-bricolagegrotesque text-slate-800 leading-[36px]">
          Horaires
        </p>
        <div className="flex flex-col gap-[10px] items-start w-full">
          {/* Main schedule */}
          <div className="flex gap-[12px] items-center w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[16px] font-semibold text-slate-700 font-vendsans leading-[24px]">
              {formatDayRange(jourDebut, jourFin)}, de {formatTime(heureDebut)} à {formatTime(heureFin)}
            </p>
          </div>
          {/* Saturday schedule (optional - can be made dynamic later) */}
          <div className="flex gap-[16px] items-start w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[16px] font-semibold text-slate-700 font-vendsans leading-[24px]">
              Samedi, de 9h à 12h
            </p>
          </div>
        </div>
      </div>

      {/* Urgence Section */}
      <div className="flex flex-1 flex-col gap-[16px] items-start w-full">
        <p className="text-[24px] font-bold font-bricolagegrotesque text-slate-800 leading-[36px]">
          Urgence
        </p>
        <div className="flex flex-col gap-[10px] items-start w-full">
          <div className="flex gap-[12px] items-center w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[16px] font-semibold text-slate-700 font-vendsans leading-[24px]">
              En cas d'urgence, veuillez nous contacter au numéro suivant
            </p>
          </div>
          <div className="flex flex-col gap-[10px] items-start pl-[34px] w-full">
            <button
              style={{
                background:
                  "var(--Green-GR, linear-gradient(180deg, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-teal-600, #0D9488) 100%))"
              }}
              className="rounded-xl px-[15px] py-[6px] flex gap-[4px] items-center justify-center transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.718 3.09227C5.944 1.80127 7.972 2.04227 8.986 3.47627L10.246 5.26027C11.057 6.40727 10.989 8.00027 10.021 9.02027L9.776 9.27727L9.774 9.28327C9.761 9.31927 9.729 9.43527 9.761 9.65527C9.828 10.1103 10.179 11.0363 11.607 12.5393C13.039 14.0473 13.907 14.4023 14.31 14.4683C14.4071 14.4904 14.5081 14.488 14.604 14.4613L15.012 14.0313C15.886 13.1113 17.248 12.9303 18.347 13.5623L20.257 14.6623C21.89 15.6023 22.27 17.9013 20.965 19.2753L19.545 20.7703C19.102 21.2373 18.497 21.6363 17.75 21.7103C15.926 21.8903 11.701 21.6553 7.272 16.9913C3.138 12.6403 2.353 8.85527 2.254 7.00627C2.205 6.09227 2.612 5.30927 3.148 4.74427L4.718 3.09227ZM7.761 4.34227C7.249 3.61827 6.328 3.57427 5.805 4.12527L4.235 5.77727C3.905 6.12727 3.73 6.52727 3.752 6.92627C3.832 8.43627 4.483 11.8783 8.359 15.9583C12.423 20.2383 16.168 20.3583 17.603 20.2173C17.886 20.1893 18.178 20.0313 18.457 19.7373L19.877 18.2423C20.491 17.5963 20.33 16.4343 19.509 15.9623L17.599 14.8623C17.086 14.5673 16.485 14.6583 16.1 15.0643L15.644 15.5443L15.117 15.0433C15.644 15.5433 15.644 15.5443 15.643 15.5453L15.642 15.5463L15.639 15.5503L15.632 15.5563L15.618 15.5703C15.5761 15.6115 15.5305 15.649 15.482 15.6823C15.402 15.7383 15.296 15.8013 15.161 15.8543C14.885 15.9633 14.521 16.0213 14.07 15.9483C13.192 15.8063 12.042 15.1753 10.52 13.5723C8.992 11.9643 8.407 10.7653 8.277 9.87227C8.21 9.41827 8.263 9.05527 8.361 8.78027C8.41552 8.62708 8.49308 8.48309 8.591 8.35327L8.621 8.31627L8.635 8.30127L8.641 8.29427L8.644 8.29127L8.646 8.29027C8.646 8.29027 8.646 8.28827 9.179 8.79327L8.647 8.28827L8.934 7.98627C9.379 7.51727 9.444 6.72327 9.022 6.12627L7.761 4.34227Z" fill="white" />
                <path d="M14.0381 1.75195C14.0439 1.75307 14.05 1.75478 14.0557 1.75586C14.0675 1.75812 14.0804 1.76108 14.0938 1.76367C14.1233 1.76939 14.1468 1.77372 14.1582 1.77637V1.77734L14.1689 1.7793C14.2383 1.79383 14.3429 1.82054 14.4873 1.86133V1.86035C14.6936 1.92094 14.9641 2.01218 15.2852 2.14453L15.625 2.29199C16.5723 2.72669 17.8468 3.49325 19.1768 4.82227C20.3403 5.98584 21.0722 7.1079 21.5283 8.00488L21.708 8.375C21.9246 8.84813 22.0578 9.23881 22.1387 9.51562V9.5166C22.1586 9.58532 22.178 9.6542 22.1953 9.72363L22.2422 9.93262L22.2432 9.94141L22.2441 9.94336C22.2555 10.012 22.2392 10.0828 22.1992 10.1396C22.1602 10.1951 22.1014 10.2326 22.0352 10.2461C21.9714 10.2552 21.9069 10.2398 21.8545 10.2021C21.8009 10.1637 21.7649 10.106 21.7539 10.041L21.752 10.0303L21.71 9.83789C21.6942 9.77426 21.6756 9.71111 21.6562 9.64844C21.5748 9.37526 21.4796 9.10641 21.3691 8.84375L21.2529 8.58105C20.8404 7.68247 20.1051 6.45861 18.8223 5.17578C17.5393 3.89294 16.3166 3.15955 15.417 2.74707H15.418C15.0713 2.58612 14.7129 2.45094 14.3467 2.3418L14.3398 2.33984L13.9951 2.25293L13.9824 2.25L13.9688 2.24805L13.9199 2.23438C13.873 2.21662 13.8317 2.18564 13.8018 2.14453C13.7625 2.09053 13.7451 2.02312 13.7539 1.95703C13.7594 1.92564 13.7713 1.89528 13.7881 1.86816C13.8053 1.84038 13.828 1.81599 13.8545 1.79688C13.8811 1.77775 13.9115 1.76435 13.9434 1.75684C13.9744 1.74955 14.0066 1.74718 14.0381 1.75195Z" fill="white" stroke="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.486 5.3299C13.513 5.23513 13.5584 5.14661 13.6195 5.06939C13.6807 4.99217 13.7565 4.92776 13.8426 4.87984C13.9287 4.83192 14.0234 4.80143 14.1213 4.79012C14.2191 4.7788 14.3183 4.78688 14.413 4.8139L14.207 5.5349L14.414 4.8149H14.416L14.42 4.8159L14.427 4.8179L14.447 4.8249C14.4623 4.8289 14.4813 4.83523 14.504 4.8439C14.5487 4.85923 14.6077 4.88256 14.681 4.9139C14.826 4.9759 15.025 5.0719 15.27 5.2169C15.76 5.5069 16.427 5.9869 17.212 6.7729C17.997 7.5579 18.479 8.2259 18.768 8.7149C18.913 8.9599 19.009 9.1589 19.072 9.3049C19.1049 9.3813 19.1346 9.45903 19.161 9.5379L19.167 9.5579L19.169 9.5659L19.17 9.5689V9.5709L18.45 9.7779L19.171 9.5719C19.227 9.76285 19.2048 9.96822 19.1093 10.1428C19.0139 10.3174 18.853 10.4469 18.662 10.5029C18.4711 10.5589 18.2657 10.5367 18.0911 10.4412C17.9165 10.3458 17.787 10.1849 17.731 9.9939L17.728 9.9839L17.693 9.8959C17.6292 9.75279 17.5571 9.61355 17.477 9.4789C17.254 9.1029 16.852 8.5329 16.152 7.8329C15.452 7.1329 14.882 6.7309 14.506 6.5079C14.3441 6.41284 14.1757 6.3293 14.002 6.2579L13.992 6.2539C13.8029 6.19731 13.6438 6.06847 13.549 5.89532C13.4543 5.72216 13.4317 5.51964 13.486 5.3299Z" fill="white" />
              </svg>

              <p className="text-[16px] font-medium text-white font-bricolagegrotesque leading-[24px]">
                {phoneNumber}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Horaires;
