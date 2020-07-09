import React, { useState } from 'react'
import '../../tailwind.generated.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';
import { nowPlaying } from '../../actions/nowPlaying';

const Searchbar = ({ onChange, value, onClick }) => {

  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center align-center border-solid border-lightGrey border rounded-lg mt-8">
      <input
        className="outline-none mx-4 my-2 text-sm"
        type="text"
        name="topic"
        onChange={(event) => onChange(event.target.value)}
        value={value}
        placeholder="New Buzzle"
      />
      <FontAwesomeIcon icon={faPlus} color="#353535" size="sm" className="mr-4" onClick={onClick} />
    </div>
  )
}

export default Searchbar