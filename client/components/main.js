import React from 'react'

import { history } from '../redux'

const Main = () => {
  const enter = () => {
    history.push('/channels')
  }
  return (
    <div className="flex flex-col">
      <div className="px-4 mb-3 font-sans font-bold">This is Chat</div>
      <div style={{
        display: 'flex',
        width: '100%',
        background: 'yellow',
        color: 'black',
        flex: '1 1 auto'
      }}
      >
        <div style={{ padding: '0 4px' }}>1</div>
        <div style={{
          background: 'cyan',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiisitaquequodpraesentiumexplicaboincidunt? Dolores beatae nam at sed dolorum ratione dolorem nisi velit cum
        </div>
        <div style={{ padding: '0 4px' }}>3</div>
      </div>
      <button className="flex justify-center mx-4 rounded px-4 py-2 font-bold bg-red-900 text-white w-32" type="button" onClick={() => enter()}>Login</button>
    </div>
  )
}

export default Main
