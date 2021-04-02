import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { history } from '../../../redux'
import {
  changeActiveItem, setNewChannelName, setNewChannelDescription, setAccessRights
} from '../../../redux/reducers/settings'
import { editChannel } from '../../../redux/reducers/channels'

const ChannelMenu = () => {
  const dispatch = useDispatch()
  const { menuItems } = useSelector((s) => s.settings.channelSettings)
  const { settingsForChannel } = useSelector((s) => s.channels)
  const {
    activeMenuItem, accessRights, newChannelName, newChannelDescription
  } = useSelector((s) => s.settings)
  const isActive = (bool) => bool && 'bg-gray-600'

  const menuButton = (key) => {
    // console.log('key', key)
    dispatch(changeActiveItem(key))
  }

  const saveButton = () => {
    dispatch(editChannel(settingsForChannel, newChannelName, newChannelDescription, accessRights))
  }

  const buttonBack = () => {
    history.go(-1)
    dispatch(setNewChannelName())
    dispatch(setNewChannelDescription())
    dispatch(setAccessRights())
  }

  if (!activeMenuItem) {
    dispatch(changeActiveItem(Object.keys(menuItems)[0]))
  }
  return (
    <div className="bg-gray-700 text-gray-400 w-60 pb-6 overflow-y-auto h-full">
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={buttonBack}
          className="focus:outline-none hover:bg-gray-800 rounded bg-gray-600 font-semibold px-2 py-1 text-white"
        >
          Back
        </button>
      </div>
      <div className="flex flex-row py-2 justify-center font-bold">
        Channel Settings
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {Object.keys(menuItems).map((item) => {
          return (
            <div className="flex justify-between" key={item}>
              <button
                type="button"
                onClick={() => menuButton(item)}
                className={`focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer text-left ${isActive(item === activeMenuItem)}`}
              >
                {menuItems[item].name}
              </button>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center items-center mt-2">
        <button id="save-btn" type="button" className="focus:outline-none hover:bg-gray-700 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={saveButton}>Save</button>
      </div>
    </div>
  )
}

export default ChannelMenu
