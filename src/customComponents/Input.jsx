const Input = ({
  placeholder,
  type,
  onChange,
  name,
  required,
  // value,
  defaultValue,
  disabled,
  className,
}) => {
  return (
    /**rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 ${className}*/
    <input
      type={type}
      className={`rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      defaultValue={defaultValue}
      required={required}
      // value={value || defaultValue}
      disabled={disabled}
    />
  );
};

export default Input;
