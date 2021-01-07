import React from 'react'

import Sidebar from './common/sidebar'
import ChatContent from './common/chat-content'

const Home = () => {
  return (
    <div className="h-screen overflow-hidden flex justify-center">
      <Sidebar />
      <ChatContent />
    </div>
  )
}

export default Home
