'use client'
import { useState } from 'react';

export const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault(); 
    console.log('Subscribed with VALID email:', email);
  };

  return (
    <div className="relative w-full max-w-xs">
      <form className="flex" onSubmit={handleSubscribe}>
        <input
          type='email'
          required
          className={`pl-2 h-8 text-black font-bold rounded-lg pr-12 w-full ${isFocused ? 'focus' : ''}`}
          placeholder="Subscribe with your email"
          value={email}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          role='submit'
          className="absolute p-2 inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={`${isFocused ? 'subscribe-focused' : ''} svg-subscribe `}>
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};
