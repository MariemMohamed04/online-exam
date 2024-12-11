/* eslint-disable @typescript-eslint/no-unused-vars */
import DebugComponent from '@/components/Debug'
import SignInForm from '@/containers/SignIn'
import React from 'react'
import HeaderComponent from '@/components/Header'

export default function SignIn() {
  return (
    <>
    <div className="flex justify-center items-center flex-col">
<HeaderComponent text='Sign in' className='mb-6'/>
    <SignInForm/>
</div>
    <DebugComponent/>

    </>
  )
}

