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
import { deepOrange } from '@mui/material/colors';
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
    <header className={`backdrop-blur-xl backdrop-grayscale backdrop-blur-md flex h-16 w-full items-center px-4 md:px-6 sticky top-0 z-40 ${isMobile && 'justify-between'}`}>
      {loading &&
      <Reload/>}
        <Link href="/">
          
            
        <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="2em" viewBox="0 0 512 512"><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z" /></svg>
        
      </Link>
      {isMobile ? (
        <div>
          
          
          <Dropdown>
            {loggedIn ?
              
              
              <MenuButton color="primary" className='space-x-2'>
              <Avatar sx={{ bgcolor: deepOrange[600] }}>
              {username.substring(0, [2])}
      </Avatar>
                <span>{
                  username.length < 10? (username.substring(0, username.indexOf('@'))):
                  (username.substring(0, 11))+'...'}</span>
              
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
            
            <Menu color="primary">
            <MenuItem color="primary">
              <FontAwesomeIcon icon={faListCheck} />
                <Link href="/progress">
                
                Progress
          </Link>
              </MenuItem>
              <MenuItem color="primary">
              <FontAwesomeIcon icon={faStopwatch20} />
                <Link href="/routines">
                Routines
       </Link>
        </MenuItem>
              

              <MenuItem color="primary">
              <FontAwesomeIcon icon={faCarrot} />
                <Link href="/nutrition">
                
                Nutritions
          </Link>
              </MenuItem>
 
              <hr />

              <MenuItem color="primary">
                    <FontAwesomeIcon icon={faFolderOpen} />
                <Link href="/documentation">
                Documentation
       </Link>
        </MenuItem>


        <MenuItem color="primary">
              <FontAwesomeIcon icon={faEnvelope} />
              <Link href="/contact">
              Contact
          </Link>
              </MenuItem>


              <MenuItem color="primary">
                    <FontAwesomeIcon icon={faBuildingShield} />
                <Link href="/privacy-and-policy">
                Privacy and Policy
       </Link>
        </MenuItem>

              <hr/>

             
              <hr />
              <MenuItem color="primary">
              <FontAwesomeIcon icon={faUserPlus} /> <Link href="/login">
                Add Account
       </Link>
              </MenuItem>
              <MenuItem color="success">
                <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app" target='_blank' className='gh flex flex-row items-center gap-x-2 p-0'>
                <FontAwesomeIcon icon={faCodeBranch} />
                  Source Code
       </Link>
              </MenuItem>
              <MenuItem color="danger">
              <button onClick={handleSignOut}>log out</button>
        </MenuItem>

      </Menu>
          </Dropdown>
          
         </div>
      ) :
        (
          <nav className="ml-auto flex space-x-5 [&>*]:text-md [&>*]:font-bold items-center navlinks [&>*]:p-2 [&>*]:rounded-lg">
          
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
                <Avatar sx={{ bgcolor: deepOrange[600] }}>
                  {username.substring(0, [2])}
                  
                  </Avatar>
                  
          My Progress
          
          </Link>
                <Dropdown style={{margin:'0'}}>
                      <MenuButton color="primary" className='hover:bg-white'>
                    {username}
            <FontAwesomeIcon icon={faCircleChevronDown} style={{ width: '35px' }} />
                    
                      </MenuButton>
                  <Menu color="primary">
                    <MenuItem color="primary">
                    <FontAwesomeIcon icon={faFolderOpen} />
                <Link href="/documentation">
                Documentation
       </Link>
        </MenuItem>
                    <MenuItem color="primary">
                    <FontAwesomeIcon icon={faEnvelope} />
                <Link href="/contact">
                Contact
       </Link>
        </MenuItem>
                    <MenuItem color="primary">
                    <FontAwesomeIcon icon={faBuildingShield} />
                <Link href="/privacy-and-policy">
                privacy and policy
       </Link>
        </MenuItem>
                    <MenuItem color="warning">
                  <FontAwesomeIcon icon={faUserPlus} />
                <Link href="/login">
                Add Account
       </Link>
        </MenuItem>
                    <MenuItem onClick={handleSignOut} color="danger">
                      log out
                      </MenuItem>
                    
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
