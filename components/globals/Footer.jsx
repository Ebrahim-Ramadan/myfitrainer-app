import Image from "next/image"
import Link from "next/link"
import {Subscribe} from './Subscribe'
export const Footer = () => {
  return (

    <section className=" py-12 px-8 text-white z-40 bg-gray-950">
      <div className="container mx-auto md:grid md:grid-cols-3 flex flex-col gap-8">
        <div className="flex flex-col font-bold">
          <Image
            alt="Gym logo"
            className="mb-2"
            height="60"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD90lEQVR4nO2aa4hVVRTHt42O44OJHMnw7WCigw7pFxMZE1HESPsQyVTKoCB+EGUsfICIQUQqZEKC+klBwQcTmKBWED0cJ6KYVIxERoXyQUU26eC7+cVy/ke3t3tv59x77p05Mb8vc885e6/H2WvvvdY+41w3CQXoCzzhkgYwEHgTOARcpYMbwDtArwLrfhH4DPgDOJ6PoAUy2qcd+Fu/vwSeLtCo70zR+3WuwmpltPEVsAQYo2fTgF/0rBkoycPoScBbwH7gB+Ay0CbZN4G1wKBchVcArRJWn6HNIOBXtZkdUX4/kwucIzMngQk5OeApWidhB1Pu9/d+jwLuqt0LEWS/5I2m8ZfpARZpdGxO9s7LAU9Zo5TM0HUJ8K7mxutAlTcahyPIXeOFa4tkFW7B4JGRA3S9zXuDVxW7xhlgcEiZdepzXyNe0BXvAcA9Ke2p62bvLQZ8BAxxIQCGKYSMJa5YALel9EGsAtt1vRWoBkZHlLc7ahjGgjYgo0LX4xXbbVGXQk3eOwqpUfFYGBIvhB6+eaBB9z4GekSQZRPa+MQVG6BJyqd694YA13R/c4Z+1uZt4Bjwo/aCU+qztqhOGMA+KX/DeQCzFCb/MgxY4e0r6aj126vPN5ZLuUIBvCfl69I8e1Xx3h6sQMBKtb+nhcEcHqv9ZrVG6Jksc/HJQjlSJwUHMjxfLEdsdZupv7ZZzo2o54T0TI7NeB9gnBRczNLmA7W5pb97M7XNIiPIcNdE7RsKK5y8pDHtcguUpeRMc8JJf0zGXPU9FbVvaFTQpJ2kXhvLYANGhpf+sH9v4JL6z4vaPxTA8nQZcJp03HKv67lmrEokjbNAn1xkhMmP2lUhZlQADA8KrlwANnmjujNXOVkBvpWCl10BsKQ0ZZ4ZGzJlDnYfeB54H7hglWtYRask/GjcTki+lc/pOALUAKUa8deAXSqDo9fxVo8otCzEpsfsxGDgNxkU1DfLgN/Jzs/AFmBKlJzPFK6XgPOWycbkRDnwXTDawOf6XSMHt3gh16bDDzuEeC6S8SlKS73CqinflUX1jK1Qxk/AU8AeXc9Po7tHPvpSlY/wyl/Lm8oj9C1T/1d05BNUn5YwDlWbzbq3Kjaj/+NNBjFtKfpETcJPveQvDJbSbPRrdmChnjW4YkDHEdDpCEYHhl/WXKjPkAVXqu2VWEMpG3a2BXyo3dz2maVxHJtqNTKqXZIBdnRaJRknlj10Wm0fJ8CzcqTFJRltkkarSzK2HMuRuy7pBOu1SzrdjnQ1ukekq/F/GpE/5UuVSzLeB6Xvg28ziURnBHY6EnyfrHRJRbXJOa9erw++ZSYOHq/jjUaXZOj4pxoLsS8625ai8w+VjS4Js5IdxwAAAABJRU5ErkJggg=="
            style={{
              aspectRatio: "60/60",
              objectFit: "cover",
            }}
            width="60"
          />
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500">
            GymRat
            <br />
            <p className="text-sm">Your number one tracker for fitness and wellbeing.</p>
          </h2>
              <p>Subscribe To Our News</p>
          <Subscribe/>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm font-bold">
            <li>
              <Link className="text-white hover:text-gray-300" href="/progress">
                Progress Tracker
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="/routines">
                Workout Routines/Plans
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="/nutrition">
                Nutrition
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="/documentation">
                Documentation
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="https://github.com/Ebrahim-Ramadan/myfitrainer-app">
                Source Code
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-3">
            <Link href="#">
              <svg
                className=" text-4xl text-white hover:text-gray-300"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#">
              <svg
                className=" text-4xl text-white hover:text-gray-300"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href="#">
              <svg
                className=" text-4xl text-white hover:text-gray-300"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
 
  )
}
