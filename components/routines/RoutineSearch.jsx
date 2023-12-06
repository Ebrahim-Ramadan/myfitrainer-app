'use client'
import { useState, useEffect, Suspense } from 'react';
import { fetchExercises } from '@/lib/ningaAPI/getAllRoutines';
import { RoutinesMap } from './RoutinesMap';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import muscleOptions from './muscleOptions';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import US from '@/assets/US.jpeg'
import Image from 'next/image';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Reload } from '@/components/globals/Reload';


export const RoutineSearch = () => {
  const [multipleLoading, setmultipleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [empty, setempty] = useState(false);

  const [OneMuscle, setOneMuscle] = useState('');


  const handleSearch = async (Muscles) => {
    setmultipleLoading(true);
    try {
      const data = await fetchExercises(Muscles);
      setExercises(data);
    } catch (error) {
      console.error('handleSearch', error.message);
      Notify.failure(`${error.message} check your interent connection`, {
        position: 'center-top',
      });
    }
    setmultipleLoading(false);
  };


  const delayedSearch =  async() => {
    if (OneMuscle) {
      try {
        setLoading(true);
        if (OneMuscle.trim() === '') {
          Notify.info('muscle can not be empty', {
            position: 'center-top',
          });
        setLoading(false);
          return
        }
        else {
          const data = await fetchExercises(OneMuscle.trim());
          if (data) {
        setExercises(data);
          }
          else {
            setempty(true)
            setExercises(null)
          }
        }
      } catch (error) {
        console.error(error);
        Notify.failure(`${error.message} check your interent connection`, {
          position: 'center-top',
        });
      } finally {
        setLoading(false);
      }
    }
  }


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      delayedSearch()
    }, 200)

    return () => clearTimeout(delayDebounceFn)
  }, [OneMuscle])
  return (
    <>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'fit-content' }}>

      <div >

        <div className='flex md:flex-row flex-col md:space-x-2 justify-center'>


            <form
              
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const selectedMuscles = JSON.parse(formJson.muscles);
                  handleSearch(selectedMuscles)
      }}
    >
              <Stack spacing={1} alignItems="flex-start"
                direction="row"
                justifyContent="center"
              >
                
                <Select
                      placeholder="Select a muscle..."
                      name="muscles"
                      required
                  multiple
                  sx={{ maxWidth: 200, width:200 }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>Select a muscle...</span>;
                    }
                    return (
                      <div className='flex flex-row gap-1 text-xs flex-wrap'>
                        {selected.map((muscle) => (
                          <span key={muscle.value} className='bg-gray-200 rounded-lg px-1'>
                            {muscle.value} {` `}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                  >
                      {Array.isArray(muscleOptions) &&
              muscleOptions.map((muscleOption) => (
                <Option key={muscleOption.value} value={muscleOption.value}>
                  {muscleOption.label}
                </Option>
              ))}
                  </Select>
                 
                <Button className='bg-blue-500 ' type="submit" variant='solid' color='primary' disabled={multipleLoading}>
                Search
                  </Button>
        
              </Stack>
              
            </form>
            <label className='text-sm text-gray-400 font-bold flex justify-center py-2'>OR</label>

            <form >
          <Input
            autoComplete='on'
            placeholder='search for a muscle...' required type='text'
            value={OneMuscle}
            onChange={(e) => setOneMuscle(e.target.value)}
          />
          
            </form>

        </div>

      </div>
      
    </div>
     
      <div className='mt-6'>
      <hr/>
      <div className='font-bold py-2 text-sm text-bg-00 flex flex-col justify-center items-center'>
       
          <p className='text-white flex flex-row items-center md:gap-x-2'>
          <Image src={US} width={50} height={50} alt='no muscles found' loading='lazy'/>{loading || multipleLoading ?
            'fetchng routines...' : 'smash it! here you go'}</p>
          <a href='/progress' className='border border-2 border-slate-200 p-2 rounded-lg hover:bg-gray-600 transition-all duration-300'>see progress</a>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-2'>
      
      {exercises && (
            exercises.map((exercise) => (
    <Suspense fallback={<Reload/>} key={exercise.muscle} >
                <RoutinesMap data={exercise} />
    </Suspense>
                
      ))
          )}
        </div>
        {empty &&!exercises &&
                 <div className='flex flex-col items-center space-y-2 justify-center space-x-2 mt-8'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="28" width="30" viewBox="0 0 576 512"><path d="M80 160c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zM0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176z" /></svg>
               <p className='text-xs text-gray-200'>Maybe A muscle typo? please try again</p>
               </div>
        }
        
        
</div>
     
    </>

  );
};

