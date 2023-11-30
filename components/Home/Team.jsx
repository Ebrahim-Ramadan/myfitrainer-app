import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {OurTeam} from './OurTeam'
export const Team = () => {
    return (
      <div className='mt-12 grid grid-cols-2 md:grid-cols-5 justify-center items-center gap-4'>
        
        {OurTeam.map((member) => (
            
            <div key={member.name} className="dev-card p-2 rounded-lg font-bold text-center">
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
                  <p className='text-center mt-2 text-sm'>{member.name}</p>
                </div>
              </figure>
              <div className="w-full">
                <p className="text-gray-900 text-sm">{member.role}</p>
                <div className="justify-end card-actions w-full">
                  <Link
                    aria-label="View developer profile"
                    className="hover:text-gray-200 dark:hover:text-gray-200 w-full"
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