import React from 'react'

export default function Questions() {
  return (
    <>
        <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 w-[648px] h-[309px] rounded-[20px]">
        <div className="mb-4">
          <h3 className="text-2xl font-medium text-[#0F0F0F]">
            Questions
          </h3>
        </div>
        <div className=" mb-12">
          <ul className="list-disc list-inside text-[#535353] text-xl font-medium">
            <li>
              Lorem ipsum dolor sit amet consectetur.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur.
            </li>
          </ul>
        </div>
        <div className="">
          <button type="button" className="bg-[#4461F2] w-[600px] h-[48px] rounded-[100px] text-white">
            Start
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
