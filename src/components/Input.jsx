import React from "react";

const Input = ({ label, type, value ,setValue,placeholder,disabled,className }) => {
  return (
    <div className="flex flex-col items-start mb-5">
      <label className="uppercase text-zinc-600 mb-2">{label}</label>
      <input
        type={type}
        name={type}
        value={value || ''}
        onChange={e => setValue(e.target.value)}
        disabled={disabled}
        className={`p-2 w-full border-none rounded-md bg-gray-200 border-slate-400 ${className}`}
        placeholder={placeholder}
      />{" "}
    </div>
  );
};

export default Input;
<input/>
