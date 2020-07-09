import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const NewRouter = () => {
  let history = useHistory();

  useEffect(() => {

    history.push(`/l/${Array(16).fill('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~').map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div />
  )
}

export default NewRouter