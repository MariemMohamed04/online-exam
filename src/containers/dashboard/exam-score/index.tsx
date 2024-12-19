// import React from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// interface ExamScoreProps {
//   remainingTime: number | null; // Accept remaining time as a prop
// }

// export default function ExamScore({ remainingTime }: ExamScoreProps) {
//   const data = {
//     labels: ["Correct", "Incorrect"],
//     datasets: [
//       {
//         label: "Quiz Progress",
//         data: [70, 30, 0],
//         backgroundColor: ["#4CAF50", "#F44336"],
//         borderColor: ["#4CAF50", "#F44336"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const displayTime = remainingTime !== null 
//     ? `${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, "0")}` 
//     : "00:00";


//   return (
//     <>
//         <div
//           tabIndex={-1}
//           aria-hidden="true"
//           className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-6 w-[648px] h-fit rounded-[20px]">
//             <div className="mb-4">
//               <h3 className="text-2xl font-medium text-[#0F0F0F]">Your Score</h3>

//             </div>
//             <div className='mb-4'><p className="text-lg">Time Taken: {displayTime}</p></div>
//             <div className="chart" style={{ width: "132px", height: "132px" }}>
//       <Doughnut
//         data={data}
//         options={{
//           maintainAspectRatio: false, 
//         }}
//       />
//     </div>
    
//             <div className="">
//               <button
//                 type="button"
//                 className="bg-[#4461F2] w-[600px] h-[48px] rounded-[100px] text-white"
//               >
//                 Start
//               </button>
//             </div>
//           </div>
//         </div>
//     </>
//   )
// }
