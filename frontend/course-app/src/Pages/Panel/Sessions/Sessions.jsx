import React, { useEffect, useState } from "react";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "../../../validators/rules";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState('-1');
  const [sessionVideo, setSessionVideo] = useState({})
  const [sessions, setSession] = useState([]);
  const [isSessionFree,setIsSessionFree]=useState(1)
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSessions()
    fetch("http://localhost:5000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });
  }, []);
  const createSession =(event)=>{
    const localStorageData=localStorage.getItem('users')
    event.preventDefault()
    let formData = new FormData()
    formData.append('title',formState.input.title.value)
    formData.append('time',formState.input.time.value)
    formData.append('video',formState.sessionVideo)
    fetch(`http://localhost:5000/v1/courses/${sessionCourse}/sessions`,{
        method:'POST',
        headers :{
            Autorazation :`Bearer${localStorageData.token}`

        }
        ,body:formData

    }).then(res =>{
        if (res.ok){
            swal({
                title:'جلسه اضافه شد',
                icon:'success',
                buttons:'ok'

            }).then(()=>{
                console.log('ok')
            })
        }
    })


  }
  function getAllSessions (){
    fetch (`http://localhost:5000/v1/courses/sessions`,{

    }).then(res =>res.json()).then(allSessions =>{
        setSession(allSessions)
    })
  }
  const removeSession = (sessionID) =>{
    const localStorageData=localStorage.getItem('users')
    swal({
        title:'مطمنی ؟',
        icon:'warning',
        buttons : ['نه','اره']
    }).then(
        fetch(`http://localhost:5000/v1/courses/sessions/${sessionID}`,{
        method:'DELETE',
        headers :{
            Autorazation :`Bearer${localStorageData.token}`

        }
    }).then(res =>{
        if (res.ok){
            swal({
                title:'با موفقیت حذف شد',
                icon:"success",

            }).then(()=>{
                getAllSessions()
            })
        }
    })
    )
    

  }
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>{course.name}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <input type="file" onChange={event => setSessionVideo(event.target.files[0])} />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>  جلسه غیر رایگان</span>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          checked
                          onInput={event => setIsSessionFree(event.target.value)}
                        />
                      </label>
                    </div>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span> رایگان</span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          onInput={event => setIsSessionFree(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input onClick={createSession} type="submit" value="افزودن" />
                </div>
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title='جلسات'>
      <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>تایم</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session._id}>
                <td>{index + 1}</td>
                <td>{session.title}</td>
                <td>{session.time}</td>
                <td>{session.course.name}</td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn"  onClick={()=>{removeSession(session._id)}}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
