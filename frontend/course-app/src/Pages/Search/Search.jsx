import React, { useEffect, useState } from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import CourseBox from '../../Components/CourseBox/CourseBox'
export default function Search() {
    const [courses,setCourses]=useState()
    const[article,setArticles]=useState()
    const {value} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:5000/v1/search/${value}`).then((res)=>{res.json()})
        .then((allDate)=>{
            console.log(allDate)
            setArticles(allDate.allResultArticles)})
            setCourses(allDate.allResultCourses)
    },[])
  return (
    <>
    <Topbar/>
    <Navbar/>
    <div class="courses">
        <div class="container">
          <SectionHeader
            title="  نتیجه جست و جوی شما"
            desc="سکوی پرتاپ شما به سمت موفقیت"/>
            { courses.lenght === 0 ?(<><div className="alert alert-warning">دوره ای یافت نشد</div></>):(<>{

                courses.map(course => (
                    <CourseBox key={course.id} {...course}/>
                ))
            }</>)}

    

              </div>
            </div>
   
    <Footer/>
    </>
  )
}
