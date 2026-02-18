import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
function Home() {
  return (
    <div className='home  mt-5 d-flex flex-column     justify-content-center  align-items-center' data-aos="zoom-in-down" data-aos-duration="1300">
      <div className='w-auto  flex-end  m-auto'><h1 data-aos='fade-left' data-aos-duration="2000" className="text-success fw-bolder " >
  <Typewriter  words={[`Welcome to Tasks, your ultimate destination for seamless task management and freelancing!`]}
    loop={5}
    delaySpeed={1000}
    typeSpeed={80} /></h1>
    </div>
    </div>
  )
}

export default Home
