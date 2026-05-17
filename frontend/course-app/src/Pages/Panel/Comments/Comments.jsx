import React, { useEffect, useState } from 'react'
import DataTable from './../../../Components/AdminPanel/DataTable/DataTable'
export default function Comments() {
    const [comments,setComments]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/v1/comments`).then(res.josn()).then(result =>{setComments(result )})
    },[])
    const localStorageData = localStorage.getItem('users')
    const removecomment = (commentID)=>{
        swal({
            title:'ایا از حذف مطمئن هستید',
            icon :'warning',
            buttons:['اره','نه']
          }).then(result =>{
            if (result){
              fetch(`http://localhost:5000/auth/comments/${commentID}`,{
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
    <DataTable title='کامنت ها'>
    <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>مشاهده</th>
              <th>ثبت پاسخ</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {
            
            comments.map((comment,index)=>{
              <tr>
              <td>{index +1 }</td>
              <td>{comment.creator.name}</td>
              <td>{comment.course}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  مشاهده متن
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ثبت پاسخ
                </button>
              </td>
              <td>ehsan1323</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={removecomment(comment._id)}>
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
