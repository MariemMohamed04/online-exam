/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname  } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { signout } from '@/services/authService';


export default function Navbar() {
  const activeLinkStyles = 'shadow-lg border-3 border-blue-600 rounded-lg';
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  // const session = useSession();
  const handleSignOut = async () => {
    console.log('Provider');
    console.log(session?.provider);
    try {
      if (session?.provider === "google" || session?.provider === "facebook" || session?.provider === "twitter") {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You are about to sign out.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          customClass: {
            confirmButton: 'custom-confirm-btn',
            cancelButton: 'custom-cancel-btn',
          },
        });
        if (result.isConfirmed) {
          await signOut({ redirect: false });
          console.log("Signed out via NextAuth for Google/Facebook/Twitter");
        }
      } 
      else if (session?.provider === "credentials") {
        const response = await signout();
        console.log(response)
      }
      router.push("/signin");
    } catch (error: any) {
      console.error("Error during sign-out:", error.message);
    }
  };


  return (
    <>
      <div className="flex justify-end items-center mt-[40px]">
<div className=" text-right h-[42px] w-[362px] pr-[80px]">
{session ? (
          <>
            <button
              onClick={handleSignOut}
              className=" hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
  <Link
                href="/signin"
                className={`${
                  pathname === '/signin'
                    ? activeLinkStyles
                    : ''
                } hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={`${
                  pathname === '/signup'
                    ? activeLinkStyles
                    : ''
                } hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Register
              </Link>
          </>
        )}
</div>
      </div>
    </>
  );
}
