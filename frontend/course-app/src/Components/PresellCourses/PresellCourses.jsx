import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// CSS های Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './PresellCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import CourseBox from '../CourseBox/CourseBox';

export default function PresellCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    fetch(`http://localhost:5000/v1/course/presell`).then(res => res.json()).then(allPresellCourse =>{
        setCourses(allPresellCourse)
    })
  },[])

 
  if (loading) return <div className="loading">در حال بارگذاری...</div>;

  return (
    <>
      <div className="popular">
        <div className="container">
          <SectionHeader
            title="دوره‌های در حال پیش‌فروش"
            desc="دوره‌های محبوب بر اساس امتیاز کاربران"
          />
        </div>
      </div>

      <div className="courses-content">
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={courses.length >= 4}
            className="presell-swiper"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseBox {...course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}