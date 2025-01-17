import React from "react";
import CheckBox from "./CheckBox";

const CheckList = ({
    input,
    handleChange,
    inputClassName = "",
    labelClassName,
}) => {
    let checkedOptions = input.data;

    const handleCheck = (id) => {
        if (!checkedOptions.includes(id)) {
            checkedOptions.push(id);
        } else {
            checkedOptions = checkedOptions.filter((item) => item !== id);
        }
        input.data = checkedOptions;

        handleChange(input);
    };

    const getLabelClassList = () => {
        let classes = "mb-2 ";
        classes += 0 ? "text-white " : " ";
        classes += labelClassName;
        return classes;
    };

    return (
        <div>
            {input.label.length != 0 && (
                <label className={getLabelClassList()}>
                    {input.label}
                    {input.required && (
                        <span className="text-red-500 ml-2">*</span>
                    )}
                </label>
            )}
            {input.optList.map((option) => (
                <CheckBox
                    key={option.id}
                    option={option}
                    checked={checkedOptions.includes(option.id)}
                    handleCheck={handleCheck}
                />
            ))}
        </div>
    );
};

export default CheckList;
