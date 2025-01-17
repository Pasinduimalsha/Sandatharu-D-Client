import React from "react";
import Card from "./card";

const CardSelection = ({ input, handleChange }) => {
    const error = input.error;
    return (
        <div>
            <div className="flex mb-4">
                <h2 className="mx-2">{input.label}</h2>
            </div>

            <div className="bg-white flex gap-2">
                {input.optList.map((option) => (
                    <Card
                        key={option.id}
                        option={option}
                        input={input}
                        handleChange={handleChange}
                    />
                ))}
            </div>
            {error && <p className="text-red-500 block mt-2">{error}</p>}
        </div>
    );
};

export default CardSelection;
