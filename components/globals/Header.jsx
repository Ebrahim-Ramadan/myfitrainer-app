'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  return (
    <header className={`flex bg-black h-20 w-full items-center px-4 md:px-6 sticky top-0 ${isMobile&&'justify-between'}`}>
        <Link href="#">
          
            
        <Image
          width={55}
          height={55}
           alt="Logo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD90lEQVR4nO2aa4hVVRTHt42O44OJHMnw7WCigw7pFxMZE1HESPsQyVTKoCB+EGUsfICIQUQqZEKC+klBwQcTmKBWED0cJ6KYVIxERoXyQUU26eC7+cVy/ke3t3tv59x77p05Mb8vc885e6/H2WvvvdY+41w3CQXoCzzhkgYwEHgTOARcpYMbwDtArwLrfhH4DPgDOJ6PoAUy2qcd+Fu/vwSeLtCo70zR+3WuwmpltPEVsAQYo2fTgF/0rBkoycPoScBbwH7gB+Ay0CbZN4G1wKBchVcArRJWn6HNIOBXtZkdUX4/kwucIzMngQk5OeApWidhB1Pu9/d+jwLuqt0LEWS/5I2m8ZfpARZpdGxO9s7LAU9Zo5TM0HUJ8K7mxutAlTcahyPIXeOFa4tkFW7B4JGRA3S9zXuDVxW7xhlgcEiZdepzXyNe0BXvAcA9Ke2p62bvLQZ8BAxxIQCGKYSMJa5YALel9EGsAtt1vRWoBkZHlLc7ahjGgjYgo0LX4xXbbVGXQk3eOwqpUfFYGBIvhB6+eaBB9z4GekSQZRPa+MQVG6BJyqd694YA13R/c4Z+1uZt4Bjwo/aCU+qztqhOGMA+KX/DeQCzFCb/MgxY4e0r6aj126vPN5ZLuUIBvCfl69I8e1Xx3h6sQMBKtb+nhcEcHqv9ZrVG6Jksc/HJQjlSJwUHMjxfLEdsdZupv7ZZzo2o54T0TI7NeB9gnBRczNLmA7W5pb97M7XNIiPIcNdE7RsKK5y8pDHtcguUpeRMc8JJf0zGXPU9FbVvaFTQpJ2kXhvLYANGhpf+sH9v4JL6z4vaPxTA8nQZcJp03HKv67lmrEokjbNAn1xkhMmP2lUhZlQADA8KrlwANnmjujNXOVkBvpWCl10BsKQ0ZZ4ZGzJlDnYfeB54H7hglWtYRask/GjcTki+lc/pOALUAKUa8deAXSqDo9fxVo8otCzEpsfsxGDgNxkU1DfLgN/Jzs/AFmBKlJzPFK6XgPOWycbkRDnwXTDawOf6XSMHt3gh16bDDzuEeC6S8SlKS73CqinflUX1jK1Qxk/AU8AeXc9Po7tHPvpSlY/wyl/Lm8oj9C1T/1d05BNUn5YwDlWbzbq3Kjaj/+NNBjFtKfpETcJPveQvDJbSbPRrdmChnjW4YkDHEdDpCEYHhl/WXKjPkAVXqu2VWEMpG3a2BXyo3dz2maVxHJtqNTKqXZIBdnRaJRknlj10Wm0fJ8CzcqTFJRltkkarSzK2HMuRuy7pBOu1SzrdjnQ1ukekq/F/GpE/5UuVSzLeB6Xvg28ziURnBHY6EnyfrHRJRbXJOa9erw++ZSYOHq/jjUaXZOj4pxoLsS8625ai8w+VjS4Js5IdxwAAAABJRU5ErkJggg==" />
      </Link>
      {isMobile ? (
        <div>
          
          
          <Dropdown>
            <MenuButton color="primary">
              <span>username</span>
              
            <FontAwesomeIcon icon={faCircleChevronDown} style={{ width: '35px' }} />
      </MenuButton>
      <Menu color="primary">
              <MenuItem color="primary">
              <Link href="/">
           Home
       </Link>
        </MenuItem>
              <MenuItem color="primary">
              <Link href="/workout">
           Workout
       </Link>
        </MenuItem>
              <MenuItem color="primary">
              <Link href="/about">
           About
       </Link>
        </MenuItem>
              <MenuItem color="primary">
              <Link href="/pricing">
              Pricing
          </Link>
        </MenuItem>
              <MenuItem color="primary">
              <Link href="/contact">
              Contact
          </Link>
        </MenuItem>
              <MenuItem color="primary">
              <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app">
           Documentation
       </Link>
        </MenuItem>
      </Menu>
          </Dropdown>
          
         </div>
      ) :
        (
          <nav className="ml-auto flex space-x-5 [&>*]:text-md [&>*]:font-bold items-center navlinks [&>*]:p-2 [&>*]:rounded-lg">
          <Link href="/">
           
              Home
            
          </Link>
          <Link href="/workout">
           
              Workout
            
          </Link>
          <Link href="/about">
           
              About
            
          </Link>
          <Link href="/pricing">
           
              Pricing
            
          </Link>
          <Link href="/contact">
           
              Contact
            
          </Link>
          <Link href="/login" className='border border-2 bg-gray-500 rounded-lg px-1'>
           
              Get started
            
          </Link>
          <Link href="https://github.com/Ebrahim-Ramadan/myfitrainer-app">
           
              Documentation
            
          </Link>
        </nav> 
      )}
        
      </header>
  )
}
