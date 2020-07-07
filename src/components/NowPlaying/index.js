import React, { useState, useEffect } from 'react'
import '../../tailwind.generated.scss'

import { ReactMic } from 'react-mic'

const NowPlaying = () => {

  const [recording, setRecording] = useState(false)

  function onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  useEffect(() => {
    setRecording(false)
    return () => {
      setRecording(false)
    }
  }, [])
 

  return (
    <div className="flex flex-row rounded-lg bg-darkCard w-4/5 h-48 text-white p-6 justify-between mr-8">
      <div>      
        <h1 className="font-bold text-2xl">Now Playing</h1>
        <h4 className="font-semibold text-sm">Morning Brew w/ Darin Chambers</h4>
        <audio className="mx-0 my-6" controls />
      </div>
      <ReactMic
        record={recording}
        className="w-3/5 h-full mr-8"
        onData={onData}
        strokeColor="#FFF"
        backgroundColor="#282932"
      />
    </div>
  )
}

export default NowPlaying