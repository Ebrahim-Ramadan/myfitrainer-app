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

        <div className='flex md:flex-row flex-col md:space-x-2 justify-center'>
          <form >
          <Input
            autoComplete='on'
            placeholder='start searching...' required type='text'
            value={OneMuscle}
            sx={{zindex: -11111}}
            onChange={(e) => setOneMuscle(e.target.value)}
          />
          
            </form>
            <label className='text-sm text-gray-400 font-bold flex justify-center py-2'>OR</label>
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
                direction="column"
                justifyContent="center"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div>
                <Select
                      placeholder="Select a muscle..."
                      name="muscles"
                      required
                      classname='w-full block flex-grow'
                  multiple
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
                sx={{ width: 260, zindex: -11111 }}
                  >
                      {Array.isArray(muscleOptions) &&
              muscleOptions.map((muscleOption) => (
                <Option key={muscleOption.value} value={muscleOption.value}>
                  {muscleOption.label}
                </Option>
              ))}
                  </Select>
                  <label className='text-sm text-gray-400 font-bold'>select a muscle or more</label>
                  </div>
        <Button className='bg-blue-500' type="submit" variant='solid' color='primary' sx={{zindex: -11111}}>Search</Button>
      </Stack>
              </form>

        </div>

      </div>
      
    </div>
     
      <div className='mt-8'>
      <hr/>
      <div className='py-2 md:space-x-2 text-sm text-bg-00 flex flex-row justify-center items-center'>
        <Image src={US} width={50} height={50} alt='no muscles found' />
        <p className=''>sub gymbro</p>
      </div>
      <div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 md:mt-4 mt-2'>
      
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

