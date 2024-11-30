// components/FieldComponent.tsx
import { IField } from '@/interfaces/IField';
import { Field } from 'formik';



const FieldComponent: React.FC<IField> = ({
  name,
  type,
  placeholder,
  className,
}) => {
  return (
    <>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={`
          ${className}`}
      />
    </>
  );
};

export default FieldComponent;
