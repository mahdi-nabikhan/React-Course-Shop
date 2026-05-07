import React from 'react'
import Header from '../../Components/Header/Header'

import './Index.css'

import LastCourses from '../../Components/LastCourse/LastCourse'
import AboutUs from '../../Components/AboutUs/AboutUs'
import PopularCourses from '../../Components/PopularCourses/PopularCourses'
import PresellCourses from '../../Components/PresellCourses/PresellCourses'
import LastArticles from '../../Components/LastArticles/LastArticles'

export default function Index() {
  return (
    <>
      <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses/>
      <PresellCourses/>
      <LastArticles/>
    </>


  )
}
