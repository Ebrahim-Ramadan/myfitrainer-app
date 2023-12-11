'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OurTeam } from './OurTeam'; // Assuming this imports the array of team members

export const Team = () => {
  return (
    <>
      <div className='mb-12 md:w-fit w-full p-2 md:p-0 grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-4'>
      {OurTeam.map((member) => (
        <a
          href={member.visit}
          key={member.name}
          target='_blank'
          className="dev-card flex md:flex-col flex-row p-2 rounded-lg font-bold items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          {/* Image Section */}
          <figure>
            <div className="h-fit flex flex-col justify-center items-center">
              <div className="rounded-full border border-2 border-indigo-300 overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src={`/${member.img}`}
                  alt={member.name}
                />
              </div>
            </div>
          </figure>

          {/* Member Information Section */}
          <div className="w-full md:text-center text-start px-2">
            <p className='mt-2 text-base'>{member.name}</p>
            <p className="text-gray-300 text-sm">{member.role}</p>
            <Link
              target='_blank'
              aria-label="View developer profile"
              className="hover:text-gray-400 text-gray-200 text-sm"
              href={member.visit}
            >
              Visit
            </Link>
          </div>
        </a>
      ))}
      
      
    </div>
    <div className='w-full flex flex-row items-center justify-center gap-2'>
    <div className='w-[40px] h-[40px]'>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<linearGradient id="NRNx2IPDe7PJlJvrxOKgWa_MWiBjkuHeMVq_gr1" x1="24" x2="24" y1="43.734" y2="4.266" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0a070a"></stop><stop offset=".465" stop-color="#2b2b2b"></stop><stop offset="1" stop-color="#4b4b4b"></stop></linearGradient><circle cx="24" cy="24" r="19.734" fill="url(#NRNx2IPDe7PJlJvrxOKgWa_MWiBjkuHeMVq_gr1)"></circle><rect width="3.023" height="15.996" x="15.992" y="16.027" fill="#fff"></rect><linearGradient id="NRNx2IPDe7PJlJvrxOKgWb_MWiBjkuHeMVq_gr2" x1="30.512" x2="30.512" y1="33.021" y2="18.431" gradientUnits="userSpaceOnUse"><stop offset=".377" stop-color="#fff" stop-opacity="0"></stop><stop offset=".666" stop-color="#fff" stop-opacity=".3"></stop><stop offset=".988" stop-color="#fff"></stop></linearGradient><rect width="2.953" height="14.59" x="29.035" y="15.957" fill="url(#NRNx2IPDe7PJlJvrxOKgWb_MWiBjkuHeMVq_gr2)"></rect><linearGradient id="NRNx2IPDe7PJlJvrxOKgWc_MWiBjkuHeMVq_gr3" x1="22.102" x2="36.661" y1="21.443" y2="40.529" gradientUnits="userSpaceOnUse"><stop offset=".296" stop-color="#fff"></stop><stop offset=".521" stop-color="#fff" stop-opacity=".5"></stop><stop offset=".838" stop-color="#fff" stop-opacity="0"></stop></linearGradient><polygon fill="url(#NRNx2IPDe7PJlJvrxOKgWc_MWiBjkuHeMVq_gr3)" points="36.781,38.094 34.168,39.09 15.992,16.027 19.508,16.027"></polygon>
</svg>
      </div>
    <div className='w-[40px] h-[40px]'>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<linearGradient id="iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1" x1="21.861" x2="25.703" y1="8.237" y2="36.552" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00c1e0"></stop><stop offset="1" stop-color="#009bb8"></stop></linearGradient><path fill="url(#iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1)" d="M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322,2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z"></path>
</svg>
      </div>
    <div className='w-[40px] h-[40px]'>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#ffa000" d="M25.01,8.565c-0.386-0.753-1.466-0.755-1.848,0l-2.347,4.426L15.404,2.547 c-0.471-0.874-1.798-0.653-1.952,0.325L8.003,37.997L30.25,18.75L25.01,8.565z"></path><path fill="#f57f17" d="M25.795 22.604L20.815 12.992 8.003 37.997z"></path><path fill="#ffca28" d="M35.859,11.838c-0.13-0.802-1.115-1.12-1.69-0.544L8.003,38.002l14.479,7.614 c0.917,0.512,2.034,0.512,2.951,0.001L40,38.005L35.859,11.838z"></path>
</svg>
      </div>
    <div className='w-[40px] h-[40px]'>
    <svg width="40" height="40" fill='white' xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 70 256 100"><path d="m128 0 128 221.705H0z"/></svg>
      </div>
            
      </div>
    </>
  );
};
