import React from "react";
import {
    FaHome,
    FaBars,
    FaDollyFlatbed,
    FaPowerOff,
    FaShoppingCart,
    FaCashRegister,
    FaCog,
} from "react-icons/fa";

import SingleCounter from "./SingleCounter";

const CounterSection = ({ countData }) => {
    const counts = [
        {
            title: "Products",
            count: countData.productCount,
            icon: <FaDollyFlatbed />,
        },

        {
            title: "Materials",
            count: countData.materialCount,
            icon: <FaCog />,
        },
        {
            title: "Sales",
            count: countData.saleCount,
            icon: <FaShoppingCart />,
        },
    ];

    return (
        <div className="flex flex-wrap">
            {counts.map((item) => {
                return <SingleCounter item={item} />;
            })}
        </div>
    );
};

export default CounterSection;
