import React from 'react'
import '../../tailwind.generated.scss'

const SidebarList = (props) => {

  const { people } = props

  return (
    <div className="my-6">
      <h3 className="mb-6">People</h3>
      <div className="w-full">
          {people.map(person => (
            <div key={person} className="flex flex-row items-center justify-between my-2">
              <div className="flex flex-row items-center">
                <div className="md:flex md:items-center mr-1">
                  <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight w-4 h-4 rounded-lg" type="checkbox" />
                  </label>
                </div>

                <img className="rounded-md w-8 h-8" src="https://lh3.googleusercontent.com/a-/AOh14GgsD6WRv9uZhD1LL4eXHPCM0kSJVnCjIrD3ANJa=s96-c" alt="profile" />
                <p className="ml-2 text-md">{person}</p>
              </div>
              <span className="ml-6" role="img" aria-label="wave">👋</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SidebarList