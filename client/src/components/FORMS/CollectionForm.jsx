import React from 'react'

const CollectionForm = ({value,setValue,handleSubmit}) => {
  return (
    <form action="" onSubmit={handleSubmit} className='flex gap-6'>
        <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}}placeholder='Enter new collection' className='w-[400px] rounded-md px-6 py-2 border-none outline-none bg-slate-700'/>
        <button type='submit' className='bg-slate-600 px-4 rounded-md'>Submit</button>
    </form>
  )
}

export default CollectionForm