import { IClassName } from '@/interfaces/IClassName'
import React from 'react'


const AuthLayout: React.FC<IClassName> = ({
  className,
}) => {
  return (
    <div className={`grid grid-cols-2 h-screen ${className}`}>
      <div className="sideFrame">
        <p className={`
        text-[50px] font-[700] text-[red]
          ${className}
          `}
          >Welcome to <span>Elevate</span></p>
      </div>
      <div className="bg-blue-600 flex items-center justify-center">
        <h1 className="text-lg font-bold">Column 2</h1>
      </div>
    </div>
  );
};

export default AuthLayout;

