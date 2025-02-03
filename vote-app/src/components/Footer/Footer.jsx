import React from 'react'
import './Footer.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
const Footer = () => {
  return (
    <div className='FooterContainer'>
      <div className="footerheader">
        <h1>Vote App</h1>
      </div>

      <div className="icons">
        <EmailOutlinedIcon className="icon"/>
        <TwitterIcon className="icon"/>
        <FacebookIcon className="icon"/>
        
      </div>

<div className="footerContent">
  <p>© 2025 Vote App. All rights reserved</p>

</div>

      
    </div>
  )
}

export default Footer
