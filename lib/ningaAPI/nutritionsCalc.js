// pages/api/nutrition.js
import axios from 'axios';

export async function nutritionsCalc(query) {

  const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_NINGA_API_KEY,
      },
    });

    console.log('nutritionsCalc response', response);
    return response.data
  } catch (error) {
    return error
  }
}
