import Image from 'next/image';
import React from 'react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/utils/options';


// export async function getServerSideProps(context: any) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   return {
//     props: {
//       session,
//     },
//   };
// }
export default function Progress() {

  return (
    <>
      <div className="w-[1063px] bg-white py-8 px-4 rounded-[20px] shadow-[0px_15px_40px_0px_rgba(0,0,0,0.05)] flex mb-9">
        <div className='pr-14'>
          <Image src={'/images/pfp.png'} alt={'pfp'} width={216} height={216} />
        </div>
        <div>
          <h1 className='text-[#4461F2] font-bold text-[32px]'>Guest</h1>
          <p className='text-[#979CA3] mb-6'>Voluptatem aut</p>
          <div className="bg-[#f5f5f5] w-[619px] h-[12px] rounded-[30px] mb-6">
            <div className="bg-[#4461F2] w-[434px] h-[12px] rounded-[30px]"></div>
          </div>
          <div className='flex'>
            <div className='flex mr-[27px]'>
              <div className='mr-4 w-[70px] h-[70px] bg-white rounded-[10px] shadow-[0px_15px_40px_5px_rgba(237,237,237,1)] flex justify-center items-center'>
                <Image src={'/images/progress-flag.png'} alt={'Quiz Passed'} width={31.25} height={31.25} />
              </div>
              <div>
                <span className='text-[#696F79] text-[29px] font-bold'>27</span>
                <p className='text-[#696F79] text-[16px] font-normal'>Quiz Passed</p>
              </div>
            </div>
            <div className='flex mr-[27px]'>
              <div className='mr-4 w-[70px] h-[70px] bg-white rounded-[10px] shadow-[0px_15px_40px_5px_rgba(237,237,237,1)] flex justify-center items-center'>
                <Image src={'/images/progress-time.png'} alt={'Fastest Time'} width={38} height={38} />
              </div>
              <div>
                <span className='text-[#696F79] text-[29px] font-bold'>13 min</span>
                <p className='text-[#696F79] text-[16px] font-normal'>Fastest Time</p>
              </div>
            </div>
            <div className='flex mr-[27px]'>
              <div className='mr-4 w-[70px] h-[70px] bg-white rounded-[10px] shadow-[0px_15px_40px_5px_rgba(237,237,237,1)] flex justify-center items-center'>
                <Image src={'/images/progress-correct.png'} alt={'Correct Answers'} width={34.83} height={34.83} />
              </div>
              <div>
                <span className='text-[#696F79] text-[29px] font-bold'>200</span>
                <p className='text-[#696F79] text-[16px] font-normal'>Correct Answers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
