import React, { useEffect, useState,memo } from "react";

import "./Topbar.css";
import { Link, data } from "react-router";

export default memo(function Topbar({info}) {
  const[allTobbarLinks,setAllTopbarLinks]=useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/v1/menus/topbar').then(res => res.json()).then(data => setAllTopbarLinks(data)) 
  },[])
  const getRandomItemsFromArray = (arr,randomCount) => {
    const shuffled = [...arr].sort(()=> 0.5 - Math.random())
    return shuffled.slice(0,randomCount)
  }
  const [indexInfo,setIndexInfo]=useState()
  useEffect(()=>{
    fetch('http://localhost:5000/infos/index').then(res=>res.jsob()).then((allIndex)=>{
      setIndexInfo(allIndex)

    })
  },[])
  return (
    <div class="top-bar">
      <div class="container-fluid">
        <div class="top-bar__content">
          <div class="top-bar__right">
            <ul class="top-bar__menu">
              <li class="top-bar__item">
                {

                  getRandomItemsFromArray(allTobbarLinks,5).map(link => (
                    <Link href={link.href} class="top-bar__link">
                    {link.tile} 
                  </Link>

                  ))
                }
                </li>
                
             
            </ul>
          </div>
          <div class="top-bar__left">
            <div class="top-bar__email">
              <a href="#" class="top-bar__email-text top-bar__link">
                {indexInfo.email}
              </a>
              <i class="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div class="top-bar__phone">
              <a href="#" class="top-bar__phone-text top-bar__link">
                {indexInfo.phone}
              </a>
              <i class="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})
