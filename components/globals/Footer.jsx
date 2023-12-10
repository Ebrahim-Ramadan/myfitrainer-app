import Link from "next/link"
import {Subscribe} from './Subscribe'
export const Footer = () => {
  return (

    <section className=" py-12 px-8 text-white z-40 bg-[#060606]">
      <div className="container mx-auto md:grid md:grid-cols-3 flex flex-col gap-8">
        <div className="flex flex-col font-bold">
        <Link href="/">
          
          <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 512 512"><path fill="#ffffff" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/></svg>
        </Link>
        <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">Your number one tracker for your wellbeing.</p>
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
