import React from "react";

const CheckBox = ({ option, checked, handleCheck }) => {
    const getDivClasses = () => {
        let classes =
            "bg-white border-2 rounded-md w-6 h-6 flex" +
            "flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500";
        classes += checked ? " border-blue-500" : " border-blue-400";
        return classes;
    };
    const getSvgClasses = () => {
        let classes =
            "fill-current w-3 h-3 text-blue-600 pointer-events-none mt-1 ml-1";
        classes += checked ? "" : " hidden";
        return classes;
    };
    const getTxtClasses = () => {
        let classes = "ml-3";
        return classes;
    };
    return (
        <div
            className="p-4 cursor-pointer"
            onClick={() => handleCheck(option.id)}
        >
            <div className="flex items-center mr-4 -mb-3">
                <div className={getDivClasses()}>
                    <svg
                        className={getSvgClasses()}
                        version="1.1"
                        viewBox="0 0 17 12"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="none" fillRule="evenodd">
                            <g
                                transform="translate(-9 -11)"
                                fill="#1F73F1"
                                fillRule="nonzero"
                            >
                                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                            </g>
                        </g>
                    </svg>
                </div>
                <label className={getTxtClasses()}>{option.title}</label>
            </div>
        </div>
    );
};

export default CheckBox;
