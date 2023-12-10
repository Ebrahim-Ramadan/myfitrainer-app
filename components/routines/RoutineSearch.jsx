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
import { BodyViewer } from './BodyViewer';
import { Box, Chip } from '@mui/joy';

export const RoutineSearch = () => {
  const [Loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);



  const handleSearch = async (Muscles) => {
    setLoading(true);
    try {
      const data = await fetchExercises(Muscles);
      setExercises(data);
    } catch (error) {
      console.error('handleSearch', error.message);
      Notify.failure(`${error.message} check your interent connection`, {
        position: 'center-top',
      });
    }
    setLoading(false);
  };




  return (
    <>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'fit-content' }}>

      <div >

        <div className='flex md:flex-row flex-col md:space-x-2 justify-center items-center'>


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
style={{alignItems:'center'}}
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
                          <Chip key={muscle.value} variant="soft" color="primary">
                            {muscle.value} 
                          </Chip>
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
                 
                <Button className='bg-blue-500 ' type="submit" variant='solid' color='primary' disabled={Loading}>
                Search
                  </Button>
        
              </Stack>
              
            </form>
            <label className='text-sm text-gray-400 font-bold flex justify-center py-2'>OR</label>

            <BodyViewer handleSearch={handleSearch} />

        </div>

      </div>
      
    </div>
     
      <div className='mt-6'>
      <hr/>
      <div className='font-bold py-2 text-sm text-bg-00 flex flex-col justify-center items-center'>
       
          <p className='text-white flex flex-row items-center md:gap-x-2'>
          <Image src={US} width={50} height={50} alt='no muscles found' loading='lazy'/>{ Loading ?
            'fetchng routines...' : 'smash it! here you go'}</p>
          <a href='/progress' className='text-white border border-2 border-slate-200 p-2 rounded-lg hover:bg-gray-600 transition-all duration-300'>see progress</a>
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
        
        
        
</div>
     
    </>

  );
};

