import React from 'react'
import { Button } from './ui/button'

const NewProject:React.FC = () => {
  return (
    <form className="w-[35rem] mt-16">
    <menu className="flex items-center justify-end gap-4 my-4">
      <li>
        <Button
          className="text-stone-800 hover:text-stone-950"
        //   onClick={onCancel}
          type="button" // Ensure button does not submit the form
        >
          Cancel
        </Button>
      </li>
      <li>
        <Button
          type="submit" // Ensure button submits the form
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
        >
          Save
        </Button>
      </li>
    </menu>
    <div>
      
    </div>
  </form>
  )
}
export default NewProject