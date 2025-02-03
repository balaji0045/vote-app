import React from 'react'
import './HomePage.css'
import voterperson from '../../assets/frontend images.png'


const HomePage = () => {
  return (
    <div className='HomeContainer'>
      <div className="heading-container">
         <h1 className='heading1'>Vote Today </h1>
            <h1 className='heading2'>Change Tommorow!</h1>
      </div>



      <div className="imgcontainer">
        <img src={voterperson}alt="" />
      </div>
    </div>
  )
}

export default HomePage
