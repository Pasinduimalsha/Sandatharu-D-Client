import React from "react";

const Select = ({ input, handleChange, inputClassName, labelClassName }) => {
    const getInputClassList = () => {
        let classes =
            "px-4 " +
            "appearance-none transition duration-300 " +
            "ease-in-out focus: outline-none " +
            "focus:ring-0 border mb-2 " +
            "border-border-base rounded-md focus:border-green-500 h-12 ";

        classes += input.error ? "border-red-500 " : " ";
        classes += inputClassName;

        return classes;
    };
    const getLabelClassList = () => {
        let classes = "mb-2 ";

        classes += labelClassName;

        return classes;
    };

    return (
        <div className="w-full flex flex-col mb-1">
            {input.label.length !== 0 && (
                <label className={getLabelClassList()}>
                    {input.label}
                    {input.required && (
                        <span className="text-red-500 ml-2">*</span>
                    )}
                </label>
            )}

            <select
                className={getInputClassList()}
                onChange={(e) => {
                    input.data = e.target.value;
                    handleChange(input);
                }}
                value={input.data}
            >
                <option value={null} disabled selected>
                    Select {input.optTitle || " an element"}
                </option>

                {input.optList.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>

            <p className={input.isValid ? "hidden" : "text-red-500 block"}>
                {input.error}
            </p>
        </div>
    );
};

export default Select;
