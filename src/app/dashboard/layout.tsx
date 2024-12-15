/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-sync-scripts */

import Dashboard from "@/containers/dashboard";
import SideBar from "@/containers/dashboard/sidebar";
import SearchBar from "@/containers/dashboard/searchBar";
import Progress from "@/containers/dashboard/progress";

export const metadata = {
  title: "Online Exam - Dashboard",
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
            <div className="w-[200px] ">
              <SideBar />
            </div>
            <div className="flex-1 flex flex-col items-center">
              <SearchBar />
              {children}
            </div>
          </div>
          <script src="https://unpkg.com/flowbite@1.6.0/dist/flowbite.min.js"></script>
        </body>
      </html>
    </>
  );
}

