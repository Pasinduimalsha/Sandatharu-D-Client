import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayOut from "../LayOut/MainLayOut";

import Login from "../Pages/Login/Login";
import UserProtected from "./UserProtected/userProtected";
import User from "../Pages/User/User";

import Home from "../Pages/Home/Home";

import NoUrl from "../Pages/404/noUrl";
import Expenses from "../Pages/Dashboard/Expenses/Expenses";
import Dashboard from "../Pages/Dashboard/Dashboard";
import RoomDetails from "../Pages/RoomDetails/roomDetails";


const router1 = createBrowserRouter([{
  path: "/",
  element: <MainLayOut />,
  children: [{
    index: true,
    element: <Home />
  }
  ]
},{
    element: <UserProtected />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/dashboard",
        children: [
          { index: true, element: <Dashboard section="home" /> },
          { path: "expenses", element: <Dashboard section="expenses" /> },
          { path: "income", element: <Dashboard section="income" /> },
          {path: "income/billing", element: <Dashboard section="income/billing" /> },
          {path: "income/functions", element: <Dashboard section="income/functions" /> },
          {path: "income/accommodation", element: <Dashboard section="income/accommodation" /> },
          { path: "expenses/expense-sheets", element: <Dashboard section="expenses/expense-sheets" /> },
          {path: "income/income-sheets", element: <Dashboard section="income/income-sheets"/>},
          {path: "income/kots", element: <Dashboard section="income/kots" /> },
          {path: "income/bills", element: <Dashboard section="income/bills" /> }

        ],
      },
    ]
},
{
  path: '/room/:id',
  element: <RoomDetails />,
},
{
  path: "/Login",
  children: [{
    index: true,
    element: <Login />,
  }]
},
{
  path: "/expenses",
  children: [{
    index: true,
    element: <Expenses />,
  }]
},
{   //all
  path: '*',
  element: <NoUrl />
},
]);

const AppRouter = () => {
  return <RouterProvider router={router1} />;
}

export default AppRouter;

