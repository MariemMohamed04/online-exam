import HeaderComponent from '@/components/Header'
import SignUpForm from '@/containers/AuthLayout/SignUp'

import React from 'react'

export default function SignUpPage() {
  return (
    <>

<div className="flex justify-center items-center flex-col">
<HeaderComponent text='Sign up' className='mb-6'/>
<SignUpForm />
</div>

    </>
  )
}
