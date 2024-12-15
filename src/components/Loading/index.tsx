import React from 'react';
import style from './index.module.css'

export default function Loading() {
  return (
    <div className='flex justify-center items-center'>
<div className={style.loader}></div>
    </div>
  )
}
/**
 *     <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full"></div>
                </div>

 */