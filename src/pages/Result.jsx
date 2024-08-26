import React from 'react'
import BackButton from '../components/BackButton'

const Result = () => {
  return (
    <>
    <BackButton/>
    <div className='bg-gray-800 w-[300px] h-[200px] p-4 rounded-lg m-auto mt-36 flex flex-col items-center justify-center'>
      <h1 className='text-xl font-bold text-white'>
        Not Available
      </h1>
      <p className='text-gray-400 mt-12 text-end'>Contact us for more information.</p>

    </div>
    </>
  )
}

export default Result