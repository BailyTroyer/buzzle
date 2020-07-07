import React from 'react'
import '../../tailwind.generated.scss'

const ProfilePrizeCard = (props) => {

  const { icon, color } = props;

  return (
    <div className={`flex justify-center items-center h-12 w-12 rounded-full bg-opacity-50 bg-${color} mx-1`}>
      {icon}
    </div>
  )
}

export default ProfilePrizeCard