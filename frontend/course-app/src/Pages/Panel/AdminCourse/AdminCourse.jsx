import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable'
import {swal} from 'sweetalert'
export default function AdminCourse() {
  const [courses,setCourses]=useState([])
  useEffect(()=>{
    const localStorageData = localStorage.getItem("user");
    fetch("http://localhost:5000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses)
      });

  },[])

  }
  function getAllCourses (){
   fetch("http://localhost:5000/v1/courses",{
    method:'GET',
    headers :{ Authorization: `Bearer ${localStorageData.token}`}
   }).then(res =>res.json()).then((allCourses)=>{
    setCourses(allCourses)
   })
    
  }
  const removeCourse = (courseID)=>{
    swal({
      title:'مطمئنی',
      icon:'warning',
      buttons :['نه','اره']
    }).then((result) =>{
      if (result){
        fetch(`http://localhost:5000/v1/courses/${courseID}`,{
          method :'DELETE',
          headers :{
            "Authorization": `Bearer ${localStorageData.token}`
          }
        }).then(res =>res.json()).then((result)=>{
          swal({
            title:'حذف شد',
            icon:'success',
            buttons:'ok'
          })
        })
      }
    })

  }
  return (
    <>
    <DataTable title='دوره ها ' >
    <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                <td>{course.isComplete === 0 ? 'در حال برگزاری' : 'تکمیل شده'}</td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={()=>removeCourse(course._id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



    </DataTable>
    </>

  )

