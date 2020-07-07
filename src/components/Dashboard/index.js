import React from 'react'
import '../../tailwind.generated.scss'

import NowPlaying from '../NowPlaying'
import Profile from '../Profile'

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full p-8">
      <div className="flex flex-row">
        <NowPlaying />
        <Profile />
      </div>
    </div>
  )
}

export default Dashboard