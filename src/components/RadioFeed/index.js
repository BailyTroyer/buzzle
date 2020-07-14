import React, { useEffect, useState } from 'react'
import '../../tailwind.generated.scss'

import StationCard from '../StationCard'
import { useSelector } from 'react-redux'

import ConnectionClient from '../../services/ConnectionClient'

const RadioFeed = () => {

  const connectionClient = new ConnectionClient()

  const { rooms } = useSelector((state) => state);

  const [roomsData, setRoomsData] = useState(rooms.rooms)

  useEffect(() => {
    // console.log("SETTING THIS: ", rooms.rooms)
    // setRoomsData(rooms.rooms)
    const getRoomData = async () => {
      const roomData = await connectionClient.getRooms()
      console.log("ROOM DAT RADIO FEED: ", roomData)
      setRoomsData(roomData)
    }
    getRoomData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="flex flex-col w-full max-h-full mt-8 overflow-y-scroll">
      {rooms.rooms.map(room => <StationCard image={'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640'} user={room.host} title={room.room} listeners={room.listeners.length} participants={room.participants.length} /> )}
      {rooms.length === 0 &&
        <p className="flex flex-col justify-center text-center text-xl font-bold mt-32">No rooms yet :(</p>
      }
    </div>
  )
}

export default RadioFeed
