'use client'
import { useState, useEffect } from 'react';
import { fetchExercises } from '@/lib/ningaAPI/getAllRoutines';
import { Reload } from '../globals/Reload';
import { RoutinesMap } from './RoutinesMap';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import muscleOptions from './muscleOptions';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

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
        const data = await fetchExercises(OneMuscle);
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
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [OneMuscle])
  return (
    <>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'fit-content' }}>
      <div >
        {loading && <Reload />}

        <div className='flex md:flex-row flex-col items-start md:space-x-6 space-y-6 justify-center'>
          <form className='md:mt-2'>
                    <label className='font-bold'>Add a muscle routine</label>
          <Input
            autoComplete='on'
            placeholder='start typing' required type='text'
            value={OneMuscle}
            sx={{zindex: -11111}}
            onChange={(e) => setOneMuscle(e.target.value)}
          />
          <label className='text-sm text-gray-400 font-bold'>try searching a single muscle</label>
            </form>
              
        <form
          className='flex justify-center w-full'
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
              classname='flex flex-row'
              >
                      <label className='items-center font-bold flex gap-x-2'>
                          <kbd className='rounded-lg text-sm bg-gray-500 px-2'>OR</kbd>
                      <lable className='text-bg'>search by all muscles</lable>    
                      </label>
                  <Select
                      placeholder="Select a pet…"
          name="muscles"
                      required
                      classname='w-full block flex-grow'
                      multiple
                sx={{ width: 260, zindex: -11111 }}
                  >
                      {Array.isArray(muscleOptions) &&
              muscleOptions.map((muscleOption) => (
                <Option key={muscleOption.value} value={muscleOption.value}>
                  {muscleOption.label}
                </Option>
              ))}
                  </Select>
                  <label className='text-sm text-gray-400 font-bold'>select a muscle or two</label>
        <Button type="submit" variant='outlined' sx={{zindex: -11111}}>Search</Button>
      </Stack>
              </form>

        </div>

      </div>
      
    </div>
      {/* Displaying exercises */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:mt-4 mt-2'>
      {exercises ? (
      exercises.map((exercise) => (
        <RoutinesMap data={exercise} key={exercise.muscle} />
      ))
    ) : (
      <p>No Data returned, Maybe A typo in the muscle name?</p>
      )}
      </div>
     
    </>

  );
};

