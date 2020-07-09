import React from 'react'
import './index.scss'
import '../../tailwind.generated.scss'
import { ReactComponent as Buzzle } from '../../assets/buzzle.svg'

import TextInputPill from '../TextInputPill'
import Google from '../Google'

const Login = () => {
  return (
    <div className="min-h-screen bg-milk grid items-center justify-center">
      <div className="flex flex-col px-8 py-4 bg-white rounded-lg shadow-md w-full">
        <Buzzle className="self-center h-20 w-40 mb-4" />
        <div className="mt-4">
          <TextInputPill label="Email" type="email" name="email" />
          <TextInputPill label="Password" type="password" name="password" />
          <button type="submit" className="flex justify-center items-center rounded-md border-none my-4 bg-dark h-10 w-full">
            <span className="font-semibold text-sm text-white">LOGIN</span>
          </button>
          <p className="font-thin text-md text-gray-600 italic or-text">or</p>
          <div className="flex justify-center mt-4">
            <Google />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login