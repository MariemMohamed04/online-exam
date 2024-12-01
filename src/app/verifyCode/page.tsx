import VerifyCode from '@/containers/AuthLayout/VerifyCode'
import React from 'react'
import HeaderComponent from '@/components/Header'

export default function page() {
  return (
    <>
    <div className="flex justify-center items-center flex-col">
<HeaderComponent text='Verify Code' className='mb-6'/>
    <VerifyCode/>
</div>
    </>
  )
}
