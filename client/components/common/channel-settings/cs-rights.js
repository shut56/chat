import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setAccess } from '../../../redux/reducers/channels'
import { setAccessRights } from '../../../redux/reducers/settings'

const Rights = () => {
  const dispatch = useDispatch()
  const { settingsForChannel, temporaryRights } = useSelector((s) => s.channels)
  const { accessRights } = useSelector((s) => s.settings)
  const channelName = useSelector((s) => s.channels.channelList[settingsForChannel]?.name)
  const allUsers = useSelector((s) => s.users.userList)

  const usersWithoutAccess = Object.keys(allUsers).filter((uid) => !temporaryRights.includes(uid) && !allUsers[uid]?.role.includes('admin'))

  const onClick = (elementId) => {
    switch (elementId) {
      case 'access-all': {
        dispatch(setAccessRights('All'))
        break
      }
      case 'access-neither': {
        dispatch(setAccessRights('Neither'))
        break
      }
      case 'access-some-users': {
        dispatch(setAccessRights('Some users'))
        break
      }
      default: {
        return 'Invalid rights'
      }
    }
    return 'Rights set'
  }
  return (
    <div className="flex flex-col p-2 h-full">
      <div className="flex justify-center font-semibold text-lg select-none mb-1">{`Edit channel ${channelName}`}</div>
      <div className="flex flex-col justify-center items-center mt-1">
        <div className="text-xl font-semibold select-none mb-1">Access level</div>
        <div className="flex flex-row m-1">
          <button id="access-all" type="button" className="focus:outline-none hover:bg-gray-700 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={(e) => onClick(e.target.id)}>All</button>
          <button id="access-neither" type="button" className="focus:outline-none hover:bg-gray-700 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={(e) => onClick(e.target.id)}>Neither</button>
          <button id="access-some-users" type="button" className="focus:outline-none hover:bg-gray-700 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={(e) => onClick(e.target.id)}>Some users</button>
        </div>
      </div>
      {accessRights === 'Some users' && (
        <div className="flex flex-col bg-gray-700 rounded p-2 max-h-max overflow-y-auto">
          {temporaryRights.length < 1 || (
            <div className="flex-1 flex flex-col mb-2 mt-2">
              <div className="flex flex-row justify-between align-center mb-2">
                <div className="text-xl font-semibold select-none">Users with access</div>
                <button
                  type="button"
                  className="text-sm bg-gray-600 rounded px-2 py-0.5"
                  onClick={() => temporaryRights.forEach((uid) => dispatch(setAccess(false, uid)))}
                >
                  Deny everyone
                </button>
              </div>
              <div className="flex flex-1 flex-row flex-wrap max-h-full overflow-y-auto overflow-x-hidden select-none w-full">
                {temporaryRights.map((uid) => {
                  return (
                    <div
                      key={uid}
                      className="flex-auto relative flex justify-center bg-gray-600 rounded px-1 py-0.5 m-1"
                    >
                      <button
                        type="button"
                        className="flex justify-center items-center absolute -top-1 -right-1.5 focus:outline-none w-3.5 h-3.5 bg-red-900 rounded-full border-2 border-gray-700"
                        onClick={() => dispatch(setAccess(false, uid))}
                      >
                        -
                      </button>
                      {allUsers[uid]?.name || 'User'}
                    </div>
                  )
                })}
                <div className="flex-1" />
              </div>
            </div>
          )}
          {usersWithoutAccess.length < 1 || (
            <div className="flex-1 flex flex-col mb-2 mt-2">
              <div className="flex flex-row justify-between align-center mb-2">
                <div className="text-xl font-semibold select-none">Users without access</div>
                <button
                  type="button"
                  className="text-sm bg-gray-600 rounded px-2 py-0.5"
                  onClick={() => usersWithoutAccess.forEach((uid) => dispatch(setAccess(true, uid)))}
                >
                  Allow everyone
                </button>
              </div>
              <div className="flex flex-1 flex-row flex-wrap max-h-full overflow-y-auto overflow-x-hidden select-none">
                {usersWithoutAccess.map((uid) => {
                  return (
                    <div
                      key={uid}
                      className="flex-auto relative flex justify-center bg-gray-600 rounded px-1 py-0.5 m-1"
                    >
                      <button
                        type="button"
                        className="flex justify-center items-center absolute -top-1 -right-1.5 focus:outline-none w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-700 text-black"
                        onClick={() => dispatch(setAccess(true, uid))}
                      >
                        +
                      </button>
                      {allUsers[uid]?.name || 'User'}
                    </div>
                  )
                })}
                <div className="flex-1" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Rights
