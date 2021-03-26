import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearResponse } from '../../redux/reducers/userSettings'

const ServerResponse = () => {
  const dispatch = useDispatch()
  const { response } = useSelector((s) => s.userSettings)
  return (
    <div>
      {
        response?.text && (
          // eslint-disable-next-line
          <div
            onClick={() => dispatch(clearResponse())}
            className="fixed flex self-center top-3 absolute bg-gray-700 shadow-md rounded px-8 py-6 my-4 w-max select-none animate-emersion"
          >
            {response.text}
          </div>
        )
      }
    </div>
  )
}

export default ServerResponse
