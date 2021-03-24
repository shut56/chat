import React from 'react'
import { useSelector } from 'react-redux'

import ServerResponse from './common/server-response'

import ProfileMenu from './common/profile-settings/profile-menu'
import ProfileSettings from './common/profile-settings/profile-settings'
import UserDataChange from './common/profile-settings/user-data-change'

const Profile = () => {
  const { updateEmailToggle, updatePassowordToggle } = useSelector((s) => s.secondary)
  const { response } = useSelector((s) => s.userSettings)
  return (
    <div className="flex bg-gray-700 h-screen w-full">
      {updateEmailToggle && <UserDataChange email="email" />}
      {updatePassowordToggle && <UserDataChange password="password" />}
      {response?.text && <ServerResponse />}
      <ProfileMenu />
      <ProfileSettings />
    </div>
  )
}

export default Profile
