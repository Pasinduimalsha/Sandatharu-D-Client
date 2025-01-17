import React from "react";

import ListItem from "./listItem";

import {
    FaHome,
    FaBars,
    FaDollyFlatbed,
    
} from "react-icons/fa";

const SideBar = ({ section }) => {
    const navList = [
        {
            title: "Home",
            url: "/",
            icon: <FaHome />,
            selected: section === "home",
        },
        {
            title: "Income",
            url: "/income",
            icon: <FaBars />,
            selected: section === "income",
        },
        {
            title: "Expenses",
            url: "/expenses",
            icon: <FaDollyFlatbed />,
            selected: section === "expenses",
        },
        {
            title: "Resturant",
            url: "/resturant",
            icon: <FaDollyFlatbed />,
            selected: section === "resturant",
        },
        {
            title: "Kitchen",
            url: "/kitchen",
            icon: <FaDollyFlatbed />,
            selected: section === "kitchen",
        },
       
    ];

    return (
        <ul className="space-y-4 mb-12 mt-20 w-full">
            {navList.map((item) => (
                <ListItem key={item.url} item={item} />
            ))}
        </ul>
    );
};
export default SideBar;

 