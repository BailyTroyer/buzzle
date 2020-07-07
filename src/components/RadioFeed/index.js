import React from 'react'
import '../../tailwind.generated.scss'

import StationCard from '../StationCard'

const stations = [
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  },
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  },
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  },
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  },
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  },
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  },
  {
    image: 'https://unsplash.com/photos/u3WmDyKGsrY/download?force=true&w=640',
    user: 'Zach Wieand',
    title: 'How to k8s',
    listeners: 5,
  }
]

const RadioFeed = () => {
  return (
    <div className="flex flex-col w-full max-h-full mt-8 overflow-y-scroll">
      {stations.map(({image, user, title, listeners}) => <StationCard image={image} user={user} title={title} listeners={listeners} /> )}
    </div>
  )
}

export default RadioFeed