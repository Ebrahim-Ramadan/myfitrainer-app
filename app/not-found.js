import { Button } from '@mui/joy'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

 const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg [&>*]:text-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Oops!</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">404</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 flex flex-col gap-y-2">
          We can not find the page you are looking for.
          <Button
          color='primary'
          variant="outlined"
        >
         Go Home
        </Button>
      </p>
     
    </div>
  </div>
  )
}
export default NotFound