'use client'
import React, {Suspense} from 'react';
import { nutritionsCalc } from '@/lib/ningaAPI/nutritionsCalc.js';
import {NutritionsResponse} from './NutritionsResponse'
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Image from 'next/image';
import alienEats from '@/assets/alien-eating.webp'
import { Reload } from '@/components/globals/Reload';


const NutritionCalc = () => {
  const [meal, setMeal] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [nutritionsData, setnutritionsData] = React.useState([]);

  const getNutritionInfo = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setloading(true)
    if (meal.trim() === '') {
      Notify.info('your meal is empty! you should revalidate it', {
        position: 'center-top',
      });
      setloading(false)
      return;
    }

    try {
      const nutritions = await nutritionsCalc(meal);
      if (nutritions && nutritions.length !== 0) {
        setnutritionsData(nutritions)
      }
      else {
        Notify.info('no nutritions found in our base, try a different prompt', {
          position: 'right-bottom',
        });
      }
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      setnutritionsData(null)
      Notify.info(error.message, {
        position: 'right-bottom',
      });
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
    <Suspense fallback={<Reload/>} key={nutritionData.name} >

                <NutritionsResponse nutritionsResponse={nutritionData} />
    </Suspense>
                
            ))
            
          }
          
          
        </div>
      </form>

      <a target='_blank' className="mt-8 flex justify-center flex-row items-center gap-x-2 text-center underline text-xs md:text-sm hover:text-blue-600 text-blue-500 font-medium" href='https://api-ninjas.com/api/nutrition'> <Image priority src={alienEats} width={40} height={40} alt='alien-eating' className='rounded-full shadow-lg' />
          <p className='text-sm md:text-md'>See ningasAPI documentation</p>
          </a>
    </div>
  );
};

export default NutritionCalc;
