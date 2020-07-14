import React, { useState, useEffect } from 'react'
import '../../tailwind.generated.scss'

import ListenerButton from '../ListenerButton'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setNowPlaying } from '../../actions/nowPlaying'

import ConnectionClient from '../../services/ConnectionClient'

const randomColors = ['blueberry', 'pinkie', 'bluee', 'tangerine', 'cherry', 'berry', 'money', 'aqua']

const StationCard = ({ image, user, title, listeners, participants }) => {

  const connectionClient = new ConnectionClient()
  const [username, setUserName] = useState('')


  useEffect(() => {
    const getUserName = async (socketId) => {
      const sessionData = await connectionClient.getSession()
      const roomData = await connectionClient.getRooms()
      // console.log("ROOM DAT: ", roomData)
      // console.log('session data: ', sessionData)
      const session = sessionData.find(session => session.socketId === socketId)
      if (session !== undefined) {
        // console.log('session: ', session.name)
        setUserName(session.name)
      }
    }
    getUserName(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { nowPlaying } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row w-full my-2 bg-white rounded-semiBig justify-between h-24 align-center items-center cursor-pointer">
      <div className="flex flex-row align-center">
        <div className="flex flex-row">
          <img src={image} alt="profile" className="rounded-l-lg w-24 h-24" />
          <div className={`h-full w-1 bg-${randomColors[Math.floor(Math.random() * randomColors.length)]}`} />
        </div>

        <div className="flex flex-col align-center justify-center ml-4">
          <p className="font-bold text-xl">{title}</p>
          <p className="text-sm">{username}</p>
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

          <div className="flex flex-col">
            <p className="font-semibold w-48 ml-2 text-sm">{`${participants} Participating`}</p>
            <p className="font-semibold w-48 ml-2 text-sm">{`${listeners} Listening`}</p>
          </div>
        </div>

        {(nowPlaying.description === title && nowPlaying.listen) &&
          <button
            type="button"
            onClick={() => {
              console.log("JOIN")
              dispatch(setNowPlaying('Now Playing', title, true, false))
            }}
            className="flex items-center justify-center bg-money text-white w-20 h-8 rounded-lg mx-4 transition duration-500 ease-in-out transform hover:scale-95 cursor-pointer"
          >
            <p className="font-bold text-md">JOIN</p>
          </button>
        }

        {(nowPlaying.description === title && !nowPlaying.listen) &&
          <button
            type="submit"
            className="flex items-center justify-center bg-cherry text-white w-20 h-8 rounded-lg mx-4 transition duration-500 ease-in-out transform hover:scale-95 cursor-pointer"
            onClick={() => {
              
              console.log("LEAVING")
              dispatch(setNowPlaying('Waiting', '...', false, false))
            }}
          >
            <p className="font-bold text-md">LEAVE</p>
          </button>
        }

        {(nowPlaying.description !== title) &&
          <div className="flex flex-row align-center items-center">
            <button
              type="button"
              onClick={() => {
                console.log("JOIN")
                dispatch(setNowPlaying('Now Playing', title, true, false))
              }}
              className="flex items-center justify-center bg-money text-white w-20 h-8 rounded-lg mx-4 transition duration-500 ease-in-out transform hover:scale-95 cursor-pointer"
            >
              <p className="font-bold text-md">JOIN</p>
            </button>

            <ListenerButton onClick={() => {
              console.log("LISTEN")
              dispatch(setNowPlaying('Now Playing', title, true, true))
            }} />
          </div>
        }
      </div>

    </div>
  )
}

export default StationCard
