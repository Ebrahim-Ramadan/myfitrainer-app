'use client'
import React from 'react'
import Model from "react-body-highlighter";

export const BodyViewer = () => {
    const data = [
        { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
        { name: 'Push Ups', muscles: ['chest'] },
      ];
      
      const handleClick = React.useCallback(({ muscle, data }) => {    
        console.log(muscle);
    
      }, [data]);
  return (
      <div className='flex md:flex-row  flex-col p-4 [&>*]:text-blue-200'>
          <Model data={data} style={{ width: '20rem', padding: '2rem' }}
          highlightedColors={["#e65a5a", "#db2f2f"]}/>
          <Model
              type="posterior"
      data={data}
              style={{ width: '20rem', padding: '2rem' }}
              highlightedColors={['#0984e3', '#74b9ff']}
      onClick={handleClick}
      />
    </div>
  )
}
