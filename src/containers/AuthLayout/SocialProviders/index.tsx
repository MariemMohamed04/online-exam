/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'
import style from './index.module.css'

export default function SocialProviders() {
  return (
    <>
    <div className="">
    <div className="flex justify-center items-center py-8">
      <div className={style.spanLine}></div>
<div className={`${style.smallText} px-2`}>
Or Continue with
</div>
    <div className={style.spanLine}></div>
    </div>
<div className="flex justify-center items-center">
<div className={`grid grid-cols-4 ${style.socials}`}>
  <div className={`${style.socialIcons} cursor-pointer`}>
  <Image 
      src="/images/google-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>
  <div className={`${style.socialIcons} cursor-pointer`}>
  <Image 
      src="/images/twitter-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>
  <div className={`${style.socialIcons} cursor-pointer`}>
  <Image 
      src="/images/facebook-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>
  <div className={`${style.socialIcons} cursor-pointer`}>
  <Image 
      src="/images/apple-logo.png" 
      alt="Logo" 
      width={23.57}
      height={23.57}
    />
  </div>

    </div>
</div>
    </div>
    </>
  )
}
