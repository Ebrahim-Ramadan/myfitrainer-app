export async function fetchExercises(muscles) {
  const baseUrl = 'https://api.api-ninjas.com/v1/exercises';
  const exercisesData = [];
  if (typeof muscles === 'string') {
    const queryParams = new URLSearchParams({
      muscle: muscles || '',
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_NINGA_API_KEY,
      },
    });

    const data = await response.json();
    if (data.length > 0) {
      return [{ muscle: muscles, exercises: data }];
    }
    return false
  }

  for (const muscle of muscles) {
    const queryParams = new URLSearchParams({
      muscle: muscle || '',
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_NINGA_API_KEY,
      },
    });


    const data = await response.json();
    if (data.length > 0) {
      exercisesData.push({ muscle, exercises: data });
    }
    else {
      return false
    }
    
  }

  return exercisesData;
}
