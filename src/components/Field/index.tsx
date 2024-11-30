/* eslint-disable @typescript-eslint/no-unused-vars */
// components/FieldComponent.tsx
import { IField } from '@/interfaces/IField';
import { Field } from 'formik';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';



const FieldComponent: React.FC<IField> = ({
  name,
  type,
  placeholder,
  className,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <Field
        type={isPasswordVisible ? 'text' : type}
        name={name}
        placeholder={placeholder}
        className={`w-full pr-10 ${className}`}
      />
      {type === 'password' && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </span>
      )}
    </div>
  );
};

export default FieldComponent;
