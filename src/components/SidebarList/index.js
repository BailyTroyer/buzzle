import React, { useState, useEffect } from 'react'
import '../../tailwind.generated.scss'

import ConnectionClient from '../../services/ConnectionClient'

import { useSelector } from 'react-redux';

const SidebarList = (props) => {

  const { onChange } = props

  const { auth } = useSelector((state) => state);

  const connectionClient = new ConnectionClient()
  const [people, setPeople] = useState([])

  useEffect(() => {
    const getPeople = async () => {
      const sessionData = await connectionClient.getSession()
      console.log('session data: ', sessionData)
      const session = sessionData.map(session => session.name).filter(username => username !== auth.email)
      if (session !== undefined) {
        console.log('PEOPLE: ', session)
        setPeople(session)
      }
    }
    getPeople()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="my-6">
      <h3 className="mb-6">People</h3>
      <div className="w-full">
        {people.map(person => (
          <div key={person} className="flex flex-row items-center justify-between my-2">
            <div className="flex flex-row items-center">
              <div className="md:flex md:items-center mr-1">
                <label className="md:w-2/3 block text-gray-500 font-bold">
                  <input className="mr-2 leading-tight w-4 h-4 rounded-lg" type="checkbox" onChange={(event) => onChange(event.target.checked, person)} />
                </label>
              </div>
              <img className="rounded-md w-8 h-8" src="https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640" alt="profile" />
              <p className="ml-2 text-md">{person}</p>
            </div>
            <span className="ml-6" role="img" aria-label="wave">👋</span>
          </div>
        ))}
        {people.length === 0 &&
          <p>Nobody's online yet :D</p>
        }
      </div>
    </div>
  )
}

export default SidebarList