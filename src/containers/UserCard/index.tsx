"use client"

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react'

type props = {
  user: User
}


export default function UserCard({ user }: props) {
  const { data: session } = useSession();
  return (
    <>
    { session ? (
    <div>
        <h1 className="text-5xl">Welcome</h1>
    </div>
    ) : (
      <div>
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      </div>
    )

    }
    </>
  );
}
