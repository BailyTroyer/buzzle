import React from 'react'
import '../../tailwind.generated.scss';

import Sidebar from '../Sidebar'
import Dashboard from '../Dashboard'

const Home = () => {
  return (
    <div className="flex flex-row bg-eggshell">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default Home