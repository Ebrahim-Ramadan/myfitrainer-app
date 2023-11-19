'use client'
import { useState } from 'react';

export const Progress = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    if (email == '') {
      console.log('fuck no');
      return
    }
    console.log('Subscribed with email:', email);
    // Perform subscription logic here
    // You can pass 'email' or any other data to the subscription logic
    // e.g., onSubscribe(email);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex">
        <input
          type='email'
          
          className="pl-2 h-8 text-black font-bold rounded-lg pr-12 w-full"
          placeholder="Subscribe with your email"
          value={email}
          onChange={handleInputChange}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={handleSubscribe}
        >
          <svg
            className="h-5 w-5 text-gray-500 hover:text-gray-900"
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
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

