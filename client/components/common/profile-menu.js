import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { history } from '../../redux'
import { changeActiveItem } from '../../redux/reducers/userSettings'

const ProfileMenu = () => {
  const dispatch = useDispatch()
  const { menuItems } = useSelector((s) => s.userSettings)
  const { activeItem } = useSelector((s) => s.userSettings)

  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (key) => {
    console.log('key', key)
    dispatch(changeActiveItem(key))
  }

  return (
    <div className="bg-gray-700 text-gray-400 w-60 pb-6 overflow-y-auto h-full">
      <div className="flex flex-row py-2 justify-center font-bold">
        User Settings
      </div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {Object.keys(menuItems).map((item) => {
          return (
            <div className="flex justify-between" key={item} data-key={item}>
              <button
                type="button"
                onClick={(e) => onClick(e.target.parentNode.dataset.key)}
                className={`focus:outline-none py-1 my-0.5 px-2 rounded-md hover:bg-gray-600 w-full cursor-pointer text-left ${isActive(item === activeItem)}`}
              >
                {menuItems[item].name}
              </button>
            </div>
          )
        })}
      </div>
      <button type="button" onClick={() => history.go(-1)} className="flex justify-center mx-4 rounded px-4 py-2 font-bold bg-red-900 text-white w-32">Exit</button>
    </div>
  )
}

export default ProfileMenu
