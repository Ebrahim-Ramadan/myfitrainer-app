//import
const Entry = () => {
  return (
    <div className="flex justify-center p-8">Here implemented your fitness progress stay fucking tuned</div>
  )
}
export default Entry;
//now we made sure the user is logged in, time for passing props
export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const data = await res.json()
  return { props: { data } }
}