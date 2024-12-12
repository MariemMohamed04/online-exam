/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

export default function SideBar() {
  return (
    <>
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="logo-sidebar" className="w-[193px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className=" mt-12 pl-7">
          <div className="mb-10">
            <Link href={'/dashboard/home'} className=''>
              <Image src={'/images/final-logo.png'} alt={'logo'} width={151} height={29} className='' />
            </Link>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href={'/'} className="flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                <MdSpaceDashboard
                  className="text-[#4461F2] group-hover:text-white transition"
                  style={{ fontSize: "20px" }}
                />
                <span className="text-[#696F79] font-semibold text-xl group-hover:text-white transition">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href={'/'} className="flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                <MdOutlineHistory
                  className="text-[#4461F2] group-hover:text-white transition"
                  style={{ fontSize: "20px" }}
                />
                <span className=" text-[#696F79] font-semibold text-xl group-hover:text-white transition">Quiz History</span>
              </Link>
            </li>
            <li>
              <Link href={'/'} className="flex items-center space-x-4 text-gray-900 rounded-[10px] p-2 dark:text-white hover:bg-[#4461F2] group transition">
                <RiLogoutBoxFill
                  className="text-[#4461F2] group-hover:text-white transition"
                  style={{ fontSize: "20px" }}
                />
                <span className="text-[#696F79] font-semibold text-xl group-hover:text-white transition">Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

    </>
  )
}


/*
width: Fixed (193px)px;
height: Hug (311px)px;
gap: 56px;
opacity: 0px;

*/