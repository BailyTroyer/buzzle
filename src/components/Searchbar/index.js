import React, { useState } from 'react'
import '../../tailwind.generated.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Searchbar = () => {

  const [topic, setTopic] = useState('')

  return (
    <div className="border-solid border-lightGrey border rounded-lg mt-8">
      <input
        className="outline-none mx-4 my-2 w-36 text-sm"
        type="text"
        name="topic"
        onChange={(event) => setTopic(event.target.value)}
        value={topic}
        placeholder="New Buzzle"
      />
      <FontAwesomeIcon icon={faSearch} color="#353535" size="sm" className="mr-4" />
    </div>
  )
}

export default Searchbar