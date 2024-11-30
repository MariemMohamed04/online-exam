/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    if (session?.token) {
      console.log(session.token);
      console.log(session.user);
      try {
        console.log("Logging out with token:", session.token);
        const response = await axios.get(
          "https://exam.elevateegy.com/api/v1/auth/logout", 
          {
            headers: {
              token: `${session.token}`,
            }
          }
        );
        console.log("Logout response:", response);

        if (response.data.message === "success") {
          console.log('success');

          await signOut({ redirect: false });
          router.push("/signin");
        } else {
          console.error("Sign-out failed:", response.data);
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className=" sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {session ? (
                    <>
                      <Link
                        href={'/'}
                        className="text-white hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Home
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="text-white hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={'/signin'}
                        className="text-white hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign In
                      </Link>
                      <Link
                        href={"/signup"}
                        className="text-white hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
