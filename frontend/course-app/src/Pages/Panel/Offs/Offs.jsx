import React, { useEffect, useState } from 'react'
import Input from '../../../Components/Form/Input'
import {
    useForm
} from '../../../hooks/useForm'
import swal from 'sweetalert'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
export default function Offs() {
    const removeOff = (offID) => {
        swal({
          title: 'ایا از حذف مطمئن هستید',
          icon: 'warning',
          buttons: ['اره', 'نه']
        }).then(result => {
          if (result) {
            fetch(`http://localhost:5000/auth/offs/${offID}`, {
              method: 'DELETE',
              headers: {
                'Authoraztion': `Bearer ${localStorageData.token}`
              }
            }).then(res => {
              if (res.ok) {
                swal({
                  title: 'کاربر حذف شد',
                  icon: 'success',
                  buttons: 'ok'
    
                }).then(getAllUsers)
              }
            })
    
          }
        })
    
    
      }
    const [offs,setOffs]= useState([])
    const getAllOffs = () =>{
        fetch(`http://localhost:5000/v1/offs`,{headers:{
            'Authoraztion': `Bearer ${localStorageData.token}`

        }}).then(res => res.json()).then(allOffs => {setOffs(allOffs)})
    }
      const localStorageData = localStorage.getItem('users')
    const createDiscount = (event) => {
        event.preventDefault()
        const newOffInfo = {
            code: formState.input.code.value,
            perecent: formState.input.perecent.value,
            course: offCourse,
            max: formState.input.max.value
        }
    
        fetch(`http://localhost:5000/v1/offs`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authoraztion': `Bearer ${localStorageData.token}`
            }
        }).then(res => {
            if (res.ok){
                swal({
                    title:'کد نخفیف با موفقیت اضافه شد',
                    icon:'success',
                    buttons:'ok'
                }).then(
                    getAllOffs()
                )
            }
        })

    }
    const [courses, setCourses] = useState([])
    const [offCourse, setOffCourse] = useState('-1')
    const [formState, onInputHandler] = useForm({
        code: {
            value: '',
            isValid: false
        },

        perecent: {
            value: '',
            isValid: false
        },

        max: {
            value: '',
            isValid: false
        },
    }
    )
    useEffect(() => {
        fetch(`http://localhost:5000/v1/courses`).then(res => res.json()).then(allCourses => {
            setCourses(allCourses)
        })
    })
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
                                <label class="input-title">کد تخفیف </label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validations={[minValidator(5)]}
                                    placeholder="کد تخفیف زا وارد کنید"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">  درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="precent"
                                    validations={[minValidator(5)]}
                                    placeholder="در صد نخفیف زا وارد کنید"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">   تعداد استفاده</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="max"
                                    validations={[minValidator(5)]}
                                    placeholder=" حداکثر تعداد استفاده از کد"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select" onChange={event => setOffCourse(event.target.value)}>
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">

                            <div class="col-12">
                                <div class="bottom-form">
                                    <div class="submit-btn">
                                        <input onClick={createDiscount} type="submit" value="افزودن" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title='کاربران'>
    <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>سازنده</th>
              <th>تعداد استفاده</th>
              <td> حداکثر استفاده</td>
              <th>حذف</th>
           
            </tr>
          </thead>
          <tbody>
            {
            
            offs.map((off,index)=>{
              <tr>
              <td>{index +1 }</td>
              <td>{off.code}</td>
              <td>09123443243</td>
              <td>{off.perecent}</td>
              <td>{off.creator}</td>
              <td>{off.max}</td>
              <td>{off.uses}</td>
            
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={removeOff(off._id)}>
                  حذف
                </button>
              </td>
            </tr>

            })
            }
            
          </tbody>
        </table>

    </DataTable>
        </>
    )
}
