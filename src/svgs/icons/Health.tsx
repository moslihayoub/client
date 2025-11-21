import React from 'react'

function Health({ className }: { className: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3271_15898)">
                <path d="M1.5 10.5C1.5 7.67175 1.5 6.25725 2.379 5.379C3.258 4.50075 4.67175 4.5 7.5 4.5H10.5C13.3282 4.5 14.7427 4.5 15.621 5.379C16.4992 6.258 16.5 7.67175 16.5 10.5C16.5 13.3282 16.5 14.7427 15.621 15.621C14.742 16.4992 13.3282 16.5 10.5 16.5H7.5C4.67175 16.5 3.25725 16.5 2.379 15.621C1.50075 14.742 1.5 13.3282 1.5 10.5Z" stroke="#94A3B8" stroke-width="1.5" />
                <path d="M12 4.5C12 3.0855 12 2.379 11.5605 1.9395C11.121 1.5 10.4145 1.5 9 1.5C7.5855 1.5 6.879 1.5 6.4395 1.9395C6 2.379 6 3.0855 6 4.5" stroke="#94A3B8" stroke-width="1.5" />
                <path d="M12 10.5H6M9 7.5V13.5" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_3271_15898">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default Health