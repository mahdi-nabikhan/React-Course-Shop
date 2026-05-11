import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourse.css";

export default function LastCourses() {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/v1/courses')
      .then(res => {
        if (!res.ok) throw new Error('network error');
        return res.json();
      })
      .then(data => {
        // اگر پاسخ به صورت { courses: [...] } است
        console.log('this  is data' ,data)
        const coursesArray = Array.isArray(data) ? data : data.courses || [];
        setCourses(coursesArray);
      })
      .catch(err => {
        console.error(err);
        setCourses([]);
      });
  }, []);
  return (
    <>
      <div class="courses">
        <div class="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
          />

          <div class="courses-content">
            <div class="container">
              <div class="row">
                {
                  courses.map(course => (
                    <CourseBox {...course} />
                  ))
                }


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
