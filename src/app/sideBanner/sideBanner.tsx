import React from 'react'
import style from './style.module.css'
import Image from 'next/image'

// import HeadingComponent from '@/components/Header'

export default function SideBanner() {
  return (
    <>
    <div className={style.sideFrame}>

<div className={style.sideBanner}>
<div className="">
<h1 className={`${style['main-part']}`}>
  Welcome to <span className={style['small-part']}>Elevate</span>
</h1>

<p className={style.leading}>Quidem autem voluptatibus qui quaerat aspernatur architecto natus</p>
</div>
<div className="">
<Image
src={'/images/bro.png'}
alt='bro image'
width={408}
height={434.59}
/>
</div>
</div>
    </div>
    </>
  )
}
