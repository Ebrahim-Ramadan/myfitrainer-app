export async function fetchExercises(muscles) {
  const baseUrl = 'https://api.api-ninjas.com/v1/exercises';
  const exercisesData = [];
  try {
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

      if (!response.ok) {
        throw new Error(`Failed to fetch exercises for ${muscles}`);
      }

      const data = await response.json();
      return [{ muscle: muscles, exercises: data }];
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

      if (!response.ok) {
        throw new Error(`Failed to fetch exercises for ${muscle}`);
      }

      const data = await response.json();
      exercisesData.push({ muscle, exercises: data });
    }

    return exercisesData;
  } catch (error) {
    throw new Error(`Error fetching exercises: ${error.message}`);
  }
}
