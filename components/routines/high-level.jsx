import WarpComponent from './ExploreRoutines';
import {RoutineSearch} from './RoutineSearch';
const Entry = () => {
  // const data = await getData()
  return (
    <div className="h-fit min-h-screen bg-black mb-12 flex flex-col  p-4 md:p-8 w-full">
    <label className='text-white text-xl m-2 flex justify-center font-bold'>Add a muscle routine</label>

      <RoutineSearch />
      {/* <WarpComponent  /> */}
    </div>
  )
}
export default Entry;
//now we made sure the user is logged in, time for passing props
// async function getData() {
//   const res = await fetch('https://api.example.com/...', { next: { tags: ['progress'] } })
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }