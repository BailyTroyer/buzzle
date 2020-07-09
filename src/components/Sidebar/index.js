import React, { useState } from 'react'
import '../../tailwind.generated.scss'

import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { authGoogle } from '../../actions/auth'
import { setNowPlaying } from '../../actions/nowPlaying'

import Searchbar from '../Searchbar'
import SidebarList from '../SidebarList'

const people = [
  'Baily Troyer',
  'Wes Csendom',
  'Darin Chambers',
  'Eric Wastl',
  'Grant Wrazen',
  'Zach Wieand',
  'Darren Matthew',
  'Jordan Hoeber'
]

const Sidebar = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { auth, nowPlaying } = useSelector((state) => state);

  const logout = () => { dispatch(authGoogle('', '', '', '', false)) };

  const [title, setTitle] = useState('')

  const onChangeTitle = (value) => {
    setTitle(value)
  }

  const onChangeUsers = (value, toggle) => {}

  //   if (nowPlaying.active) {
  //     // if active add user to call? 
  //   } else {
  //     // not active 
  //     console.log("SETTING NOW PLAYING: ", toggle)
  //     dispatch(setNowPlaying(
  //       'Now Chatting',
  //       title,
  //       true,
  //       false,
  //     ))
  //     setTitle('')
  //   }
  // }

  const [room, setRoom] = useState('')

  return (
    <div className="flex flex-col bg-white h-screen align-center items-center px-8 justify-between w-1/6">
      <div className="flex flex-col flex-1">
        <Searchbar onChange={onChangeTitle} value={title} onClick={() => {
          console.log("CREATE NEW CALL")
          dispatch(setNowPlaying(
            'Now Chatting',
            title,
            true,
            false,
          ))
        }} />
        <SidebarList onChange={onChangeUsers} />
      </div>
      <button
        type="submit"
        className="flex justify-center items-center rounded-lg border-none mb-12 bg-pinkie h-12 w-32"
        onClick={() => {
          logout()
          history.push("/login")
        }}
      >
        <span className="font-semibold text-sm text-white">Log Out</span>
      </button>
    </div>
  )
}

export default Sidebar


// <input
// className="outline-none mx-4 my-2 text-sm"
// type="text"
// name="room"
// onChange={(event) => setRoom(event.target.value)}
// value={room}
// placeholder="New Room"
// />
// <button type="submit" onClick={() => {
// dispatch(setNowPlaying(
//   room,
//   `started by ${auth.name}`,
//   true,
//   false
// ))
// setRoom('')
// // do the new room logic
// }}><p>New Room</p></button>