import React from "react";
import Logement from "../svgs/icons/Logement";
import Services from "../svgs/icons/Services";

interface TabSelectionMobileProps {
    selectedTab: string;
    onTabChange: (tab: string) => void;
}

const TabSelectionMobile: React.FC<TabSelectionMobileProps> = ({ selectedTab, onTabChange }) => {
    return (
        <div className="bg-white border-[1.5px] border-solid cursor-pointer flex gap-2 items-center px-[14px] py-3 rounded-full w-full relative">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-[1.5px]">
                <div className="bg-white rounded-full h-full w-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex gap-2 items-center w-full">
                {/* Logement Tab */}
                 <button
                     onClick={() => {}}
                     className={`flex-1 flex w-[45%] gap-3 items-center justify-center px-6 py-3.5 rounded-full shadow-sm transition-all duration-200 ${selectedTab === 'logement'
                         ? ''
                         : 'bg-slate-900'
                         }`}
                     style={{
                         background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)'
                     }}
                 >
                    <div className="w-6 h-6 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.52 7.823C2 8.77 2 9.915 2 12.203V13.725C2 17.625 2 19.576 3.172 20.788C4.344 22 6.229 22 10 22H14C17.771 22 19.657 22 20.828 20.788C21.999 19.576 22 17.626 22 13.725V12.204C22 9.915 22 8.771 21.48 7.823C20.962 6.874 20.013 6.286 18.116 5.108L16.116 3.867C14.111 2.622 13.108 2 12 2C10.892 2 9.89 2.622 7.884 3.867L5.884 5.108C3.987 6.286 3.039 6.874 2.52 7.823ZM11.25 18C11.25 18.1989 11.329 18.3897 11.4697 18.5303C11.6103 18.671 11.8011 18.75 12 18.75C12.1989 18.75 12.3897 18.671 12.5303 18.5303C12.671 18.3897 12.75 18.1989 12.75 18V15C12.75 14.8011 12.671 14.6103 12.5303 14.4697C12.3897 14.329 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.329 11.4697 14.4697C11.329 14.6103 11.25 14.8011 11.25 15V18Z" fill="white" />
                        </svg>
                    </div>
                    <p className="font-semibold text-lg text-white font-outfit leading-7">
                        Logement
                    </p>
                </button>

                {/* Par liste Tab */}
                 <button
                     onClick={() => {}}
                     className={`flex-1 flex gap-3 items-center justify-center px-6 py-3.5 rounded-full shadow-sm transition-all duration-200 ${selectedTab === 'service'
                         ? ''
                         : 'bg-slate-900'
                         }`}
                 >
                    <div className="w-6 h-6 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C22 4.93 22 7.286 22 12Z" fill="white" />
                            <path d="M7 16.75C6.80109 16.75 6.61032 16.829 6.46967 16.9697C6.32902 17.1103 6.25 17.3011 6.25 17.5C6.25 17.6989 6.32902 17.8897 6.46967 18.0303C6.61032 18.171 6.80109 18.25 7 18.25H13C13.1989 18.25 13.3897 18.171 13.5303 18.0303C13.671 17.8897 13.75 17.6989 13.75 17.5C13.75 17.3011 13.671 17.1103 13.5303 16.9697C13.3897 16.829 13.1989 16.75 13 16.75H7ZM7 13.25C6.80109 13.25 6.61032 13.329 6.46967 13.4697C6.32902 13.6103 6.25 13.8011 6.25 14C6.25 14.1989 6.32902 14.3897 6.46967 14.5303C6.61032 14.671 6.80109 14.75 7 14.75H16C16.1989 14.75 16.3897 14.671 16.5303 14.5303C16.671 14.3897 16.75 14.1989 16.75 14C16.75 13.8011 16.671 13.6103 16.5303 13.4697C16.3897 13.329 16.1989 13.25 16 13.25H7ZM22 5C22 5.79565 21.6839 6.55871 21.1213 7.12132C20.5587 7.68393 19.7956 8 19 8C18.2044 8 17.4413 7.68393 16.8787 7.12132C16.3161 6.55871 16 5.79565 16 5C16 4.20435 16.3161 3.44129 16.8787 2.87868C17.4413 2.31607 18.2044 2 19 2C19.7956 2 20.5587 2.31607 21.1213 2.87868C21.6839 3.44129 22 4.20435 22 5Z" fill="white" />
                        </svg>
                    </div>
                    <p className="font-semibold text-lg text-white font-outfit leading-7">
                        Par liste
                    </p>
                </button>
            </div>
        </div>
    );
};

export default TabSelectionMobile;
