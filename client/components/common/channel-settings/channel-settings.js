import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { history } from '../../../redux'

import Main from './cs-main'
import Rights from './cs-rights'

import { setNewChannelName, setNewChannelDescription, setAccessRights } from '../../../redux/reducers/settings'
import { setTempRights } from '../../../redux/reducers/channels'

const ChannelSettings = () => {
  const dispatch = useDispatch()
  const { activeMenuItem } = useSelector((s) => s.settings)
  const settingsForChannel = useSelector((s) => s.channels.settingsForChannel)
  const channelName = useSelector((s) => s.channels.channelList[settingsForChannel]?.name)
  const channelDesc = useSelector((s) => s.channels.channelList[settingsForChannel]?.description)
  const channelAccess = useSelector((s) => s.channels.channelList[settingsForChannel]?.access)

  const activeSettingsItem = (id) => {
    switch (id) {
      case 'rights': {
        return <Rights />
      }
      default: {
        return <Main />
      }
    }
  }

  useEffect(() => {
    if (!settingsForChannel) {
      history.push('/channels')
    }
    dispatch(setNewChannelName(channelName))
    dispatch(setNewChannelDescription(channelDesc))
    dispatch(setTempRights(settingsForChannel))
    dispatch(setAccessRights(channelAccess))
    return () => {}
  }, [dispatch, channelName, channelDesc, settingsForChannel])

  return (
    <div className="flex flex-col bg-gray-600 text-gray-100 w-full">
      {activeSettingsItem(activeMenuItem)}
    </div>
  )
}

export default ChannelSettings
