import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { history } from '../../../redux'

import { openWindow, setPopUpActive } from '../../../redux/reducers/secondary'
import { removeMessage } from '../../../redux/reducers/messages'
import { setNewChannelName, setNewChannelDescription } from '../../../redux/reducers/settings'
import { removeChannel } from '../../../redux/reducers/channels'

const Warning = ({ message, channel }) => {
  const dispatch = useDispatch()
  const channelId = useSelector((s) => s.channels?.activeChannel)
  const temp = useSelector((s) => s.secondary.temp)
  const { settingsForChannel } = useSelector((s) => s.channels)
  // console.log('WARNING! ', { message, channel })

  const removeButton = () => {
    if (message) dispatch(removeMessage(channelId, temp.message._id))
    if (channel) {
      history.go(-1)
      dispatch(removeChannel(settingsForChannel))
      dispatch(setNewChannelName())
      dispatch(setNewChannelDescription())
    }
    dispatch(openWindow(false))
    dispatch(setPopUpActive(false))
  }

  const closeWindow = () => {
    dispatch(openWindow(false))
    dispatch(setPopUpActive(false))
  }
  return (
    <div className="flex flex-col p-4 justify-center">
      <div className="flex justify-center font-semibold text-lg select-none pb-4">{`Remove ${message || channel}?`}</div>
      <div className="flex justify-around">
        <button type="button" className="focus:outline-none hover:bg-gray-700 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={closeWindow}>Cancel</button>
        <button type="button" className="focus:outline-none hover:bg-gray-700 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={removeButton}>Remove</button>
      </div>
    </div>
  )
}

export default Warning
