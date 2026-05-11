import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";

import "./Category.css";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router";

export default function Category() {
  const [courses,setCourses]=useState([])
  const {categoryName}=useParams()
  useEffect(()=>{
      fetch(`http://localhost:5000/v1/courses/category/${categoryName}`).then(res => res.json()).then(allCourses =>{
        console.log(allCourses)
        setCourses(allCourses)
      },[categoryName])
  })
  return (
    <>
      <Topbar />
      <Navbar />

      <section class="courses">
        <div class="container">
          <div class="courses-top-bar">
            <div class="courses-top-bar__right">
              <div class="courses-top-bar__row-btn courses-top-bar__icon--active">
                <i class="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div class="courses-top-bar__column-btn">
                <i class="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div class="courses-top-bar__selection">
                <span class="courses-top-bar__selection-title">
                  مرتب سازی پیش فرض
                  <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul class="courses-top-bar__selection-list">
                  <li class="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                    مرتب سازی پیش فرض
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس محبوبیت
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس امتیاز
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس آخرین
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div class="courses-top-bar__left">
              <form action="#" class="courses-top-bar__form">
                <input
                  type="text"
                  class="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                />
                <i class="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>

          <div class="courses-content">
            <div class="container">
              <div class="row">
                {
                  courses.length === 0 ? (<div className="alert alert-warning">هیج دوره ای برای این کتگوری وجود ندارد</div>) : (<>
                    {courses.map(course =>(
                      <CourseBox {...course} />
                  ))}
                  <Pagination />
                    
                    </>)
                }
                
                
              </div>
            </div>
          </div>

          

        </div>
      </section>

      <Footer />
    </>
  );
}
