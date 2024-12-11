/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-sync-scripts */

import Dashboard from "@/containers/dashboard";
import SideBar from "@/containers/dashboard/sidebar";
import SearchBar from "@/containers/dashboard/searchBar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for managing exams",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <head></head>
        <body>
        <div className="flex gap-20">
  {/* Sidebar with fixed width */}
  <div className="w-[200px] bg-red-600">
    <SideBar />
  </div>
  
  {/* Main content that takes the remaining space */}
  <div className="flex-1 bg-blue-500">
    <SearchBar />
    {children}
  </div>
</div>


          <script src="https://unpkg.com/flowbite@1.6.0/dist/flowbite.min.js"></script>
        </body>
      </html>
    </>
    // <div className="dashboard-layout">
    //   <div className={`grid grid-cols-2 h-screen`}>
    // <div className="sidebar bg-lime-400 ">
    //   <SideBar/>
    // </div>
    // <div className="content bg-blue-400">

    //   <div>{children}</div>
    // </div>
    //   </div>
    //   {/* <nav className="bg-blue-500 p-4">Dashboard Navigation
    //     <SignOut/>
    //   </nav> */}
    // </div>
  );
}

