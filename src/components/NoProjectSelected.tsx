import React from 'react'
import Image from "../assets/Noimage.png"
import { Button } from './ui/button'

const NoProjectSelected : React.FC = () => {
  return (
    <div className=" mt-44 text-center w-2/3">
        <img src={Image} alt="Img" className=' w-16 h-16 object-contain mx-auto'/>
        <h2 className='text-xl font-bold text-stone-500 my-4'>No Project Selected</h2>
        <p className='text-stone-400 mb-4'>Select a project or start with a new one</p>
        <Button>Create New Project</Button>
    </div>
  )
}
export default NoProjectSelected