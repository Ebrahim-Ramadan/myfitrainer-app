import React from 'react'

export const NutritionsResponse = ({nutritionsResponse}) => {
  return (
    <>
      
     <div className="bg-gray-700 shadow-md rounded-md p-4 mt-4">
        <h2 className="text-lg font-bold mb-2 text-white">{nutritionsResponse.name} Nutritional Information</h2>
        <div className="grid gap-1.5">
        {Object.entries(nutritionsResponse).map(([key, value]) => (
          <p key={key} className="text-md text-gray-400 font-bold">
            {key.replace(/_/g, ' ')}: <span className="font-medium">{value}</span>
        </p>
        ))}
    </div>
      
    </div >
    </>

    
  )
}
