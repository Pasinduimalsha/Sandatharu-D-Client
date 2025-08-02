import React from 'react'
import SideBar from '../../Components/SideBar'
import Expenses from './Expenses/Expenses'
import HomeSection from '../Dashboard/Home/index'
import NavBar from '../../Components/Navbar/Navbar'

import Header from '../../Components/Header/Header'
import ExpenseSheets from './Expenses/ExpenseSheets'
import BillingDashboard from './Income/Restaurants/RestaurantBilling'
import IncomeSheets from './Income/incomeSheets'
import IncomeHome from './Income/IncomeHome'
import Functions from '../Dashboard/Income/Functions/Functions'
import Accommodations from '../Dashboard/Income/Accommodations/Accommodations'
import Bills from '../Dashboard/Income/Bills'
import Kots from '../Dashboard/Income/kots'


const Dashboard = ({ section }) => {
    return (
        <div>
            <Header dashboard={true} />
            <div className="flex mt-[85px] gap-6">
                <div className="w-[220px] p-10 bg-primary fixed h-screen -mt-[85px]">
                    <SideBar section={section} />
                </div>
                <div className="w-full ml-[220px] ">
                    {section === "home" && <HomeSection />}
                    {section === "income" && <IncomeHome />}
                    {section === "expenses" && <Expenses />}
                    {section === "income/billing" && <BillingDashboard />}
                    {section === "income/functions" && <Functions />}
                    {section === "income/accommodation" && <Accommodations />}
                    {section === "expenses/expense-sheets" && <ExpenseSheets />}
                    {section === "income/income-sheets" && <IncomeSheets />}
                    {section === "income/kots" && <Kots />}
                    {section === "income/bills" && <Bills />}
                    {/* Uncomment the following line when Resturant component is ready */}
                    {/* {section === "resturant" && <Resturant />} */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard
