import React from 'react'

export default function SearchBar() {
  return (
    <>
<div className="pt-8 bg-purple-800">
  <form className="flex items-center max-w-[1000px] mx-auto gap-6">
    <label htmlFor="quiz-search" className="sr-only">Search</label>
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="text"
        id="quiz-search"
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 py-2.5"
        placeholder="Search Quiz"
        required
      />
    </div>
    <button type="submit" className="inline-flex items-center w-[191px] h-[61px] px-8 py-4 rounded-[20px] bg-[#4461F2] text-white">
      Start Quiz
    </button>
  </form>
</div>

    </>
  )
}
