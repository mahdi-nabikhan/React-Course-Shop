import React, { useContext } from "react";
import './Sidebar.css'
import AuthContext from "../../context/authContext";
import swal from 'sweetalert'
import useNavigate from 'react-router-dom'
export default function Sidebar() {
  const authContext=useContext(AuthContext)
  const navigate=useNavigate()
  const logoutAdmin = (event)=>{
    event.prevenDefalut()
    swal({
      title:'با موفقیت خارج شدید',
      icon:'success',
      buttons : 'اوکی'

    }).then(()=>{
      authContext.logout()
      navigate('/')
    })

  }
  
  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <a href="#">
              <span>صفحه اصلی</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>دوره ها</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>منو ها</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>مقاله ها</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>کاربران</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>کدهای تخفیف</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>دسته‌بندی‌ها</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={logoutAdmin}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
