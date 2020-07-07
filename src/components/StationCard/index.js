import React from 'react'
import '../../tailwind.generated.scss'

import ListenerButton from '../ListenerButton'

const StationCard = ({ image, user, title, listeners }) => {

  return (
    <div className="flex flex-row w-full my-2 bg-white rounded-semiBig justify-between h-24 align-center items-center">
      <div className="flex flex-row align-center">
        <div className="flex flex-row">
          <img src={image} alt="profile" className="rounded-l-lg w-24 h-24" />
          <div className="h-full w-1 bg-red-500" />
        </div>

        <div className="flex flex-col align-center justify-center ml-4">
          <p className="font-bold text-xl">{title}</p>
          <p className="text-sm">{user}</p>
        </div>
      </div>

      <div className="flex flex-row align-center items-center px-4">
        <div className="flex flex-row align-center items-center">
          <div className="flex justify-center items-center bg-white rounded-full w-12 h-12 z-20">
            <img src={image} alt="profile" className="rounded-full w-10 h-10" />
          </div>
          <div className="flex justify-center items-center bg-white -mx-4 rounded-full w-12 h-12 z-10">
            <img src={image} alt="profile" className="rounded-full w-10 h-10" />
          </div>
          <div className="flex justify-center items-center bg-white rounded-full w-12 h-12">
            <img src={image} alt="profile" className="rounded-full w-10 h-10" />
          </div>

          <p className="font-semibold w-48 ml-2 text-sm">Joe and 3 matest are listening</p>
        </div>
        <div className="flex items-center justify-center bg-aqua text-white w-20 h-8 rounded-lg ml-4">
          <p className="font-bold text-md">LISTEN</p>
        </div>
        <div className="flex items-center justify-center bg-money text-white w-20 h-8 rounded-lg mx-4">
          <p className="font-bold text-md">JOIN</p>
        </div>
        <ListenerButton listenerCount={listeners} />
      </div>

    </div>
  )
}

export default StationCard