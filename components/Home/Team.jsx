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
          className="dev-card flex md:flex-col flex-row p-2 rounded-lg font-bold items-center transition duration-300 ease-in-out "
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
      <a href='https://github.com/Ebrahim-Ramadan/myfitrainer-app' className='cursor-pointer hover:bg-slate-200 mb-12 flex flex-row bg-slate-100 [&>*]:h-12 w-full md:w-1/2 p-2 justify-center rounded-full'>
      <Image
          width={50}
          height={50} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACx0lEQVR4nO2ZPWhUQRDHf+bUC37EUwQ5sRArEQQRPbASBSuxuNQWdhZWET+iCCoGLBRiUgiCpV/oGbEQ7AUrQYydH+BniKhBxHg5RZ8szMHw8M7dfbvvLN4fprid3dn539udnZ2FAgUKhEAfUAOGgQYwCcwALZEZabslfWoypueoAiPAGyBxlNcy1tjIHcuBMaDp4XhammKrkpfzg8CHAI6nZVpsR0NJ/qkkslyQuYKiH5jIwflEZELmDIKSRI8kZ7kLzA9BII9lk3SQ0azOD/bQ+QT4DdR9nV8GTPWYQCLRyYRtZ4z/B84nImYZO6Ea6JDqJAeBxcApy/5N1xN7xMGZIWARcMay/08V5wcc5jE+WaFP8hRbZ3RSdsdizJzqX3Yg8Mo2Aaw5GNXOGKy02Pi+BBJgiw2BYxkIGOyS8BeDwBEbAo2MBJB8JgaBmzYEngYg0C8XmNAEJm0IfPIksADYrH5v7BCKsxD4aEOg5UnAOPMcWKLahgITmItNwLRdVG3zgHsBCXy3IfA5IwEje1T7avn0IQi8j7mJtTPmyrlK6epKZ0LsjpibuBGAgJH7soTauKx074AVHgSu2BAYDkTAyAGlN5v7WSqmlx0JHI6ZSpQ7bLoNKds/lH6/I4FNoZM5mw35WHRtnFC6WQfnXxIhnbZNjc8p26b/A8d/PgFOxrrQHJL1fbpLn1/ATmV/LfDFwflZyXR7Wo14K5Gnjb0OY8/jgYEIl/rbqTmuWYyZkgKDd1mlW27vI/uU/co/AoaZezcZ0S2395GvwDplf7vskUz34G4oRaiLPkyVDc/+pc/1kI8g5QgkdFhcCDxSuhuh6qLpLzEacE+YM2Sbsr8e+CblmajPT3Up94Ug8QJYqmyvISdUAj4xXaKHqMont82d0rnNcZ8TNgbMmt0KHJXHkCdys2vJV5qWtquSepgLf4ECBciOP6PDOjC4WuCNAAAAAElFTkSuQmCC"
          alt='nextjs' />
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="100" viewBox="0 0 48 48">
<linearGradient id="iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1" x1="21.861" x2="25.703" y1="8.237" y2="36.552" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00c1e0"></stop><stop offset="1" stop-color="#009bb8"></stop></linearGradient><path fill="url(#iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1)" d="M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322,2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z"></path>
</svg>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="100" viewBox="0 0 48 48">
<path fill="#ff8f00" d="M8,37L23.234,8.436c0.321-0.602,1.189-0.591,1.494,0.02L30,19L8,37z"></path><path fill="#ffa000" d="M8,36.992l5.546-34.199c0.145-0.895,1.347-1.089,1.767-0.285L26,22.992L8,36.992z"></path><path fill="#ff6f00" d="M8.008 36.986L8.208 36.829 25.737 22.488 20.793 13.012z"></path><path fill="#ffc400" d="M8,37l26.666-25.713c0.559-0.539,1.492-0.221,1.606,0.547L40,37l-15,8.743 c-0.609,0.342-1.352,0.342-1.961,0L8,37z"></path>
        </svg>
        <Image
          width={50}
        height={50}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABlElEQVR4nO2YPyhFYRiHH4QoSUpKGZRFKYPFgLLgDmzMrEyYWbkjGyszo0UZDCiLUv6VMkgpScLVvffVre8sN+fec+4953yv+p56plOn59eZzgsOh8PhwyiQNo7wz0gDUuQ6/4TUH/GehWeqaQCuSwy4AxpRzEqJeM9llNIBvAUY8A50opCdAPGe2yhjAMiGGJADBlHEcYh4zxOgBgXMVhDvOWM7vgl4qGLAI9Bsc8BaFfGeq7biu4CPCAZ8At02BuxFEC/G3aTjh4B8hAPywHBS8bXAWYTxYrww746d+RjixTgXd3wL8BTjgGegNc4BGzHGS9w/Pj3AdwIDMkBvHAMOEogX437U8WMJxotxPKr4OuDSwoAroD6KAYsW4sW4UG18G/BiccAr0F7NgC2L8WLcrDS+D/hRMCAL9Fcy4FBBvBiPwsZPK4iWIqfCXNduFARLkfdBr3pLCmLFx0JbWW4VhIqPhbtrWb4UhEqJ/+eynCsIFR9PgwyYNKc/UWYOmCAgKfMlMgrCM6YlcLzD4XA4CMovgtVZZPbHff8AAAAASUVORK5CYII=" alt='vercel'/>
      </a>
    </>
  );
};
