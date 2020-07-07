import React from 'react'
import '../../tailwind.generated.scss'

import NowPlaying from '../NowPlaying'

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full p-8">
      <NowPlaying />
    </div>
  )
}

export default Dashboard