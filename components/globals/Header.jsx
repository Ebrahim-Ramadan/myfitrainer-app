'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faUserPlus, faBuildingShield, faFolderOpen,faCodeBranch, faListCheck , faStopwatch20, faEnvelope, faCarrot } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import secureLocalStorage from "react-secure-storage";
import { getUserByAccessToken } from '@/lib/auth/getUserByAccessToken'
import { signoutfunc } from '@/lib/auth/signout'
import Avatar from '@mui/material/Avatar';
import { lightBlue, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { Reload } from './Reload';
import { Notify } from 'notiflix';
import gh from '@/assets/gh.svg';

export const Header = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const isMobile = useMediaQuery({ maxWidth: 767 });

  React.useEffect(() => {
    const storedUserName = secureLocalStorage.getItem("username");
    const IsloggedIn = secureLocalStorage.getItem("loggedIn");

    if (storedUserName && IsloggedIn) {
      setLoggedIn(true);

      const fetchUser = async () => {
        setLoading(true);
        try {
          const getUser = await getUserByAccessToken(storedUserName);
          if (getUser) {
            setLoggedIn(true);
            setUsername(getUser.username);
          }
          else {
            await signoutfunc();
            setLoggedIn(false)
          }
        } catch (error) {
          console.log('getUserByAccessToken error', error);
        }
        setLoading(false);
      };

      fetchUser();
    }
  }, []);

  const handleSignOut = async () => {
    await signoutfunc();
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
    Notify.info('signed out', {
      position: 'center-top',
    })
  };

  return (
    <header className={`backdrop-blur-2xl backdrop-grayscale flex h-16 w-full items-center px-4 md:px-6 sticky top-0 z-40 ${isMobile && 'justify-between'}`}>
      {loading &&
      <Reload/>}
        <Link href="/">
          
        <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 512 512"><path fill="#ffffff" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/></svg>
      </Link>
      {isMobile ? (
        <div>
          
          
          <Dropdown>
            {loggedIn ?
              
              
              <MenuButton color="primary" className='space-x-1'>
              <Avatar sx={{ bgcolor: lightBlue[400] }}>
              {username.substring(0, [1])}
      </Avatar>
                <span>{
                  (username.substring(0, username.indexOf('@')))}</span>
              
            <FontAwesomeIcon icon={faCircleChevronDown} style={{ width: '35px' }} />
                </MenuButton>
              
              :
              <div className='flex flex-row gap-x-2'>
               <Link href="/signup" className='font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900'>
           
           Get started
         
           </Link>
           <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app" target='_blank' className='gh flex flex-row items-center gap-x-2 p-0'>
           <Image src={gh} width={30} height={30} alt='gh' loading='lazy'/>
                </Link>
              </div>
            }
            
            <Menu color="primary" className='ASS'>
            <MenuItem color="primary">
                <Link href="/progress">
              <FontAwesomeIcon icon={faListCheck} />
                Progress
          </Link>
              </MenuItem>
              <MenuItem color="primary">
                <Link href="/routines">
              <FontAwesomeIcon icon={faStopwatch20} />
                Routines
       </Link>
        </MenuItem>
              

              <MenuItem color="primary">
                <Link href="/nutrition">
              <FontAwesomeIcon icon={faCarrot} />

                
                Nutritions
          </Link>
              </MenuItem>
 
              <hr />

              <MenuItem color="primary">
                <Link href="/documentation">
                <FontAwesomeIcon icon={faFolderOpen} />

                Documentation
       </Link>
        </MenuItem>


        <MenuItem color="primary">
                <Link href="/contact">
              <FontAwesomeIcon icon={faEnvelope} />
                  
              Contact
          </Link>
              </MenuItem>


              <MenuItem color="primary">
                <Link href="/privacy-and-policy">
                <FontAwesomeIcon icon={faBuildingShield} />

                Privacy and Policy
       </Link>
        </MenuItem>


             
              <hr />
              <MenuItem color="primary">
                <Link href="/login">
                <FontAwesomeIcon icon={faUserPlus} />

                Add Account
       </Link>
              </MenuItem>
              <MenuItem color="success">
                <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app" target='_blank' className='gh flex flex-row items-center gap-x-2 p-0'>
                <FontAwesomeIcon icon={faCodeBranch} />
                  Source Code
       </Link>
              </MenuItem>
              <button onClick={handleSignOut} color="danger" className='logout text-white  bg-red-700 hover:bg-red-600 rounded-lg'>
                      log out
                      </button>

      </Menu>
          </Dropdown>
          
         </div>
      ) :
        (
          <nav className="ml-auto flex space-x-2 [&>*]:text-md [&>*]:font-bold items-center navlinks [&>*]:p-1 [&>*]:rounded-lg">
          
          <Link href="/routines" className='flex flex-row items-center gap-x-2'>
           
               Routines
               <FontAwesomeIcon icon={faStopwatch20} />
            
            </Link>
            
          <Link href="/nutrition" className='flex flex-row items-center gap-x-2'>
           
              Nutritions
              <FontAwesomeIcon icon={faCarrot} />
            
          </Link>
          
          
          
            {loggedIn ?
              <>
              
                <Link href="/progress" className='flex flex-row items-center gap-x-2'>
                <Avatar sx={{ bgcolor: lightBlue[700] }}>
                  {username.substring(0, [2])}
                  
                  </Avatar>
                  
          My Progress
          
          </Link>
                <Dropdown >
                      <MenuButton color="primary" className='hover:bg-white'>
                    {username}
            <FontAwesomeIcon icon={faCircleChevronDown} style={{ width: '35px' }} />
                    
                      </MenuButton>
                  <Menu color="primary" className='ASS'>
                    <MenuItem color="primary">
                      <Link href="/documentation">
                    <FontAwesomeIcon icon={faFolderOpen} />
                Documentation
       </Link>
        </MenuItem>
                    <MenuItem color="primary">
                      <Link href="/contact">
                    <FontAwesomeIcon icon={faEnvelope} />
                        
                Contact
       </Link>
        </MenuItem>
                    <MenuItem color="primary">
                      <Link href="/privacy-and-policy">
                    <FontAwesomeIcon icon={faBuildingShield} />
                        
                privacy and policy
       </Link>
        </MenuItem>
                    <MenuItem color="warning">
                      <Link href="/login">
                  <FontAwesomeIcon icon={faUserPlus} />
                        
                Add Account
       </Link>
        </MenuItem>
                    <button onClick={handleSignOut} color="danger" className='text-white logout bg-red-700 hover:bg-red-600 rounded-lg'>
                      log out
                      </button>
                    
                      </Menu>
                      {/* <ReAuthModal Username={username} /> */}

                </Dropdown>
                <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app" target='_blank' className='gh flex flex-row items-center gap-x-2'>
                  <Image src={gh} width={30} height={30} alt='gh' loading='lazy'/>
       </Link>
              </>
              :
              <>
                
              <Link href="/signup" className='text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 rounded-lg px-1 duration-900'>
           
              Get started
            
                </Link>
                <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app" target='_blank' className='gh flex flex-row items-center gap-x-2'>
                  <Image src={gh} width={30} height={30} alt='gh' loading='lazy'/>
       </Link></>
       

            }
          
        </nav> 
      )}
        
      </header>
  )
}