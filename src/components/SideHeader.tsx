import React from 'react'
import ColLeftArrow from '../svgs/colored/ColLeftArrow';

interface HeaderProps {
    Title: React.ComponentType;
    onClose: () => void;
}

function SideHeader({ Title, onClose }: HeaderProps) {
    return (
        <>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 w-full">
                <div className="flex items-center gap-2">
                    <Title />
                </div>
                <button
                    className="w-8 h-8 flex items-center justify-center"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    <ColLeftArrow />
                </button>
            </div>
        </>
    )
}

export default SideHeader