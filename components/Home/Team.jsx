import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {OurTeam} from './OurTeam'
export const Team = () => {
  return (
      
      <div className='mt-12 md:w-2/3 w-full p-2 md:p-0 grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-4'>
        {OurTeam.map((member) => (
            
            <div key={member.name} className="dev-card flex md:flex-col flex-row p-2 rounded-lg font-bold items-center">
              <figure>
                <div className="h-fit flex flex-col justify-center items-center"> 
                  <div className="rounded-full border border-2 border-slate-200 overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={`/${member.img}`} 
                      alt={member.name}
                    />
                  </div>
                </div>
              </figure>
            <div className="w-full md:text-center text-start ml-2">
            <p className=' mt-2 text-base'>{member.name}</p>
                <p className="text-gray-900 text-sm">{member.role}</p>
                <div className="justify-end  ">
                  <Link
                    aria-label="View developer profile"
                    className="hover:text-gray-200 dark:hover:text-gray-200 "
                    href={member.visit}
                  >
                    Visit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };