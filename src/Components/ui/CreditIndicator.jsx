import React from "react";

const CreditIndicator = ({ credits }) => {
    const elements = new Array(credits);
    elements.fill(0);

    return (
        <div className="flex items-center">
            {elements.map((index) => (
                <svg
                    key={index}
                    className={`h-5 w-5 fill-current text-green-600`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 0l2.39 6.14 6.37.51-5.1 3.95 1.82 6.3-5.84-4.33-5.84 4.33 1.82-6.3-5.1-3.95 6.37-.51L10 0zm0 1.5L7.69 6.2l-4.37.35 3.51 2.71-1.29 4.46 3.29-2.44 3.29 2.44-1.29-4.46 3.51-2.71-4.37-.35L10 1.5z" />
                </svg>
            ))}
        </div>
    );
};

export default CreditIndicator;
