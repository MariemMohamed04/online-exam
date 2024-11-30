/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'
import style from './index.module.css'

export default function SocialProviders() {
  return (
    <>
    <div className={`grid grid-cols-4 ${style.socials}`}>
  <div className={`${style.socialIcons}`}>
  <Image 
      src="./images/google-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>
  <div className={`${style.socialIcons}`}>
  <Image 
      src="./images/twitter-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>
  <div className={`${style.socialIcons}`}>
  <Image 
      src="./images/facebook-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>
  <div className={`${style.socialIcons}`}>
  <Image 
      src="./images/apple-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>

    </div>
    </>
  )
}
