/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHeading } from '@/interfaces/IHeading';
import React from 'react';
import style from './index.module.css'

const HeadingComponent: React.FC<IHeading> = ({
  text,
  span,
  className,
  spanClassName,
}) => {
  return (
    <>
<h1 className={`${style.heading} ${className || ''}`}>
      {text}
    </h1>
    </>
  );
};

export default HeadingComponent;