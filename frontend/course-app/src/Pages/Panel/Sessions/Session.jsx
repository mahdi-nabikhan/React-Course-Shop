import React, { useEffect } from 'react'
import Topbar from '../../../Components/AdminPanel/Topbar/Topbar'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

export default function Session() {
    const {courseName,sessionID}=useEffect()
    useEffect(()=>{

    },[])
  return (
    <>
    <Topbar/>
    <Navbar/>
    <Footer/>
    </>
  )
}
