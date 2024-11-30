import { IHeading } from '@/interfaces/IHeading';
import React from 'react';
import style from './index.module.css'

const HeadingComponent: React.FC<IHeading> = ({
  text,
  className,
}) => {
  return (
    <>
      <h1
      className={`${style.heading} ${className || ""}`}
      >{text}</h1>
    </>
  );
};

export default HeadingComponent;