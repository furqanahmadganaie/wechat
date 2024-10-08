import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
const Home = () => {
  return (
    <div className=' flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400  
    bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity'>
       <Sidebar/>
       <MessageContainer/>

    </div>
  )
}

export default Home