import React from 'react'
import '../../tailwind.generated.scss'

import ProfilePrizeCard from '../ProfilePrizeCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrophy, faWrench, faBookmark } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const Profile = () => {

  const { auth } = useSelector((state) => state);

  return (
    <div className="flex flex-col rounded-lg bg-white w-1/5 h-48 p-6">
      <div className="flex flex-row justify-between items-center w-full h-12">
        <div className="flex flex-row ">
          <img className="rounded-semiBig w-12 h-12" src="https://unsplash.com/photos/ILip77SbmOE/download?force=true&w=640" alt="profile" />
          <div className="flex flex-col ml-4">
            <p className="font-bold text-lg">{auth.name}</p>
            <p className="font-semibold text-sm text-purple-600">Infra</p>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsisV} color="#3A3A3A" size="lg" className="" />
      </div>
      <p className="mt-4 text-center font-bold text-lg text-gray-400">Software Engineer</p>
      <div className="flex flex-row justify-center mt-2">
        <ProfilePrizeCard color="tangerine" icon={<FontAwesomeIcon icon={faTrophy} color="#EBB16D" size="lg" className="" />} />
        <ProfilePrizeCard color="cherry" icon={<FontAwesomeIcon icon={faBookmark} color="#D40851" size="lg" className="" />} />
        <ProfilePrizeCard color="berry" icon={<FontAwesomeIcon icon={faWrench} color="#6633CF" size="lg" className="" />} />
      </div>
    </div>
  )
}

export default Profile