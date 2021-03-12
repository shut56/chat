import React from 'react'
import { useSelector } from 'react-redux'

import MyAccount from './profile-settings/my-account'
import Notifications from './profile-settings/notifications'

const ProfileSettings = () => {
  const { activeItem } = useSelector((s) => s.userSettings)

  const activeSettingsItem = (id) => {
    switch (id) {
      case 'notifications': {
        return <Notifications />
      }
      default: {
        return <MyAccount />
      }
    }
  }
  return (
    <div className="flex flex-col bg-gray-600 text-gray-100 w-full">
      {activeSettingsItem(activeItem)}
    </div>
  )
}

export default ProfileSettings
