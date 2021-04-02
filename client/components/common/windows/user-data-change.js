import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { openWindow, setPopUpActive } from '../../../redux/reducers/secondary'
import { changeData } from '../../../redux/reducers/userSettings'

const UserDataChange = ({ email, password }) => {
  const dispatch = useDispatch()
  const [newData, setNewData] = useState('')
  const [data, setData] = useState('')

  const onClick = (e) => {
    if (e.target.id === 'save-btn') {
      dispatch(changeData(data, {
        type: email || password,
        data: newData
      }))
    }
    dispatch(openWindow(false))
    dispatch(setPopUpActive(false))
  }

  const inputType = () => {
    if (password) {
      return 'password'
    }
    return 'text'
  }

  return (
    <div className="flex flex-col p-4 justify-center">
      <div className="flex justify-center font-semibold text-lg mb-2">{`Update your ${email || password}`}</div>
      <div className="flex my-2">
        <div className="mr-2">{`New ${email || password}:`}</div>
        <input
          type={inputType()}
          className="flex-grow border rounded-sm bg-gray-800 pl-2"
          placeholder={`Enter new ${email || password}...`}
          onChange={(e) => setNewData(e.target.value)}
          value={newData}
        />
      </div>
      <div className="flex my-2">
        <div className="mr-2">Current password:</div>
        <input
          type="password"
          className="flex-grow border rounded-sm bg-gray-800 pl-2"
          placeholder="Enter current password..."
          onChange={(e) => setData(e.target.value)}
          value={data}
        />
      </div>
      <div className="flex justify-center items-center mt-2">
        <button id="cancel-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Cancel</button>
        <button id="save-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Save</button>
      </div>
    </div>
  )
}

export default UserDataChange
