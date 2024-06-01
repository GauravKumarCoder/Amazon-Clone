import React from 'react'
import banner from './../assets/banner.jpg'

function Carousel() {
  return (
    <div className='home'>
        <div className="home_container">
            <img 
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
                }}
                className='w-full -z-1 -p-b-5 relative'
                src={banner}
                alt="" />
        </div>
      
    </div>
  )
}

export default Carousel
