import React from 'react'
import { useSelector } from 'react-redux'

const DirectMessages = () => {
  const { userList, userStatus } = useSelector((s) => s.users)
  const { _id } = useSelector((s) => s.auth.user)

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
      <div className="px-4 mb-3 font-sans font-bold">Direct Messages</div>
      <div className="flex flex-col">
        {
          userSort(Object.keys(userList)).map((uid) => {
            return (
              <button type="button" key={`${uid}`} className="flex items-center px-4 mb-2 select-none text-gray-100">
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
