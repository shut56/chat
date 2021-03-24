import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlackScreen from './black-screen'
import { openWindow } from '../../redux/reducers/secondary'
import { setNewChannelName, setNewChannelDescription } from '../../redux/reducers/settings'
import { addChannel } from '../../redux/reducers/channels'

const ChannelCreator = () => {
  const dispatch = useDispatch()
  const [privateChannel, setPrivateChannel] = useState(false)
  const { newChannelName, newChannelDescription } = useSelector((s) => s.settings)

  const onClick = (e) => {
    if (e.target.id === 'create-btn') {
      dispatch(addChannel(newChannelName, newChannelDescription, privateChannel))
    }
    dispatch(setNewChannelName())
    dispatch(setNewChannelDescription())
    dispatch(openWindow(false))
  }

  return (
    <div>
      <BlackScreen />
      <div className="fixed flex items-center justify-center text-white w-full h-screen z-10">
        <div className="flex flex-col w-96 h-auto rounded-md bg-gray-800 z-20">
          <div className="flex flex-col p-4 justify-center">
            <div className="flex justify-center font-semibold text-lg mb-2">Create new channel</div>
            <div className="flex my-2">
              <div className="mr-2">Name:</div>
              <input type="text" className="flex-grow border rounded-sm bg-gray-800 pl-2" placeholder="new-channel" onChange={(e) => dispatch(setNewChannelName(e.target.value))} value={newChannelName} />
            </div>
            <div className="flex my-2">
              <div className="mr-2">Description:</div>
              <input type="text" className="flex-grow border rounded-sm bg-gray-800 pl-2" placeholder="Some words about the channel..." onChange={(e) => dispatch(setNewChannelDescription(e.target.value))} value={newChannelDescription} />
            </div>
            <div className="flex my-2">
              <div className="mr-2">Private channel:</div>
              <div className="focus:outline-none relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="private-toggle"
                  className="focus:outline-none toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  checked={privateChannel}
                  onChange={() => {
                    setPrivateChannel(!privateChannel)
                    console.log('privateChannel', privateChannel)
                  }}
                />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">&#8194;</label>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <button id="cancel-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Cancel</button>
              <button id="create-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelCreator
