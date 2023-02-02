import React from 'react'
import { AiFillInstagram,AiOutlineTwitter } from 'react-icons/ai'
const Footer = () => {
  const d = new Date();
let year = d.getFullYear();
  return (
    <div className='footer-container'>
      <p>{year} SlapStick All Right Reserved</p>
      <p className='icon'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer