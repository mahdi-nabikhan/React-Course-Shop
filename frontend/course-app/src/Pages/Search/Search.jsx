import React, { useEffect, useState } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import CourseBox from '../../Components/CourseBox/CourseBox';

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/v1/search/${value}`)
      .then((res) => {
        if (!res.ok) throw new Error('خطا در دریافت جستجو');
        return res.json(); // مهم: بازگشت promise
      })
      .then((allData) => {
        console.log(allData);
        setArticles(allData.allResultArticles || []);
        setCourses(allData.allResultCourses || []);
      })
      .catch((err) => console.error(err));
  }, [value]); // وابستگی value اضافه شد

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه جستجوی شما"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          {courses.length === 0 ? (
            <div className="alert alert-warning">دوره‌ای یافت نشد</div>
          ) : (
            courses.map((course) => (
              <CourseBox key={course.id} {...course} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}