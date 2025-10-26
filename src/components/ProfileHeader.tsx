export default function ProfileHeader() {
    return (
      <div className="flex flex-col items-center gap-[6px] p-[28px_18px] rounded-[24px] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] self-stretch">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="/images/boy.png"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
  
          <div className="mt-3 text-center">
            <p className="text-blue-600 font-medium">Profil vérifié</p>
            <p className="text-gray-500 text-sm">1 an sur NexaStay</p>
          </div>
  
          <div className="mt-3 text-center">
            <h2 className="font-semibold text-lg text-gray-900">Ayoub.M</h2>
            <p className="text-gray-500 text-sm">@moslih84</p>
            <p className="text-gray-700 text-sm">Casablanca, Maroc</p>
          </div>
        </div>
      </div>
    );
  }
  