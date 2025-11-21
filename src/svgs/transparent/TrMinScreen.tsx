import React from 'react'

function TrMinScreen({ className }: { className: string }) {
    return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M19 27C19 23.229 19 21.343 20.172 20.172C21.344 19.001 23.229 19 27 19" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity="0.5" d="M7 19C10.771 19 12.657 19 13.828 20.172C14.999 21.344 15 23.229 15 27" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 15C10.771 15 12.657 15 13.828 13.828C14.999 12.656 15 10.771 15 7" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <path opacity="0.5" d="M27 15C23.229 15 21.343 15 20.172 13.828C19.001 12.656 19 10.771 19 7" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

export default TrMinScreen