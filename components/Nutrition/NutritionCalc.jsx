'use client'
import React from 'react';
import { nutritionsCalc } from '@/lib/ningaAPI/nutritionsCalc.js';
import {NutritionsResponse} from './NutritionsResponse'
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Image from 'next/image';
import alienEats from '@/assets/alien-eating.webp'

const NutritionCalc = () => {
  const [meal, setMeal] = React.useState('');
  const [loading, setloading] = React.useState('');
  const [nutritionsData, setnutritionsData] = React.useState([]);

  const getNutritionInfo = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setloading(true)
    if (meal.trim() === '') {
      Notify.info('your meal is empty! you should revalidate it', {
        position: 'right-bottom',
      });
      setloading(false)
      return;
    }

    try {
      const nutritions = await nutritionsCalc(meal);
      console.log('Front-end nutritions', nutritions);
      if (nutritions.length !== 0) {
        setnutritionsData(nutritions)
      }
      else {
        Notify.info('no nutritions found in our base, try a different prompt', {
          position: 'right-bottom',
        });
      }
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      // Handle error or display error message to the user
    }
    setloading(false)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <form onSubmit={getNutritionInfo} className="w-full max-w-2xl bg-gray-800 shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Calculate Your Food Nutritions</h1>
        <div className="grid w-full max-w-sm gap-4 mx-auto">
          <div className="grid gap-1.5">
            <label className="text-gray-300 font-bold" htmlFor="food-quantity">
              What was your meal?
            </label>

            <div className='grid grid-cols-7'>
              <Input
                className="bg-gray-700 text-white col-span-5"
                id="food-quantity"
                placeholder="Enter A Meal"
                type="text"
                required
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
              />
              <Button
                className='bg-blue-500 col-span-2'
                type='submit'
                variant='solid'
                color='primary'
                disabled={loading}
              >
                {loading?'on it...':'Search'}
                
              </Button>
            </div>
            <label className="text-gray-400 font-medium">(e.g: 1lb brisket and fries)</label>
          </div>
          {nutritionsData.length !== 0 &&
            nutritionsData.map((nutritionData) => (
              <NutritionsResponse key={nutritionData.name} nutritionsResponse={nutritionData} />
            ))
            
          }
          <hr/>
          <div className="flex justify-center flex-col items-center gap-y-2"> <Image src={alienEats} width={200} height={200} alt='alien-eating' loading='lazy' className='rounded-lg shadow-lg'/>
          <a target='_blank' className='text-center underline text-xs md:text-sm hover:text-blue-600 text-blue-500 font-medium' href='https://api-ninjas.com/api/nutrition'>See ningasAPI documentation for more references</a>
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default NutritionCalc;
