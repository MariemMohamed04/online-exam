"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/client')
    }
})

const greeting = session?.user?.name ? (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {session?.user?.name}!
  </div>
) : null

const userImage = session?.user?.image ? (
  <Image
    className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
    src={session?.user?.image}
    alt={session?.user?.name ?? "Profile Pic"}
    layout="intrinsic" // Keeps the intrinsic aspect ratio
    width={200}
    height={200}
    priority={true}
  />
  
  
      ) : null

return (
  <>
  <section className="flex flex-col gap-4">
            {greeting}
            {session?.user?.email}
            {userImage}
        </section>
  </>
)
}
