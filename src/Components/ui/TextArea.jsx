import React from "react";

const TextArea = ({ input, handleChange }) => {
    const error = input.error;

    const getClassess = () => {
        let classes =
            "bg-white px-4 " +
            "appearance-none transition duration-300 " +
            "ease-in-out focus: outline-none" +
            "focus:ring-0 border mb-2 " +
            "border-border-base rounded-md focus:border-green-500 ";

        classes += error ? "border-red-500 " : "";

        return classes;
    };

    return (
        <div className="w-full flex flex-col mb-1">
            <label className="mb-2">{input.label}</label>
            <textarea
                className={getClassess()}
                rows={input.rows}
                placeholder={input.placeholder}
                value={input.data}
                onChange={(event) => handleChange(event.target.value, input)}
            ></textarea>
            {error && <p className="text-red-500 block">{error}</p>}
        </div>
    );
};

export default TextArea;
