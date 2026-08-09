import React from 'react'

function Loader () {
  return (
    <div className='flex justify-center py-16'>
        <div className='w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader;