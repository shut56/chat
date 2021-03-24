import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { changeActiveChannel } from '../../redux/reducers/channels'

const DirectMessages = () => {
  const dispatch = useDispatch()
  const { activeChannel } = useSelector((s) => s.channels)
  const { userList, userStatus } = useSelector((s) => s.users)
  const { _id } = useSelector((s) => s.auth.user)
  const isActive = (bool) => bool && 'bg-gray-600'

  const onClick = (key) => {
    console.log('User Key: ', key)
    dispatch(changeActiveChannel(key))
  }

  const isOnline = (bool) => {
    if (bool) {
      return 'bg-yellow-300'
    }
    return 'border'
  }

  const userSort = (usersArray) => {
    const users = usersArray.reduce((acc, uid) => {
      if (uid === _id) {
        return { ...acc, online: [uid, ...acc.online] }
      }
      if (typeof userStatus[uid] !== 'undefined') {
        return { ...acc, online: [...acc.online, uid] }
      }
      return { ...acc, offline: [...acc.offline, uid] }
    }, {
      online: [],
      offline: []
    })
    return [...users.online, ...users.offline]
  }

  const isMe = (uid) => {
    if (typeof userList[uid]?.name === 'undefined') {
      return <span className="text-left">User</span>
    }
    return uid === _id
      ? <span className="text-left">{userList[uid].name} <i className="text-gray-500 text-sm">(me)</i></span>
      : <span className="text-left">{userList[uid].name}</span>
  }

  return (
    <div>
      <div className="px-4 font-sans font-bold h-8">Direct Messages</div>
      <div className="flex flex-col w-full mb-6 text-gray-200 px-2">
        {
          userSort(Object.keys(userList)).map((uid) => {
            // console.log('Current UID: ', uid)
            return (
              <button
                type="button"
                key={uid}
                className={`focus:outline-none flex items-center px-2 py-0.5 my-0.5 rounded-md select-none text-gray-100 hover:bg-gray-600 ${isActive(uid === activeChannel)}`}
                onClick={() => onClick(uid)}
              >
                <span className={`${isOnline(!!userStatus[uid])} rounded-full block w-2 h-2 mr-2`}>&#8194;</span>
                {isMe(uid)}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default DirectMessages
