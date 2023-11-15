import React from 'react'

export const Progress = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-2">
        <div className="relative">
          <svg
            className=" absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input className="pl-8 w-full" id="input" placeholder="Enter text" />
        </div>
      </div>
      <div className="col-span-1 space-y-2">
        <select placeholder="Choose one…" className='w-full'>
  <option>...</option>
  <option>...</option>
  <option>...</option>
  <option>...</option>
  <option>...</option>
</select>
      </div>
    </div>
  )
}
