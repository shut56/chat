import React from 'react'

import ProfileMenu from './common/profile-menu'
import ProfileSettings from './common/profile-settings'

const Profile = () => {
  return (
    <div className="flex bg-gray-700 h-screen w-full">
      <ProfileMenu />
      <ProfileSettings />
    </div>
  )
}

export default Profile
