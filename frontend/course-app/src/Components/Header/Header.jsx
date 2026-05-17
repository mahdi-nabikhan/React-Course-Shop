import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";

import "./Header.css";
import Landing from "../Landing/Landing";

export default function Header() {
  const [indexInfo,setIndexInfo]=useState()
  useEffect(()=>{
    fetch('http://localhost:5000/infos/index').then(res=>res.jsob()).then((allIndex)=>{
      setIndexInfo(allIndex)

    })
  },[])
  return (
    <header className="header">
        <Topbar info={indexInfo} />
        <Navbar />
        <Landing info ={indexInfo}/>
    </header>
  );
}
