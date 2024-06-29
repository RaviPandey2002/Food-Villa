import React from "react";
import ReactDOM from 'react-dom/client'
import ErrorPage from "./components/ErrorPage.js"
import About from "./components/About"
import Navbar from './components/Navbar';
import Home from './components/Home.js';
import Footer from './components/Footer';
import Restaurant from "./components/RestaurantMenu.js"
import '../public/index.css'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'

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
        path:'/about',
        element: <About />
      },
      {
        path:'/restaurants/:id',
        element: <Restaurant />,

      }
    ]
  }
  
])



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <RouterProvider router={appRouter} /> 
)

