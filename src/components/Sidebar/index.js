import React from 'react'
import '../../tailwind.generated.scss'

import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authGoogle } from '../../actions/auth'

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

  const logout = () => {
    dispatch(authGoogle('', '', '', '', false));
  };

  return (
    <div className="flex flex-col bg-white h-screen align-center items-center px-8 justify-between">
      <div className="flex flex-col flex-1">
        <Searchbar />
        <SidebarList people={people} />
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