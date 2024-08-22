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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna, faPersonDress, faFire, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';

const NutritionCalc = () => {
  const [meal, setMeal] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [empty, setempty] = React.useState(false);
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
      console.log('nutritions', nutritions);
      if (Array.isArray(nutritions)&&nutritions.length > 0) {
        setempty(false)
        setnutritionsData(nutritions)

        //calc the summations values
        nutritions.forEach((nutrition) => {
          // Protein_Sum += nutrition['protein_g'];
          fats_Sum += nutrition['fat_total_g'];
          // calories_Sum += nutrition['calories'];
        });
        
      }
      else {
        setempty(true)
        Notify.info('no nutritions found in our base, try a different prompt', {
          position: 'center-top',
        });
      }
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      
      setempty(true)
      Notify.info(error.message, {
        position: 'center-top',
      });
    }
    setloading(false)
  };
  const calculateSums = () => {
    let Protein_Sum = 0;
    let fats_Sum = 0;
    let calories_Sum = 0;
    let cholesterol_mg = 0;
  
    nutritionsData.forEach((nutrition) => {
      Protein_Sum += nutrition['protein_g'] || 0;
      fats_Sum += nutrition['fat_total_g'] || 0;
      calories_Sum += nutrition['calories'] || 0;
      cholesterol_mg += nutrition['cholesterol_mg'] || 0;
    });
  
    // Round the sums to two decimal places
    // Protein_Sum = parseFloat(Protein_Sum.toFixed(2));
    fats_Sum = parseFloat(fats_Sum.toFixed(2));
    // calories_Sum = parseFloat(calories_Sum.toFixed(2));
    cholesterol_mg = parseFloat(cholesterol_mg.toFixed(2));
  
    return {  fats_Sum,  cholesterol_mg };
  };
  
  let { fats_Sum,  cholesterol_mg} = calculateSums();
  
  return (
    <div className="min-h-screen flex flex-col items-center   bg-[#080808] p-4">
      <form onSubmit={getNutritionInfo} className="w-full max-w-2xl shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Calculate Your Food Nutritions</h1>
        <div className="grid w-full max-w-sm gap-4 mx-auto">
          <div className="grid gap-1">
            <label className="text-gray-300 font-bold" htmlFor="food-quantity">
              What was your meal?
            </label>

            <div className='grid grid-cols-7 gap-x-2'>
              <Input
                className="bg-gray-900 text-white col-span-5"
                id="food-quantity"
                placeholder="(e.g: 1lb brisket and fries)"
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
                {loading?'...':'Calculate'}
                
              </Button>
            </div>
            <p className='text-xs text-gray-400'>The default amount set to
            <kbd className='font-bold underline ml-1'>100g</kbd>
              , and kindly try to separate each meal with &apos;
              <kbd className='font-bold underline'>and</kbd>
              &apos; instead of comma</p>
            <a target='_blank' className="flex justify-center flex-row items-center gap-x-2 text-center mt-2 underline text-xs md:text-sm hover:text-blue-600 text-blue-500 font-medium" href='https://api-ninjas.com/api/nutrition'> <Image priority src={alienEats} width={40} height={40} alt='alien-eating' className='rounded-full shadow-lg' />
          <p className='text-sm md:text-md'>See ningasAPI documentation</p>
          </a>
          </div>
          </div>
      </form>
         
      {!empty && nutritionsData.length > 0 && (
        <>
          <p className='font-bold text-lg text-yellow-400 text-center '>TOTAL
            <div className='mt-2 md:text-base text-sm [&>*]:flex [&>*]:flex-row [&>*]:gap-x-1 [&>*]:items-center grid grid-cols-2 md:grid-cols-4   gap-2 hover:[&>*]:bg-yellow-900 
            [&>*]:transition [&>*]:duration-200
            [&>*]:bg-yellow-950 [&>*]:px-2 [&>*]:rounded-lg'>
              <p>
           <FontAwesomeIcon icon={faFire} />
                Calories: ?
              </p>
              <p>
                <FontAwesomeIcon icon={faPersonDress} />
                Fats: {fats_Sum} 
            </p>
            <p>
         <FontAwesomeIcon icon={faDna} />
                Protein: ?
              </p>
            <p>
            <FontAwesomeIcon icon={faHeartCircleCheck} />
           Cholesterol: {cholesterol_mg}
              </p>
</div>
          </p>
                  
          <div className='flex gap-2 flex-col md:flex-row w-full'>
            {nutritionsData.map((nutritionData, idx) => (
              <Suspense fallback={<Reload />} key={idx}>
                <NutritionsResponse nutritionsResponse={nutritionData} />
              </Suspense>
            ))}
          </div>
        </>
      )}

      {empty && (
        <div className='mt-4 flex flex-col items-center space-y-2 justify-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="28" width="30" viewBox="0 0 576 512">
            <path d="M80 160c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zM0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176z" />
          </svg>
          <p className='text-xs text-gray-200'>Maybe a muscle typo? Please try again.</p>
        </div>
      )}

    </div>
  );
};

export default NutritionCalc;