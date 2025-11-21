import React, { useState, useRef } from 'react';

interface UserData {
    username: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    phone: string;
    email: string;
    cin: string;
    profileImage?: string;
}

interface InfoPersoProps {
    initialData?: UserData;
    onUpdate?: (data: UserData) => void;
}

const InfoPerso: React.FC<InfoPersoProps> = ({
    initialData,
    onUpdate
}) => {
    // Default user data (matching ProfileHeader)
    const defaultData: UserData = {
        username: 'moslih84',
        firstName: 'Ayoub',
        lastName: 'MOSLIH',
        country: 'Maroc',
        city: 'Casablanca',
        phone: '+212 663 585065',
        email: 'moslihayoub@gmail.com',
        cin: 'BJ345890',
        profileImage: '/users/user1.png'
    };

    const [formData, setFormData] = useState<UserData>(initialData || defaultData);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (field: keyof UserData, value: string) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);
        onUpdate?.(updatedData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedData = { ...formData, profileImage: reader.result as string };
                setFormData(updatedData);
                onUpdate?.(updatedData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col gap-[14px] items-center px-[19px] py-[20px] rounded-[24px] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.12)] w-full">
            {/* Title */}
            <p className="text-[18px] font-bricolagegrotesque font-medium leading-[28px] text-slate-950 w-full">
                Informations personnelles
            </p>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-end pb-[48px] pt-0 px-0 relative">
                {/* Profile Picture - 120px */}
                <div className="relative w-[120px] h-[120px] mb-[-48px]">
                    <img
                        src={formData.profileImage || '/users/user1.png'}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>

                {/* Camera Button Overlay */}
                <div className="relative mb-[-48px] z-10">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <div 
                        onClick={handleCameraClick}
                        className="w-[48px] h-[48px] rounded-full p-[2px] cursor-pointer hover:opacity-90 transition-opacity duration-200"
                        style={{
                            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)'
                        }}
                    >
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.4083 24.5001H16.593C20.2341 24.5001 22.0553 24.5001 23.3631 23.6426C23.9276 23.2729 24.4137 22.7956 24.7935 22.2379C25.6673 20.9546 25.6673 19.1661 25.6673 15.5914C25.6673 12.0167 25.6673 10.2282 24.7935 8.94489C24.4137 8.38721 23.9276 7.90989 23.3631 7.54022C22.5231 6.98839 21.4708 6.79122 19.8596 6.72122C19.0908 6.72122 18.4293 6.14955 18.2788 5.40872C18.1638 4.86607 17.865 4.37976 17.4328 4.032C17.0007 3.68423 16.4617 3.49633 15.907 3.50005H12.0943C10.9417 3.50005 9.94882 4.29922 9.72248 5.40872C9.57198 6.14955 8.91048 6.72122 8.14165 6.72122C6.53165 6.79122 5.47932 6.98955 4.63815 7.54022C4.07411 7.91001 3.58847 8.38732 3.20898 8.94489C2.33398 10.2282 2.33398 12.0156 2.33398 15.5914C2.33398 19.1672 2.33398 20.9534 3.20782 22.2379C3.58582 22.7932 4.07115 23.2704 4.63815 23.6426C5.94598 24.5001 7.76715 24.5001 11.4083 24.5001ZM14.0007 10.8186C11.3162 10.8186 9.13915 12.9547 9.13915 15.5902C9.13915 18.2257 11.3173 20.3654 14.0007 20.3654C16.684 20.3654 18.8622 18.2281 18.8622 15.5926C18.8622 12.9571 16.684 10.8186 14.0007 10.8186ZM14.0007 12.7272C12.3907 12.7272 11.084 14.0094 11.084 15.5914C11.084 17.1722 12.3907 18.4544 14.0007 18.4544C15.6107 18.4544 16.9173 17.1722 16.9173 15.5914C16.9173 14.0106 15.6107 12.7272 14.0007 12.7272ZM19.5097 11.7729C19.5097 11.2456 19.9448 10.8186 20.4827 10.8186H21.7777C22.3143 10.8186 22.7507 11.2456 22.7507 11.7729C22.7482 12.0283 22.6444 12.2722 22.4622 12.4512C22.28 12.6301 22.0342 12.7294 21.7788 12.7272H20.4827C20.3561 12.7285 20.2305 12.7047 20.1132 12.6574C19.9958 12.6102 19.8888 12.5402 19.7985 12.4516C19.7081 12.363 19.6361 12.2574 19.5866 12.141C19.537 12.0245 19.5109 11.8994 19.5097 11.7729Z" fill="url(#paint0_radial_3100_15361)" />
                                <defs>
                                    <radialGradient id="paint0_radial_3100_15361" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.0007 1.87514) rotate(90) scale(29.7279 33.0309)">
                                        <stop stopColor="#2DD4BF" />
                                        <stop offset="0.509615" stopColor="#0EA5E9" />
                                        <stop offset="1" stopColor="#D946EF" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[22px] items-start w-full">
                {/* Username - Full Width */}
                <div className="relative w-full">
                    <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                            placeholder=""
                        />
                    </div>
                    <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                        Nom d'utilisateur
                    </label>
                </div>

                {/* First Name and Last Name - Side by Side */}
                <div className="flex gap-[12px] items-start w-full">
                    {/* First Name */}
                    <div className="relative w-[calc(50%-6px)]">
                        <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                                placeholder=""
                            />
                        </div>
                        <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                            Prénom
                        </label>
                    </div>

                    {/* Last Name */}
                    <div className="relative w-[calc(50%-6px)]">
                        <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                                placeholder=""
                            />
                        </div>
                        <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                            Nom
                        </label>
                    </div>
                </div>

                {/* Country and City - Side by Side */}
                <div className="flex gap-[12px] items-start w-full">
                    {/* Country */}
                    <div className="relative w-[calc(50%-6px)]">
                        <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                            <input
                                type="text"
                                value={formData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                                placeholder=""
                            />
                        </div>
                        <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                            Pays
                        </label>
                    </div>

                    {/* City */}
                    <div className="relative w-[calc(50%-6px)]">
                        <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                                placeholder=""
                            />
                        </div>
                        <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                            Ville
                        </label>
                    </div>
                </div>

                {/* Phone - Full Width */}
                <div className="relative w-full">
                    <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                            placeholder=""
                        />
                    </div>
                    <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                        N téléphone
                    </label>
                </div>

                {/* Email - Full Width */}
                <div className="relative w-full">
                    <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                            placeholder=""
                        />
                    </div>
                    <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                        Email
                    </label>
                </div>

                {/* CIN - Full Width */}
                <div className="relative w-full">
                    <div className="bg-white border-[1.5px] border-slate-300 rounded-[18px] px-[18px] py-[16px] flex items-center">
                        <input
                            type="text"
                            value={formData.cin}
                            onChange={(e) => handleChange('cin', e.target.value)}
                            className="flex-1 text-[18px] font-bricolagegrotesque font-normal leading-[28px] text-slate-600 outline-none bg-transparent"
                            placeholder=""
                        />
                    </div>
                    <label className="absolute bg-white left-[14px] px-[8px] top-[-14px] text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-sky-500">
                        CIN
                    </label>
                </div>
            </div>
        </div>
    );
};

export default InfoPerso;
