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
  const [shownCourses,setShownCourses] = useState([])
  const [status,setStatus] = useState('default')
  const[orderedCourses,setOrderedCourses]=useState([])
  const[statusTitle,setStatusTitle] =useState('مرتب سازی پیشفرض')
  useEffect(()=>{
      fetch(`http://localhost:5000/v1/courses/category/${categoryName}`).then(res => res.json()).then(allCourses =>{
        console.log(allCourses)
        setCourses(allCourses)
      },[categoryName])
  })
  useEffect(()=>{
    switch(status){
      case 'free':{
        const freecourses = courses.filter(courses.price ===0)
        setOrderedCourses(freecourses)
        break;
      }

      case ' money':{
        const notfreecourses = courses.filter(courses.price !==0)
        setOrderedCourses(notfreecourses)
        break;

      }

      case 'last':{
        
        setOrderedCourses(courses)
        break;

      }
      case 'first':{
        const reversedCourse = courses.slice().reverse()
        setOrderedCourses(reversedCourse)
        break;
      }
      case '':{

      }

      default: {
          setOrderedCourses(courses)
        }
      
      
      }
        
  },[status])
  const statusTitleChangeHandler = (event)=>{
    setStatusTitle(event.target.value)
  }
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
                       {statusTitle}
                  </li>
                  <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('free')
                statusTitleChangeHandler(event)
                }}>
                    مربت سازی بر اساس رایگان
                  </li>
                  <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('money')
                statusTitleChangeHandler(event)
                }}>
                    مربت سازی بر اساس پولی
                  </li>
                  <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('last')
                statusTitleChangeHandler(event)
                }}>
                    مربت سازی بر اساس آخرین
                  </li>
                  <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('cheap')
                statusTitleChangeHandler(event)
                }}>
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li class="courses-top-bar__selection-item" onClick={(event)=>{setStatus('expensive')
                statusTitleChangeHandler(event)
                }}>
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
                    {shownCourses.map(course =>(
                      <CourseBox {...course} />
                  ))}
                  <Pagination items={orderedCourses} itemCount={1} pathName={`category-info/${categoryName}`} setShownCourses={setShownCourses} />
                    
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
