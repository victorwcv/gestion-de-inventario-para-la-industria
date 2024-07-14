import { Field, ErrorMessage } from "formik";

const FormField = ({ formik, label, name, type }) => {
  return (
    <div className="relative pb-6 flex flex-col">
      <label htmlFor={name} className="pl-2 mb-1">{label}</label>
      <Field
        id={name}
        name={name}
        type={type}
        className={`p-2 bg-white bg-opacity-45 focus:border-blue-500
          ${
          formik.errors[name] && formik.touched[name] ? "  border-red-500" : ""
        } 
        `}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="absolute bottom-0 right-2 text-red-500"
      />
    </div>
  );
};

export default FormField;
