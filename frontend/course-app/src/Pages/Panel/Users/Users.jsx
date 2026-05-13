import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
export default function Users() {
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
