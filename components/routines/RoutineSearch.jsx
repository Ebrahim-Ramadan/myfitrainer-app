'use client'
import { useState, useEffect } from 'react';
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
export const RoutineSearch = () => {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);

  const [OneMuscle, setOneMuscle] = useState('');


  const handleSearch = async (Muscles) => {
    setLoading(true);
    try {
      const data = await fetchExercises(Muscles);
      console.log('data', data);
      setExercises(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };


  const delayedSearch =  async() => {
    if (OneMuscle) {
      try {
        setLoading(true);
        const data = await fetchExercises(OneMuscle.trim());
        console.log('handleSingleMuscleSearch', data);
        setExercises(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(OneMuscle)
      delayedSearch()
    }, 200)

    return () => clearTimeout(delayDebounceFn)
  }, [OneMuscle])
  return (
    <>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'fit-content' }}>

      <div >

        <div className='flex md:flex-row flex-col md:space-x-2 justify-center'>
          <form >
          <Input
            autoComplete='on'
            placeholder='start searching...' required type='text'
            value={OneMuscle}
            onChange={(e) => setOneMuscle(e.target.value)}
          />
          
            </form>
            <label className='text-sm text-gray-400 font-bold flex justify-center py-2'>OR</label>

            <form
              
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const selectedMuscles = JSON.parse(formJson.muscles);
        console.log('selectedMuscles', selectedMuscles);
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
                      classname='w-full block flex-grow'
                  multiple
                  sx={{ maxWidth: 200, width:200 }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>Select a muscle...</span>;
                    }
                    return (
                      <div>
                        {selected.map((muscle) => (
                          <span key={muscle.value}>
                            {muscle.value},
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
                 
        <Button className='bg-blue-500' type="submit" variant='solid' color='primary' sx={{zindex: -11111}}>Search</Button>
        
              </Stack>
              
            </form>
            

        </div>

      </div>
      
    </div>
     
      <div className='mt-6'>
      <hr/>
      <div className='py-2 md:space-x-2 text-sm text-bg-00 flex flex-row justify-center items-center'>
        <Image src={US} width={50} height={50} alt='no muscles found' />
          <p className='font-bold'>{loading ?
          'fetchng routines...':'smash it! here you go'}</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-2'>
      
      {exercises ? (
      exercises.map((exercise) => (
        <RoutinesMap data={exercise} key={exercise.muscle} />
      ))
    ) : (
      <p>No Data returned, Maybe A typo in the muscle name?</p>
      )}
      </div>
</div>
     
    </>

  );
};

