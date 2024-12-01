import React from "react";

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, error },
    ref
  ) => {
    return (
      <div className='w-full flex flex-col mt-3'>
        {/* Label */}
        {label && (
          <label
            className={`text-ascent-2 text-sm font-medium mb-2 ${labelStyles}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <div className='relative'>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-gray-300 focus:border-[#065ad8] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] transition-all duration-200 ease-in-out focus:shadow-md focus:ring-2 focus:ring-[#065ad8] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>

        {/* Error Message */}
        {error && (
          <span className='text-xs text-[#f64949fe] mt-1'>
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default TextInput;
