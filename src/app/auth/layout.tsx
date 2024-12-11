import Navbar from "@/containers/Navbar";
import SideBanner from "../sideBanner/sideBanner";
import SocialProviders from "@/containers/AuthLayout/SocialProviders";


export const metadata = {
  title: "Online Exam - Authentication",
  description: "Login or Sign Up",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
<div className={`grid grid-cols-1 lg:grid-cols-2 h-screen`}>
<div className="sideOne hidden lg:block">
  <SideBanner />
</div>
<div className="sideTwo col-span-1 lg:col-span-1 mb-20">
  <Navbar />
  <div className="mt-[50px]">
    {children}
    <SocialProviders />
  </div>
</div>
</div>
  );
}


