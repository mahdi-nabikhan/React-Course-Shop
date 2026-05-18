import React, { useState } from 'react'

export default function PadminIndex() {
    const [allUsers,setAllUsers]=useState([])
    function getAllUsers(){
        fetch(`http://localhost:5000/v1/users`,{
          headers :{
            'Authoraztion':`Bearer ${localStorageData.token}`
          }
        }).then(res => res.json()).then((allUserData)=>{console.log(setAllUsers(allUserData))})
    
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
            
            </tr>

            })
            }
            
          </tbody>
        </table>

    </DataTable>
    </>
  )
}
