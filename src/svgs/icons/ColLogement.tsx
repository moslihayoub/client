import React from 'react'

function ColLogement({ className }: { className: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2658_4183)">
                <path d="M1.5 9.153C1.5 7.43625 1.5 6.57825 1.89 5.86725C2.2785 5.1555 2.99025 4.7145 4.413 3.831L5.913 2.90025C7.41675 1.9665 8.169 1.5 9 1.5C9.831 1.5 10.5825 1.9665 12.087 2.90025L13.587 3.831C15.0097 4.7145 15.7215 5.1555 16.1108 5.86725C16.5 6.579 16.5 7.43625 16.5 9.15225V10.2938C16.5 13.2188 16.5 14.682 15.621 15.591C14.742 16.5 13.3282 16.5 10.5 16.5H7.5C4.67175 16.5 3.25725 16.5 2.379 15.591C1.50075 14.682 1.5 13.2195 1.5 10.2938V9.153Z" stroke="url(#paint0_radial_2658_4183)" stroke-width="1.5" />
                <path d="M9 11.25V13.5" stroke="url(#paint1_radial_2658_4183)" stroke-width="1.5" stroke-linecap="round" />
            </g>
            <defs>
                <radialGradient id="paint0_radial_2658_4183" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 0.339389) rotate(90) scale(21.2342)">
                    <stop stop-color="#2DD4BF" />
                    <stop offset="0.509615" stop-color="#0EA5E9" />
                    <stop offset="1" stop-color="#D946EF" />
                </radialGradient>
                <radialGradient id="paint1_radial_2658_4183" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.5 11.0759) rotate(90) scale(3.18513 1.41561)">
                    <stop stop-color="#2DD4BF" />
                    <stop offset="0.509615" stop-color="#0EA5E9" />
                    <stop offset="1" stop-color="#D946EF" />
                </radialGradient>
                <clipPath id="clip0_2658_4183">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default ColLogement