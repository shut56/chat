import React from 'react'
import { useSelector } from 'react-redux'

import MyAccount from './my-account'
import Notifications from './notifications'

const ProfileSettings = () => {
  const { activeMenuItem } = useSelector((s) => s.settings)

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
      {activeSettingsItem(activeMenuItem)}
    </div>
  )
}

export default ProfileSettings
