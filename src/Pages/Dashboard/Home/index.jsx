import React, { useState, useEffect } from "react";
import ChartSection from "./ChartSection";
import CounterSection from "./CounterSection";

// import apiService from "../../../http";

const Home = () => {
    const [countData, setCounts] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await apiService.get("stat");
    //             setCounts(result);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const data = [
        { name: "January", products: 0 },
        { name: "February", products: 15 },
        { name: "March", products: 10 },
        { name: "April", products: 13 },
        { name: "May", products: 9 },
        { name: "June", products: 11 },
        { name: "July", products: 17 },
        { name: "August", products: 17 },
        { name: "September", products: 20 },
        { name: "October", products: 15 },
        { name: "November", products: 10 },
        { name: "December", products: 17 },
    ];

    return (
        <div>
            <CounterSection countData={countData} />
            <ChartSection data={data} keyX={"name"} keyY={"products"} />
            <ChartSection data={data} keyX={"name"} keyY={"products"} />
            <ChartSection data={data} keyX={"name"} keyY={"products"} />
        </div>
    );
};

export default Home;
