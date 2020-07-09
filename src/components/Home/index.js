import React, { useState }  from 'react'
import '../../tailwind.generated.scss';


import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { authGoogle } from '../../actions/auth'
import { setNowPlaying } from '../../actions/nowPlaying'

import Sidebar from '../Sidebar'
import Dashboard from '../Dashboard'
import Searchbar from '../Searchbar';

const Home = () => {

  const dispatch = useDispatch();

  const logout = () => { dispatch(authGoogle('', '', '', '', false)) };

  const [title, setTitle] = useState('')

  const onChangeTitle = (value) => {
    setTitle(value)
  }



  return (
    <div className="flex flex-row bg-eggshell">
      <Searchbar onChange={onChangeTitle} value={title} onClick={() => {
        console.log("CREATE NEW CALL")
        dispatch(setNowPlaying(
          'Now Chatting',
          title,
          true,
          false,
        ))
      }} />
      <Dashboard />
    </div>
  )
}

export default Home