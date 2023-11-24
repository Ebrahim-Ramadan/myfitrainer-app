import secureLocalStorage from "react-secure-storage";

export const Progress = async() => {
  const data = await getData()
  console.log('data', data);
  return (
    <div className="relative w-full max-w-md">
      your progress
    </div>
  );
};


async function getData() { 
  const storedUserName = secureLocalStorage.getItem("username");
  const IsloggedIn = secureLocalStorage.getItem("loggedIn");
  if (IsloggedIn) {
    const res = await fetchActivityDocuments(storedUserName)
    console.log('progress getData res', res);
  }
  else {
    console.log('not logged in');
  }
}