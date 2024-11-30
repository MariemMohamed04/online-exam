import HeaderComponent from '@/components/Header'
import SignUpForm from '@/containers/AuthLayout/SignUp'
import SocialProviders from '@/containers/AuthLayout/SocialProviders'
import React from 'react'

export default function SignUpPage() {
  return (
    <>
    <HeaderComponent text='Sign up'/>
    <SignUpForm />
    <SocialProviders/>
    </>
  )
}
