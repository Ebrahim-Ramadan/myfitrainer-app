'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OurTeam } from './OurTeam'; // Assuming this imports the array of team members

export const Team = () => {
  return (
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
  );
};
