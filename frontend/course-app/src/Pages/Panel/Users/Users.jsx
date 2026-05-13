import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import {} from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm'
export default function Users() {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const localStorageData = localStorage.getItem('users')
  const [allUsers,setAllUsers]=useState([]) 
  function getAllUsers(){
    fetch(`http://localhost:5000/v1/users`,{
      headers :{
        'Authoraztion':`Bearer ${localStorageData.token}`
      }
    }).then(res => res.json()).then((allUserData)=>{console.log(setAllUsers(allUserData))})

  }
  useEffect(()=>{

    fetch(`http://localhost:5000/v1/users`,{
      headers :{
        'Authoraztion':`Bearer ${localStorageData.token}`
      }
    }).then(res => res.json()).then((allUserData)=>{console.log(setAllUsers(allUserData))})
  },[])
  const removeUser = (userID) =>{
    swal({
      title:'ایا از حذف مطمئن هستید',
      icon :'warning',
      buttons:['اره','نه']
    }).then(result =>{
      if (result){
        fetch(`http://localhost:5000/auth/users/${userID}`,{
          method:'DELETE',
          headers :{
            'Authoraztion':`Bearer ${localStorageData.token}`
          }
        }).then(res =>{
          if(res.ok){
            swal({
              title:'کاربر حذف شد',
              icon:'success',
              buttons:'ok'

            }).then(getAllUsers)
          }
        })

      }
    })


  }
  return (
    <>
    <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
    <DataTable title='کاربران'>
    <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {
            
            allUsers.map((user,index)=>{
              <tr>
              <td>{index +1 }</td>
              <td>{user.name}</td>
              <td>09123443243</td>
              <td>{user.email}</td>
              <td>ehsan1323</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={removeUser(user._id)}>
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
