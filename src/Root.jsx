import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from 'react-router-dom'

const Root = () => {
    return (
      <>
        <Header/>
        <Outlet/>
        <Footer/>
      </>
    )
  }
  
  export default Root