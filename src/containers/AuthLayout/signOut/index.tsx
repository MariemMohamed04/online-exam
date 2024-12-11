"use client"
import ButtonComponent from '@/components/Button'
import { signOut } from '@/services/auth';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SignOut() {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await signOut();
        console.log(response);
router.push("/auth/signin");
  }
  return (
    <>
    <ButtonComponent text='Sign Out' type='submit' onClick={handleSignOut} />
    </>
  )
}
