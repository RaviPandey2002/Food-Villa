import React from "react";
import ReactDOM from 'react-dom/client'
import ErrorPage from "./components/Common/ErrorPage.js"
import About from "./components/About"
import Navbar from './components/Common/Navbar.js';
import Home from './components/Home.js';
import Footer from './components/Common/Footer.js';
import RestaurantMenu from "./components/RestaurantMenu.js"
import SignUpForm from './components/SignUpForm'
import './index.css'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import ExploreMeals from "./components/ExploreMeals/ExploreMeals.js";
import MealDetails from "./components/MealDetails/MealDetails.js";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <AppLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/explore-meals",
        element:<ExploreMeals/>
      },
      {
        path:'/about',
        element: <About />
      },
      {
        path:'/signUp',
        element: <SignUpForm  />
      },
      {
        path:'/restaurants/:id',
        element: <RestaurantMenu  />,
      },
      {
        path: '/meal/:id',
        element: <MealDetails />
      }
    ]
  }
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <RouterProvider router={appRouter} /> 
)

