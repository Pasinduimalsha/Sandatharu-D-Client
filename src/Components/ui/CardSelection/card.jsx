import React from "react";

const Card = ({ input, option, handleChange }) => {
    const getClasses = () => {
        let classes = `
                bg-gray-200 w-full h-24 rounded-md 
                text-center cursor-pointer hover:border-2 
                border-primary text-xl flex items-center justify-center px-4`;

        if (input.data == option.id) classes += " border-2";

        return classes;
    };

    return (
        <div
            className={getClasses()}
            onClick={() => handleChange(option.id, input)}
        >
            {option.title}
        </div>
    );
};

export default Card;
