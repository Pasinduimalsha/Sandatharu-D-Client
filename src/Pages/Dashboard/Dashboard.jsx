import React from 'react'
import SideBar from '../../Components/SideBar'
import Expenses from './Expenses/Expenses'
import HomeSection from '../Dashboard/Home/index'
import NavBar from '../../Components/Navbar/Navbar'
import Income from './Income/Income'


const Dashboard = ({ section }) => {
    return (
        <div>
            <NavBar dashboard={true} />
            <div className="flex mt-[85px] gap-6">
                <div className="w-[220px] p-10 bg-primary fixed h-screen -mt-[85px]">
                    <SideBar section={section} />
                </div>
                <div className="w-full ml-[220px] ">
                    {section === "home" && <HomeSection />}
                    {section === "income" && <Income />}
                    {section === "expenses" && <Expenses />}
                    {/* {section === "resturant" && <Resturant />} */}

                </div>
            </div>
        </div>
    );
};

export default Dashboard
