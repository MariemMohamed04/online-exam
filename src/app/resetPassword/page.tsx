import React from 'react'
import HeaderComponent from '@/components/Header'
import ResetPasswordForm from '@/containers/AuthLayout/ResetPassword'
import DebugComponent from '@/components/Debug'

export default function ResetPasswordPage() {
  return (
    <>

<div className="flex justify-center items-center flex-col">
<HeaderComponent text='Set Password' className='mb-6'/>
<ResetPasswordForm />
<DebugComponent/>
</div>

    </>
  )
}
