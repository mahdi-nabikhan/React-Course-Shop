import React from "react";
import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";

import "./Header.css";
import Landing from "../Landing/Landing";

export default function Header() {
  return (
    <header className="header">
        <Topbar />
        <Navbar />
        <Landing/>
    </header>
  );
}
