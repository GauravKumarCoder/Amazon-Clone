import React from 'react'

function Carousel() {
  return (
    <div className='home'>
        <div className="home_container">
            <img 
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
                }}
                className='w-full -z-1 -p-b-5 relative'
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                alt="" />
        </div>
      
    </div>
  )
}

export default Carousel
