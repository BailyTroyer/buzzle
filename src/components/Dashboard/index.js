import React from 'react'
import '../../tailwind.generated.scss'

import NowPlaying from '../NowPlaying'
import Profile from '../Profile'
import RadioFeed from '../RadioFeed'

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full p-8 h-screen">
      <div className="flex flex-row">
        <NowPlaying />
        
      </div>
      <RadioFeed />
    </div>
  )
}

export default Dashboard