interface ProfileHeaderProps {
  onModifierClick?: () => void;
}

export default function ProfileHeader({ onModifierClick }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-[6px] px-[18px] py-[28px] rounded-[24px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.12)] w-full">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-[6px] w-full">
        <div className="flex flex-col items-end pb-[32px] pt-0 px-0 relative">
          {/* Profile Picture - 120px */}
          <div className="relative w-[120px] h-[120px] mb-[-32px]">
            <img
              src="/users/user1.png"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Verified Badge - 38px, positioned at bottom-right */}
          <div className="relative w-[38px] h-[38px] mb-[-32px] z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7573 21.375C20.2672 20.9568 19.6441 20.7271 18.9998 20.7271C18.3556 20.7271 17.7324 20.9568 17.2423 21.375C16.8093 21.7454 16.2699 21.9688 15.7017 22.0131C15.0599 22.0641 14.4573 22.3423 14.002 22.7976C13.5467 23.2529 13.2685 23.8555 13.2175 24.4973C13.1732 25.0658 12.9483 25.6057 12.5794 26.0379C12.1616 26.5279 11.9321 27.1507 11.9321 27.7946C11.9321 28.4385 12.1616 29.0614 12.5794 29.5513C12.9498 29.9844 13.1732 30.5238 13.2175 31.0919C13.2682 31.7343 13.5464 32.3375 14.0021 32.7932C14.4577 33.2488 15.0609 33.527 15.7033 33.5778C16.2702 33.6221 16.8101 33.8453 17.2439 34.2142C17.7338 34.6316 18.3563 34.8608 18.9998 34.8608C19.6434 34.8608 20.2659 34.6316 20.7557 34.2142C21.1888 33.8438 21.7282 33.6204 22.2963 33.5762C22.9384 33.5255 23.5415 33.2475 23.9971 32.7922C24.4527 32.3368 24.731 31.734 24.7822 31.0919C24.8265 30.5251 25.0497 29.9836 25.4187 29.5513C25.8364 29.0614 26.0659 28.4385 26.0659 27.7946C26.0659 27.1507 25.8364 26.5279 25.4187 26.0379C25.0482 25.6049 24.8248 25.0655 24.7806 24.4973C24.7295 23.8555 24.4514 23.2529 23.9961 22.7976C23.5408 22.3423 22.9382 22.0641 22.2963 22.0131C21.7282 21.9688 21.1904 21.7454 20.7573 21.375ZM22.1839 27.0798C22.298 26.9733 22.3899 26.8454 22.4545 26.7034C22.5192 26.5614 22.5552 26.4081 22.5606 26.2522C22.5659 26.0962 22.5405 25.9408 22.4858 25.7947C22.4311 25.6486 22.3482 25.5147 22.2417 25.4006C22.1352 25.2866 22.0074 25.1946 21.8654 25.13C21.7234 25.0654 21.57 25.0293 21.4141 25.024C21.2582 25.0186 21.1027 25.044 20.9566 25.0987C20.8105 25.1534 20.6766 25.2364 20.5626 25.3428L17.9817 27.7542L17.4339 27.2428C17.2036 27.0278 16.8973 26.9131 16.5824 26.924C16.2675 26.9348 15.9698 27.0703 15.7548 27.3006C15.5398 27.531 15.4251 27.8373 15.4359 28.1522C15.4468 28.4671 15.5822 28.7647 15.8126 28.9797L17.1695 30.2464C17.3894 30.4519 17.6792 30.5662 17.9802 30.5662C18.2811 30.5662 18.5709 30.4519 18.7908 30.2464L22.1839 27.0798Z" fill="url(#paint0_radial_3244_811)" />
              <path d="M3.1665 19.0001V12.6667C3.1665 8.18908 3.1665 5.94866 4.55825 4.5585C5.94842 3.16675 8.18884 3.16675 12.6665 3.16675H25.3332C29.8108 3.16675 32.0513 3.16675 33.4414 4.5585C34.8332 5.94866 34.8332 8.18908 34.8332 12.6667V19.0001C34.8332 23.4777 34.8332 25.7182 33.4414 27.1083C32.1193 28.432 30.0278 28.4969 25.9728 28.5001C26.0873 28.0755 26.0967 27.6295 26.0002 27.2005C25.9036 26.7715 25.704 26.3725 25.4187 26.038C25.0483 25.605 24.8248 25.0655 24.7806 24.4974C24.7295 23.8556 24.4514 23.2529 23.9961 22.7976C23.5408 22.3424 22.9382 22.0642 22.2963 22.0132C21.7282 21.9689 21.1888 21.7455 20.7558 21.3751C20.2658 20.9573 19.643 20.7278 18.999 20.7278C18.3551 20.7278 17.7323 20.9573 17.2423 21.3751C16.8093 21.7455 16.2699 21.9689 15.7018 22.0132C15.0599 22.0642 14.4573 22.3424 14.002 22.7976C13.5467 23.2529 13.2686 23.8556 13.2175 24.4974C13.1732 25.0658 12.9483 25.6057 12.5794 26.038C12.2941 26.3725 12.0945 26.7715 11.9979 27.2005C11.9014 27.6295 11.9108 28.0755 12.0253 28.5001C7.97192 28.4969 5.88192 28.432 4.55825 27.1083C3.1665 25.7182 3.1665 23.4777 3.1665 19.0001Z" fill="url(#paint1_radial_3244_811)" />
              <path d="M13.0627 9.5C13.0627 9.18506 13.1878 8.88301 13.4105 8.66031C13.6332 8.43761 13.9352 8.3125 14.2502 8.3125H23.7502C24.0651 8.3125 24.3672 8.43761 24.5899 8.66031C24.8126 8.88301 24.9377 9.18506 24.9377 9.5C24.9377 9.81494 24.8126 10.117 24.5899 10.3397C24.3672 10.5624 24.0651 10.6875 23.7502 10.6875H14.2502C13.9352 10.6875 13.6332 10.5624 13.4105 10.3397C13.1878 10.117 13.0627 9.81494 13.0627 9.5ZM11.0835 13.8542C10.7686 13.8542 10.4665 13.9793 10.2438 14.202C10.0211 14.4247 9.896 14.7267 9.896 15.0417C9.896 15.3566 10.0211 15.6587 10.2438 15.8814C10.4665 16.1041 10.7686 16.2292 11.0835 16.2292H26.9168C27.2318 16.2292 27.5338 16.1041 27.7565 15.8814C27.9792 15.6587 28.1043 15.3566 28.1043 15.0417C28.1043 14.7267 27.9792 14.4247 27.7565 14.202C27.5338 13.9793 27.2318 13.8542 26.9168 13.8542H11.0835Z" fill="white" />
              <defs>
                <radialGradient id="paint0_radial_3244_811" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.999 19.6335) rotate(90) scale(20.008 20.008)">
                  <stop stop-color="#2DD4BF" />
                  <stop offset="0.509615" stop-color="#0EA5E9" />
                  <stop offset="1" stop-color="#D946EF" />
                </radialGradient>
                <radialGradient id="paint1_radial_3244_811" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.9998 -17.2191) rotate(90) scale(54.2878 67.8598)">
                  <stop stop-color="#2DD4BF" />
                  <stop offset="0.509615" stop-color="#0EA5E9" />
                  <stop offset="1" stop-color="#D946EF" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Verified Text Section */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Profil vérifié - Gradient text */}
          <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-nexastay-gradient bg-clip-text text-transparent">
            Profil vérifié
          </p>

          {/* 1 an sur NexaStay */}
          <p className="text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 text-center h-[28px] flex items-center justify-center">
            1 an sur NexaStay
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full px-[52px] py-[12px]">
        <div className="h-[1px] bg-slate-200 w-full"></div>
      </div>

      {/* User Info Section */}
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="flex flex-col items-center pb-[6px] pt-0 px-0 w-full">
          {/* Name */}
          <p className="text-[24px] font-bricolagegrotesque font-semibold leading-[36px] text-slate-800">
            Ayoub.M
          </p>

          {/* Username */}
          <p className="text-[20px] font-bricolagegrotesque font-normal leading-[32px] text-slate-600">
            @moslih84
          </p>
        </div>

        {/* Location */}
        <p className="text-[16px] font-bricolagegrotesque font-normal leading-[24px] text-slate-600">
          Casablanca, Maroc
        </p>
      </div>

      {/* Divider */}
      <div className="w-full px-[52px] py-[12px]">
        <div className="h-[1px] bg-slate-200 w-full"></div>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col gap-[14px] items-center w-full">
        <div className="flex flex-col items-center justify-center text-center w-full">
          {/* Phone */}
          <p className="text-[16px] font-bricolagegrotesque font-normal leading-[24px] text-slate-600 w-full">
            +212 663 585065
          </p>

          {/* Email */}
          <p className="text-[16px] font-bricolagegrotesque font-normal leading-[24px] text-slate-600 w-full">
            moslihayoub@gmail.com
          </p>

          {/* CIN */}
          <p className="text-[16px] font-bricolagegrotesque font-normal leading-[24px] text-slate-600 w-full">
            CIN - BJ345890
          </p>
        </div>

        {/* Modifier Button */}
        <button 
          onClick={onModifierClick}
          className="w-[128px] h-[52px] px-[28px] py-[12px] rounded-full flex items-center justify-center gap-[12px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] hover:opacity-90 transition-opacity duration-200"
          style={
            {
              background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)'
            }
          }>
          <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-white">
            Modifier
          </p>
        </button>
      </div>
    </div>
  );
}
