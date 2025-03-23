import React from 'react'
import { Link } from "react-router-dom"
import {  useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const err = useRouteError();
  return (
    <div className="errorPage">
        <h1 > Something went Wrong !!! </h1>
        <h2 style={ { color:"red" } } >{ err.data }</h2>
        <h3 > { err.status }  { err.statusText } </h3>
        <Link to="/" > <button> Home </button>  </Link>
    </div>
)
}

export default ErrorPage