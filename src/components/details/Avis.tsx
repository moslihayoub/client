import { Star } from 'lucide-react';
import React from 'react'
import Like from '../../svgs/icons/Like';
import Dislike from '../../svgs/icons/Dislike';

export interface AvisProps {
    name: string;
    userImg: string;
    rating: number;
    comment: string;
    date: string;
    like: number;
    dislike: number;
}

function Avis({ name, userImg, rating, comment, date, like, dislike }: AvisProps) {
    return (
        <div className='flex flex-col gap-[18px] items-start justify-center w-full'>
            <div className='flex flex-col gap-[12px] justify-start items-start'>
            <div className='flex flex-row items-center justify-center gap-[12px]'>
                <img src={userImg} alt={name} className='w-[40px] h-[40px] rounded-full' />
                <div className='flex flex-col'>
                    <p className='text-[16px] text-slate-600 font-medium font-bricolagegrotesque'>{name}</p>
                    <p className='text-[14px] text-slate-800 font-bold font-bricolagegrotesque'>{date}</p>
                </div>
            </div>
            <div className='flex flex-row gap-[8px]'>
                <p className='text-sm text-bold text-slate-800 font-bricolagegrotesque'>{rating}</p>
                <div className='flex flex-row gap-[4px]'>
                    {Array.from({ length: Math.trunc(rating) }).map((_, index) => (
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0742 7.68594L13.5508 10.7609L14.6062 15.3391C14.7204 15.8284 14.5306 16.3385 14.1242 16.634C13.7179 16.9296 13.1741 16.9531 12.7437 16.6938L8.75078 14.2719L4.76641 16.6938C4.33607 16.9531 3.79227 16.9296 3.38593 16.634C2.9796 16.3385 2.78972 15.8284 2.90391 15.3391L3.95781 10.7656L0.433594 7.68594C0.052482 7.35724 -0.0943371 6.83205 0.0610719 6.35337C0.216481 5.87469 0.643804 5.53589 1.14531 5.49375L5.79063 5.09141L7.60391 0.766406C7.79753 0.30236 8.25108 0.000155807 8.75391 0.000155807C9.25673 0.000155807 9.71028 0.30236 9.90391 0.766406L11.7227 5.09141L16.3664 5.49375C16.8679 5.53589 17.2952 5.87469 17.4506 6.35337C17.6061 6.83205 17.4592 7.35724 17.0781 7.68594H17.0742Z" fill="#FACC15" />
                        </svg>
                    ))}
                    {Array.from({ length: 5 - Math.trunc(rating) }).map((_, index) => (
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0742 7.68594L13.5508 10.7609L14.6062 15.3391C14.7204 15.8284 14.5306 16.3385 14.1242 16.634C13.7179 16.9296 13.1741 16.9531 12.7437 16.6938L8.75078 14.2719L4.76641 16.6938C4.33607 16.9531 3.79227 16.9296 3.38593 16.634C2.9796 16.3385 2.78972 15.8284 2.90391 15.3391L3.95781 10.7656L0.433594 7.68594C0.052482 7.35724 -0.0943371 6.83205 0.0610719 6.35337C0.216481 5.87469 0.643804 5.53589 1.14531 5.49375L5.79063 5.09141L7.60391 0.766406C7.79753 0.30236 8.25108 0.000155807 8.75391 0.000155807C9.25673 0.000155807 9.71028 0.30236 9.90391 0.766406L11.7227 5.09141L16.3664 5.49375C16.8679 5.53589 17.2952 5.87469 17.4506 6.35337C17.6061 6.83205 17.4592 7.35724 17.0781 7.68594H17.0742Z" fill="#CBD5E1" />
                        </svg>
                    ))}
                </div>
            </div>
            </div>
            <div className='flex items-start gap-2 w-[80%]'>
                <p className='text-[16px] text-slate-800 font-bricolagegrotesque text-start'>{comment}</p>
            </div>

            <div className='flex flex-row gap-[26px]'>
                <div className='flex flex-row gap-[8px]'>
                    <Like />
                    <p className='text-[16px] text-sky-500 font-bricolagegrotesque'>{like}</p>
                </div>
                <div className='flex flex-row gap-[8px]'>
                    <Dislike />
                    <p className='text-[16px] text-red-500 font-bricolagegrotesque'>{dislike}</p>
                </div>
            </div>
        </div>
    )
}

export default Avis