// pages/api/nutrition.js
import axios from 'axios';

export async function nutritionsCalc(query) {

  const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

  const response = await axios.get(apiUrl, {
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_NINGA_API_KEY,
    },
  });

  if(response.data.length > 0){
    return response.data
  }
  return false
}
