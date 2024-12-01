import ForgotPassword from '@/containers/ForgotPassword'
import React from 'react'
import HeaderComponent from '@/components/Header'

export default function ForgotPasswordPage() {
  return (
    <>
    <div className="flex justify-center items-center flex-col">
<HeaderComponent text='Forgot Password' className='mb-6'/>
    <ForgotPassword/>
</div>
    </>
  )
}
