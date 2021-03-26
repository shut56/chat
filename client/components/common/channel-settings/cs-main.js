import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { history } from '../../../redux'

import { openWindow, setPopUpActive } from '../../../redux/reducers/secondary'
import { setNewChannelName, setNewChannelDescription } from '../../../redux/reducers/settings'
// import { removeChannel } from '../../../redux/reducers/channels'

const Main = () => {
  const dispatch = useDispatch()
  const { settingsForChannel } = useSelector((s) => s.channels)
  const { newChannelName, newChannelDescription } = useSelector((s) => s.settings)
  const channelName = useSelector((s) => s.channels.channelList[settingsForChannel]?.name)
  const channelDesc = useSelector((s) => s.channels.channelList[settingsForChannel]?.description)

  const removeButton = () => {
    dispatch(setPopUpActive(true))
    dispatch(openWindow(true, 'removeChannel'))
    // history.go(-1)
    // dispatch(removeChannel(settingsForChannel))
    // dispatch(setNewChannelName())
    // dispatch(setNewChannelDescription())
  }
  return (
    <div className="flex flex-col p-4 justify-center max-h-full">
      <div className="flex justify-center font-semibold text-lg select-none mb-2">{`Edit channel ${channelName}`}</div>
      <div className="flex flex-1 my-2">
        <div className="mr-2 select-none">Name:</div>
        <input type="text" className="flex-grow p-1 rounded bg-gray-800 pl-2 truncate" placeholder={channelName} onChange={(e) => dispatch(setNewChannelName(e.target.value))} value={newChannelName} />
      </div>
      <div className="flex my-2">
        <div className="mr-2 select-none">Description:</div>
        <input type="text" className="flex-grow p-1 rounded bg-gray-800 pl-2" placeholder={channelDesc} onChange={(e) => dispatch(setNewChannelDescription(e.target.value))} value={newChannelDescription} />
      </div>
      <div className="flex justify-center items-center mt-2">
        <button id="remove-btn" type="button" className="focus:outline-none hover:bg-red-600 mx-4 py-1 px-4 rounded-md bg-red-900" onClick={removeButton}>Remove</button>
      </div>
    </div>
  )
}

export default Main

/*
const ChannelSettings = () => {

  return (
    <div>
      <div className="fixed flex items-center justify-center text-white w-full h-screen z-10 py-4">
        <div className="flex flex-col w-96 h-auto rounded-md bg-gray-800 z-20 max-h-screen">
          <div className="flex flex-col p-4 justify-center max-h-full">
            <div className="flex justify-center font-semibold text-lg select-none mb-2">{`Edit channel ${channelName}`}</div>
            <div className="flex flex-1 my-2">
              <div className="mr-2 select-none">Name:</div>
              <input type="text" className="flex-grow border rounded-sm bg-gray-800 pl-2 truncate" placeholder={channelName} onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="flex my-2">
              <div className="mr-2 select-none">Description:</div>
              <input type="text" className="flex-grow border rounded-sm bg-gray-800 pl-2" placeholder={channelDesc} onChange={(e) => setDescription(e.target.value)} value={description} />
            </div>
            {temporaryRights.length < 1 || (
              <div className="flex flex-1 flex-col max-h-40 mb-2 mt-2">
                <div className="flex flex-row justify-between align-center mb-2">
                  <div className="select-none">Users with access</div>
                  <button
                    type="button"
                    className="text-sm bg-gray-700 rounded px-2 py-0.5"
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
                        className="flex-auto relative flex justify-center bg-gray-700 rounded px-1 py-0.5 m-1"
                      >
                        <button
                          type="button"
                          className="absolute -top-1 -right-1.5 focus:outline-none w-3.5 h-3.5 bg-red-900 rounded-full border-2 border-gray-800"
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
              <div className="flex flex-1 flex-col max-h-40 mb-2 mt-2">
                <div className="flex flex-row justify-between align-center mb-2">
                  <div className="select-none">Users without access</div>
                  <button
                    type="button"
                    className="text-sm bg-gray-700 rounded px-2 py-0.5"
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
                        className="flex-auto relative flex justify-center bg-gray-700 rounded px-1 py-0.5 m-1"
                      >
                        <button
                          type="button"
                          className="absolute -top-1 -right-1.5 focus:outline-none w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-800"
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
            <div className="flex justify-center items-center mt-2">
              <button id="remove-btn" type="button" className="focus:outline-none hover:bg-red-600 mx-4 py-1 px-4 rounded-md bg-red-900" onClick={onClick}>Remove</button>
              <button id="cancel-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Cancel</button>
              <button id="save-btn" type="button" className="focus:outline-none hover:bg-gray-600 mx-4 py-1 px-4 rounded-md bg-gray-900" onClick={onClick}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelSettings

*/
