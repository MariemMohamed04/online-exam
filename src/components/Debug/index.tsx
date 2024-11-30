"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DebugComponent = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);

  return null;
};

export default DebugComponent;