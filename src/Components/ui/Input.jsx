import React, { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
    input,
    handleChange,
    inputClassName = "",
    labelClassName,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const error = input.error;

    const inputClasses = () => {
        let classes =
            "w-full bg-white " +
            "appearance-none transition duration-300 " +
            "ease-in-out focus:outline-none " +
            "focus:ring-0 border mb-2 " +
            "border-border-base rounded-md focus:border-green-500 h-12 ";

        classes += input.icon ? "px-10  " : "px-4 ";
        classes += error ? "border-red-500 " : " ";
        classes += inputClassName;

        return classes;
    };

    const labelClasses = () => {
        let classes = "mb-2 flex ";
        classes += 0 ? "text-white " : " text-bold ";
        classes += labelClassName;
        return classes;
    };

    const validate = (data) => {
        input = input || {};
        input.data = data;


        if (input.validation) {
            const { error } = input.validation.validate(input.data);
            if (error) {
                input.error = error.details[0].message;
            } else {
                input.error = null;
            }
        }

        handleChange(input);
    };

    return (
        <div className="w-full flex flex-col mb-1">
            {input.length !== 0 && (
                <label className={labelClasses()}>
                    {input.label}
                    {input.required && (
                        <span className="text-red-500 ml-2">*</span>
                    )}
                </label>
            )}

            <div className="relative">
                {input.icon && (
                    <div className="absolute left-3 top-4 text-gray-500">
                        {input.icon}
                    </div>
                )}
                <input
                    name={input.key}
                    type={showPassword ? "text" : input.type}
                    className={inputClasses()}
                    placeholder={input.placeholder}
                    value={input.data}
                    min={input.min}
                    readOnly={input.readOnly}
                    onChange={(e) => validate(e.target.value)}
                />
                {input.type === "password" && (
                    <span
                        className="absolute text-gray-800 right-3 top-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
            </div>
            {error && <p className="text-red-500 block">{error}</p>}
        </div>
    );
};

export default Input;
