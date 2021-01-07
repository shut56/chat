import React from 'react'

const ChatContent = () => {
  return (
    <div className="w-full flex flex-col bg-gray-600 text-gray-100">
      {/* <!-- Top bar --> */}
      <div className="border-b border-gray-700 shadow flex px-6 py-2 items-center">
        <div className="flex flex-col">
          <h3 className="text-lg mb-1 font-bold">#general</h3>
          <div className="text-gray-300 font-thin text-md">
            Chit-chattin&apos; about ugly HTML and mixing of concerns.
          </div>
        </div>

        <div className="ml-auto hidden md:block">
          <input type="search" placeholder="Search" className="focus:outline-none rounded-lg p-2 bg-gray-800" />
        </div>
      </div>

      {/* <!-- Chat messages --> */}
      <div className="px-6 py-4 flex-1 overflow-scroll-x">
        {/* <!-- A message --> */}
        <div className="flex items-start mb-4">
          <img src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4" className="w-10 h-10 rounded mr-3" alt="user avatar" />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">killgt</span>
              <span className="text-gray text-xs font-light">11:46</span>
            </div>
            <p className="font-light text-md pt-1">The slack from the other side.</p>
          </div>
        </div>

        {/* <!-- A message --> */}
        <div className="flex items-start mb-4">
          <img src="https://i.imgur.com/8Km9tLL.jpg" className="w-10 h-10 rounded mr-3" alt="user avatar" />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">Olivia Dunham</span>
              <span className="text-gray text-xs font-light">12:45</span>
            </div>
            <p className="font-light text-md pt-1">How are we supposed to control the marquee space without an utility for it? I propose this:</p>
            <div id="code-tag" className="text-gray-300 bg-gray-700 border border-gray-800 font-mono rounded p-3 mt-2 whitespace-pre">
              {'.marquee-lightspeed {-webkit - marquee - speed: fast; } \n.marquee-lightspeeder {-webkit - marquee - speed: faster; }'}
            </div>
          </div>
        </div>

        {/* <!-- A message --> */}
        <div className="flex items-start">
          <img src="https://i.imgur.com/qACoKgY.jpg" className="w-10 h-10 rounded mr-3" alt="user avatar" />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">Adam Bishop</span>
              <span className="text-gray text-xs font-light">12:46</span>
            </div>
            <p className="font-light text-md pt-1"><a href="#" className="font-semibold">@Olivia Dunham</a> the size of the generated CSS is creating a singularity in space/time, we must stop adding more utilities before it&apos;s too late!</p>
          </div>
        </div>
      </div>

      <div className="flex m-6 rounded-lg bg-white overflow-hidden">
        <button type="button" className="m-2 font-bold text-white h-6 w-6 rounded-full border-gray bg-gray-500 opacity-60 hover:opacity-100">+</button>
        <input type="text" className="w-full px-2 text-black focus:outline-none" placeholder="Message to #general" />
      </div>
    </div>
  )
}

export default ChatContent
