import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createChannel } from '../../redux/reducers/secondary'
import { setNewChannelName, saveChannel } from '../../redux/reducers/settings'
import { addNewChannel } from '../../redux/reducers/channels'

const ChannelCreator = () => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')
  const newChannelName = useSelector((s) => s.settings.newChannelName)

  const onClick = (e) => {
    if (e.target.id === 'create-btn') {
      dispatch(saveChannel(newChannelName))
      dispatch(addNewChannel({ description }))
    }
    dispatch(setNewChannelName())
    dispatch(createChannel(false))
  }

  return (
    <div className="fixed flex items-center justify-center text-white w-full h-screen z-10">
      <div className="flex flex-col w-96 h-auto rounded-md bg-gray-800 z-20">
        <div className="flex flex-col p-4 justify-center">
          <div className="flex justify-center">Create new channel</div>
          <div className="flex my-4">
            <div className="mr-2">Name:</div>
            <input type="text" className="flex-grow border rounded-sm bg-gray-800 pl-2" placeholder="new-channel" onChange={(e) => dispatch(setNewChannelName(e.target.value))} value={newChannelName} />
          </div>
          <div className="flex my-4">
            <div className="mr-2">Description:</div>
            <input type="text" className="flex-grow border rounded-sm bg-gray-800 pl-2" placeholder="Some words about the channel..." onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className="flex justify-center items-center">
            <button id="cancel-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Cancel</button>
            <button id="create-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelCreator
