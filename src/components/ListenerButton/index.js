import React from 'react'
import '../../tailwind.generated.scss'

const ListenerButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-bluee rounded-semiBig w-16 h-16 my-6 transition duration-500 ease-in-out transform hover:scale-95 cursor-pointer"
    >
      <span className="text-2xl -mb-2" role="img" aria-label="silent">😶</span>
      <p className="text-sm font-extrabold m-0 text-white mb-2">Listen</p>
    </button>
  )
}

export default ListenerButton