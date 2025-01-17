import React from "react";
import { IconContext } from "react-icons";

const SingleCounter = ({ item }) => {
    return (
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <div className="bg-gradient-to-l from-primary to-white border-b-4 border-primary rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                        <div className="rounded-full p-5 bg-primary">
                            <IconContext.Provider
                                value={{
                                    color: "white",
                                    className: "global-class-name",
                                    size: "2em",
                                }}
                            >
                                {item.icon}
                            </IconContext.Provider>
                        </div>
                    </div>
                    <div className="flex-1 text-right md:text-center">
                        <h3 className="font-bold text-3xl text-white                                                                                ">
                            {item.count}
                        </h3>
                        <h5 className="font-bold uppercase text-white">
                            {item.title}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCounter;
