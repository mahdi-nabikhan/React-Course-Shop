import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrump/Breadcrump";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import "./Courses.css";
import Pagination from "../../Components/Pagination/Pagination";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shownCourses,setShownCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
      
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("شما وارد نشده‌اید. لطفاً وارد شوید.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/v1/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        
        if (!response.ok) {
          if (response.status === 403 || response.status === 401) {
            throw new Error("توکن نامعتبر است. دوباره وارد شوید.");
          }
          throw new Error(`خطای HTTP ${response.status}`);
        }

        const data = await response.json();
        const coursesArray = Array.isArray(data) ? data : data.courses || [];
        setCourses(coursesArray);
        setError(null);
      } catch (err) {
        console.error("خطا در دریافت دوره‌ها:", err);
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // نمایش وضعیت بارگذاری یا خطا
  if (loading) {
    return (
      <>
        <Topbar />
        <Navbar />
        <div className="container text-center my-5">در حال بارگذاری دوره‌ها...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Topbar />
        <Navbar />
        <div className="container text-center my-5 text-danger">
          <p>{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "تمامی دوره ها", to: "courses" },
        ]}
      />

      {/* بخش اصلی دوره‌ها */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length > 0 ? (
                  shownCourses.map((course) => (
                    <CourseBox key={course.id} {...course} />
                  ))
                ) : (
                  <p className="text-center">دوره‌ای برای نمایش وجود ندارد.</p>
                )}
              </div>
            </div>
          </div>

          {/* Pagination نمونه (اختیاری) */}
          <div className="courses-pagination">
            <ul className="courses__pagination-list">
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                </a>
              </li>
              <li className="courses__pagination-item">
                <a
                  href="#"
                  className="courses__pagination-link courses__pagination-link--active"
                >
                  1
                </a>
              </li>
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  2
                </a>
              </li>
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
          <Pagination items={courses} itemCount={1} pathName={'/courses'} setShownCourses={setShownCourses}/>
      <Footer />
    </>
  );
}