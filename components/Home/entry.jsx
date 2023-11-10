import React from 'react'
 const Entry = () => {
    return (
      <div className='[&>*]:text-center space-y-4'>
    <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Fitness & Gym Trainer
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">Get Fit, Stay Healthy, Be Happy</p>
            </div>
            <div className=" text-lg font-bold text-center">
              <button className='bg-gray-700 rounded-lg p-2 hover:bg-gray-400 transition-all duration-800'>Start Training</button>
            </div>
          </div >
  )
}

export default Entry